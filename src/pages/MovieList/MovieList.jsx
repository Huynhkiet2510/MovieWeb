import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import CartItem from "../../components/CartItem/CartItem";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";

const MovieList = () => {
  const {
    searchTerm,
    selectedGenre,
    selectedCountry,
    selectedType,
    selectedCategory,
    genres,
    countries,
  } = useOutletContext();

  const [listMovie, setListMovie] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchCombined = async () => {
    const isFilterActive = selectedGenre || selectedCountry || searchTerm || selectedCategory === "top-rated" || selectedCategory === "trending";
    let urls = [];

    if (isFilterActive) {
      if (searchTerm) {
        urls = [
          `${import.meta.env.VITE_BASE}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${page}`,
          `${import.meta.env.VITE_BASE}/search/tv?query=${encodeURIComponent(searchTerm)}&page=${page}`,
        ];
      } else if (selectedCountry || selectedGenre) {
        urls = [
          `${import.meta.env.VITE_BASE}/discover/movie?${selectedGenre ? `with_genres=${selectedGenre}&` : ""}${selectedCountry ? `with_origin_country=${selectedCountry}&` : ""}page=${page}`,
          `${import.meta.env.VITE_BASE}/discover/tv?${selectedGenre ? `with_genres=${selectedGenre}&` : ""}${selectedCountry ? `with_origin_country=${selectedCountry}&` : ""}page=${page}`,
        ];
      } else if (selectedCategory === "trending") {
        urls = [
          `${import.meta.env.VITE_BASE}/trending/movie/day?page=${page}`,
          `${import.meta.env.VITE_BASE}/trending/tv/day?page=${page}`,
        ];
      }
      else if (selectedCategory === "top-rated") {
        urls = [
          `${import.meta.env.VITE_BASE}/movie/top_rated?page=${page}`,
          `${import.meta.env.VITE_BASE}/tv/top_rated?page=${page}`,
        ];
      }

      const [moviesRes, tvRes] = await Promise.all(
        urls.map((url) =>
          axios.get(url, { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } })
        )
      );

      const combined = [
        ...moviesRes.data.results.map((item) => ({ ...item, media_type: "movie" })),
        ...tvRes.data.results.map((item) => ({ ...item, media_type: "tv" })),
      ];

      combined.sort((a, b) => b.popularity - a.popularity);

      return {
        results: combined,
        totalPages: Math.max(moviesRes.data.total_pages, tvRes.data.total_pages),
      };
    } else {
      const url = selectedType === "tv"
        ? `${import.meta.env.VITE_BASE}/tv/popular?page=${page}`
        : `${import.meta.env.VITE_BASE}/movie/popular?page=${page}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
      });

      const results = res.data.results.map((item) => ({
        ...item,
        media_type: selectedType,
      }));

      return {
        results,
        totalPages: res.data.total_pages || 1,
      };
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCombined();
        setListMovie(res.results);
        setTotalPages(res.totalPages);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(error);
        setListMovie([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();

  }, [searchTerm, selectedGenre, selectedCountry, selectedType, selectedCategory, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, searchTerm, selectedGenre, selectedCountry, selectedType]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const genreName = genres.find((g) => g.id == selectedGenre)?.name;
  const countryName = countries.find((c) => c.iso_3166_1 === selectedCountry)?.english_name;

  let title = "";
  if (searchTerm) title = `Kết quả tìm kiếm: "${searchTerm}"`;
  else if (genreName && countryName) title = `Phim ${genreName} - ${countryName}`;
  else if (genreName) title = `Phim ${genreName}`;
  else if (countryName) title = `Phim ${countryName}`;
  else if (selectedType === "tv") title = "Phim bộ";
  else if (selectedType === "movie") title = "Phim lẻ";
  else if (selectedCategory === "trending") title = "Phim xu hướng";
  else if (selectedCategory === "top-rated") title = "Phim nổi bật";

  return (
    <div className="text-center min-h-screen">
      <h2 className="font-bold text-3xl tracking-tight mt-5">{title}</h2>
      <div className="grid grid-cols-8 gap-6 p-6">
        {loading
          ? Array(16).fill(0).map((_, i) => <MovieSkeleton key={i} />)
          : error
            ? (
              <p className="col-span-8 text-red-500 text-center">
                Không thể tải dữ liệu. Vui lòng thử lại!
              </p>
            )
            : listMovie.length === 0
              ? (
                <p className="col-span-8 bg-[#14161D] w-80 text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-gray-400">
                  Không có phim nào
                </p>
              )
              : (
                listMovie.map(item => (
                  <CartItem key={`${item.media_type}-${item.id}`} item={item} />
                ))
              )
        }
      </div>
      <div className="mt-2 min-h-[30px]">
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MovieList;

import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import CartItem from "../../components/CartItem/CartItem";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";

import {
  searchMulti,
  discoverMulti,
  getTrending,
  getTopRated,
  getPopular,
} from "../../services/MovieListApi";
import axios from "axios";

const mergeResult = (movieRes, tvRes) => {
  const combined = [
    ...movieRes.data.results.map(i => ({ ...i, media_type: "movie" })),
    ...tvRes.data.results.map(i => ({ ...i, media_type: "tv" })),
  ];

  combined.sort((a, b) => b.popularity - a.popularity);

  return {
    results: combined,
    totalPages: Math.max(
      movieRes.data.total_pages,
      tvRes.data.total_pages
    ),
  };
};

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

  const fetchCombined = async (signal) => {
    if (searchTerm) {
      const [movieRes, tvRes] = await searchMulti(searchTerm, page, { signal });
      return mergeResult(movieRes, tvRes);
    }

    if (selectedGenre || selectedCountry) {
      const [movieRes, tvRes] = await discoverMulti({
        genre: selectedGenre,
        country: selectedCountry,
        page,
      }, { signal });
      return mergeResult(movieRes, tvRes);
    }

    if (selectedCategory === "trending") {
      const [movieRes, tvRes] = await getTrending(page, { signal });
      return mergeResult(movieRes, tvRes);
    }

    if (selectedCategory === "top-rated") {
      const [movieRes, tvRes] = await getTopRated(page, { signal });
      return mergeResult(movieRes, tvRes);
    }

    const res = await getPopular(selectedType, page, { signal });
    return {
      results: res.data.results.map(i => ({ ...i, media_type: selectedType })),
      totalPages: res.data.total_pages || 1,
    };
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCombined(controller.signal);
        setListMovie(res.results);
        setTotalPages(res.totalPages);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err);
        setListMovie([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort()
  }, [searchTerm, selectedGenre, selectedCountry, selectedType, selectedCategory, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, searchTerm, selectedGenre, selectedCountry, selectedType]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const genreName = genres.find(g => g.id == selectedGenre)?.name;
  const countryName = countries.find(c => c.iso_3166_1 === selectedCountry)?.english_name;

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
        {loading ? (
          Array(16).fill(0).map((_, i) => <MovieSkeleton key={i} />)
        ) : error ? (
          <p className="col-span-8 text-red-500 text-center">
            Không thể tải dữ liệu. Vui lòng thử lại!
          </p>
        ) : listMovie.length === 0 ? (
          <p className="col-span-8 bg-[#14161D] w-80 text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-gray-400">
            Không có phim nào
          </p>
        ) : (
          listMovie.map(item => (
            <CartItem key={`${item.media_type}-${item.id}`} item={item} />
          ))
        )}
      </div>

      <div className="mt-2 min-h-[30px]">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;

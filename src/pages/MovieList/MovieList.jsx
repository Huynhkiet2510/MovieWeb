import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import CartItem from "../../components/CartItem/CartItem";

const MovieList = () => {
  const {
    searchTerm,
    selectedGenre,
    selectedCountry,
    selectedType,
    genres,
    countries,
  } = useOutletContext();

  const [listMovie, setListMovie] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const type = selectedType || "tv";
  const page = Number(searchParams.get("page")) || 1;

  // Build TMDB URL
  const buildUrl = () => {
    if (searchTerm)
      return `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
        searchTerm
      )}&page=${page}`;

    if (selectedGenre)
      return `https://api.themoviedb.org/3/discover/${type}?with_genres=${selectedGenre}&page=${page}`;

    if (selectedCountry)
      return `https://api.themoviedb.org/3/discover/${type}?with_origin_country=${selectedCountry}&page=${page}`;

    if (type === "tv") return `https://api.themoviedb.org/3/tv/popular?page=${page}`;
    return `https://api.themoviedb.org/3/movie/popular?page=${page}`;
  };

  useEffect(() => {
    const url = buildUrl();
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(url, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        });

        // Gắn media_type để UI phân biệt Movie/TV
        const results = res.data.results.map((item) => ({
          ...item,
          media_type: item.media_type || (url.includes("/tv") ? "tv" : "movie"),
        }));

        setListMovie(results);
        setTotalPages(res.data.total_pages || 1);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err);
        setListMovie([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [searchTerm, selectedGenre, selectedCountry, selectedType, page]);

  // Scroll lên đầu trang khi đổi page hoặc filter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedGenre, selectedCountry, selectedType]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  // Title động
  const genreName = genres.find((g) => g.id == selectedGenre)?.name;
  const countryName = countries.find((c) => c.iso_3166_1 === selectedCountry)?.english_name;

  let title = "Danh sách phim nổi bật";
  if (genreName) title = `Phim ${genreName}`;
  else if (countryName) title = `Phim ${countryName}`;
  else if (type === "tv") title = "Phim bộ";
  else if (type === "movie") title = "Phim lẻ";

  return (
    <div className="text-center">
      <h2 className="font-bold text-3xl tracking-tight mt-5">{title}</h2>

      {loading && (
        <p className="text-gray-400 p-10 text-center">Đang tải phim...</p>
      )}

      {error && (
        <p className="text-red-500 p-10 text-center">
          Không thể tải dữ liệu. Vui lòng thử lại!
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-8 gap-6 p-6">
          {listMovie.length === 0 ? (
            <p className="col-span-8 bg-[#14161D] w-80 text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-gray-400">
              Không có phim nào
            </p>
          ) : (
            listMovie.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
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

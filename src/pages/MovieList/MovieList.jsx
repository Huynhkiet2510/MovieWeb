import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";

const MovieList = () => {
  const { searchTerm, selectedGenre, selectedCountry, selectedType, genres, countries } = useOutletContext();
  const [listMovie, setListMovie] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const type = selectedType || "movie";
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchMovies = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
      });
      const results = res.data.results.map((item) => ({
        ...item,
        media_type: item.media_type || (url.includes("/tv") ? "tv" : "movie"),
      }));
      setListMovie(results);
      setTotalPages(res.data.total_pages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy phim:", error);
      setListMovie([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    let url = "";

    if (searchTerm) {
      url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(searchTerm)}&page=${page}`;
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/${type}?with_genres=${selectedGenre}&page=${page}`;
    } else if (selectedCountry) {
      url = `https://api.themoviedb.org/3/discover/${type}?region=${selectedCountry}&watch_region=${selectedCountry}&with_watch_monetization_types=free&page=${page}`;
    } else if (selectedType === "tv") {
      url = `https://api.themoviedb.org/3/tv/popular?page=${page}`;
    } else if (selectedType === "movie") {
      url = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/trending/all/day?language=vi-VN&page=${page}`;
    }

    fetchMovies(url);
  }, [searchTerm, selectedGenre, selectedCountry, selectedType, page]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedGenre, selectedCountry, selectedType]);


  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const genreName = genres.find(g => g.id == selectedGenre)?.name;
  const countryName = countries.find(c => c.iso_3166_1 === selectedCountry)?.english_name;

  let title = "";
  if (genreName) {
    title = `Phim ${genreName}`;
  } else if (countryName) {
    title = `Phim ${countryName}`;
  } else if (type === "tv") {
    title = `Phim bộ`;
  } else if (type === "movie") {
    title = `Phim lẻ`;
  }

  return (
    <div className="text-center">
      <h2 className="font-bold text-3xl tracking-tight mt-5">
        {title}
      </h2>

      <div className="grid grid-cols-8 gap-6 p-6">
        {listMovie.length === 0 ? (
          <p className="col-span-8 bg-[#14161D] w-80 text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-gray-400">
            Không có phim nào
          </p>
        ) : (
          listMovie.map((movie) => (
            <div
              className="bg-[#2B2C38] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
              key={movie.id}
              onClick={() => navigate(`/${movie.media_type}/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="h-70"
              />
              <h3 className="truncate w-full p-2">
                {movie.title || movie.name}
              </h3>
            </div>
          ))
        )}
      </div>

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

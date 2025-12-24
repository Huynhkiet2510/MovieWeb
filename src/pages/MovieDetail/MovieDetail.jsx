import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

import MainContent from "./MainContent";
import MovieDetailSkeleton from "../../components/MovieDetailSkeleton/MovieDetailSkeleton";
import { useMovieActions } from "../../hooks/useMovieActions";

const MovieDetail = () => {
  const { media, id } = useParams();
  const selectedType = media;
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    isFavorite,
    isWatchList,
    toggleFavorite,
    toggleWatchList,
    setIsFavorite,
    setIsWatchList,
    cleanup,
  } = useMovieActions({ media: selectedType, id });

  const user = useSelector((state) => state.auth.user);
  const session_id = useSelector((state) => state.auth.session_id);

  /* ================= FETCH DETAIL ================= */
  useEffect(() => {
    const controller = new AbortController();

    const fetchDetail = async () => {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const detailRes = await axios.get(
          `${import.meta.env.VITE_BASE}/${selectedType}/${id}`,
          { signal: controller.signal, headers }
        );

        setMovie(detailRes.data);

        let creditsRes;

        if (selectedType === "movie") {
          creditsRes = await axios.get(
            `${import.meta.env.VITE_BASE}/movie/${id}/credits`,
            { signal: controller.signal, headers }
          );

          const crew = creditsRes.data.crew || [];
          const castList = creditsRes.data.cast || [];
          const directorInfo = crew.find((c) => c.job === "Director");

          setDirector(directorInfo?.name || "Không rõ");
          setCast(castList.slice(0, 5));
        } else {
          creditsRes = await axios.get(
            `${import.meta.env.VITE_BASE}/tv/${id}/credits`,
            { signal: controller.signal, headers }
          );

          setDirector(
            detailRes.data.created_by?.map((c) => c.name).join(", ") ||
              "Không rõ"
          );
          setCast((creditsRes.data.cast || []).slice(0, 5));
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Lỗi khi fetch detail:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    return () => controller.abort();
  }, [id, selectedType]);

  /* ================= FETCH FAVORITE / WATCHLIST ================= */
  useEffect(() => {
    if (!movie || !user?.id || !session_id) return;

    const controller = new AbortController();

    const fetchUserLists = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const type = selectedType === "movie" ? "movies" : "tv";

        const favRes = await axios.get(
          `${import.meta.env.VITE_BASE}/account/${user.id}/favorite/${type}?session_id=${session_id}`,
          { signal: controller.signal, headers }
        );

        const watchRes = await axios.get(
          `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/${type}?session_id=${session_id}`,
          { signal: controller.signal, headers }
        );

        setIsFavorite(favRes.data.results.some((m) => m.id === Number(id)));
        setIsWatchList(watchRes.data.results.some((m) => m.id === Number(id)));
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Lỗi fetch favorite/watchlist:", err);
        }
      }
    };

    fetchUserLists();
    return () => controller.abort();
  }, [movie, user?.id, session_id, selectedType]);

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => cleanup();
  }, []);

  /* ================= DURATION ================= */
  let duration = "Không rõ";
  if (selectedType === "movie" && movie?.runtime > 0) {
    duration = `${movie.runtime} phút`;
  } else if (
    selectedType === "tv" &&
    Array.isArray(movie?.episode_run_time)
  ) {
    const times = movie.episode_run_time.filter((t) => t > 0);
    if (times.length === 1) duration = `${times[0]} phút / tập`;
    else if (times.length > 1)
      duration = `${Math.min(...times)}–${Math.max(...times)} phút / tập`;
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="text-red-500 p-10 text-center">
        Lỗi khi tải dữ liệu!
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="movie-detail">
      {loading || !movie ? (
        <MovieDetailSkeleton />
      ) : (
        <>
          <div className="relative w-full h-[600px]">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 left-6 z-20 flex items-center gap-2
                         px-4 py-2 rounded-lg text-white
                         hover:bg-[#1F202A] transition"
            >
              <FaArrowLeft />
              <span>Quay lại</span>
            </button>

            <img
              src={`https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <MainContent
            movie={movie}
            duration={duration}
            director={director}
            cast={cast}
            selectedType={selectedType}
            id={id}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            toggleWatchList={toggleWatchList}
            isWatchList={isWatchList}
          />
        </>
      )}
    </div>
  );
};

export default MovieDetail;

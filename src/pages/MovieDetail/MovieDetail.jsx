import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainContent from './MainContent';
import { FaArrowLeft } from "react-icons/fa";
import { useMovieActions } from "../../hooks/useMovieActions";
import axios from 'axios';

const MovieDetail = () => {
  const { media, id } = useParams();
  const selectedType = media;
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, isWatchList, toggleFavorite, toggleWatchList, setIsFavorite, setIsWatchList, cleanup } = useMovieActions({ media: selectedType, id });


  const user = JSON.parse(localStorage.getItem("tmdb_user"));
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const controller = new AbortController();

    const fetchDetail = async () => {
      try {
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
        if (selectedType === 'movie') {
          creditsRes = await axios.get(
            `${import.meta.env.VITE_BASE}/movie/${id}/credits`,
            { signal: controller.signal, headers }
          );

          const crew = creditsRes.data.crew || [];
          const castList = creditsRes.data.cast || [];
          const directorInfo = crew.find(c => c.job === "Director");
          setDirector(directorInfo ? directorInfo.name : "Không rõ");
          setCast(castList.slice(0, 5));

        } else if (selectedType === 'tv') {
          creditsRes = await axios.get(
            `${import.meta.env.VITE_BASE}/tv/${id}/credits`,
            { signal: controller.signal, headers }
          );

          const castList = creditsRes.data.cast || [];
          setDirector(detailRes.data.created_by.map(c => c.name).join(', ') || "Không rõ");
          setCast(castList.slice(0, 5));
        }

      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Lỗi khi fetch detail:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    return () => controller.abort();
  }, [id, selectedType]);


  useEffect(() => {
    if (!movie || !user || !session_id) return;
    const controller = new AbortController();
    const fetchUserLists = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };
        const type = selectedType === 'movie' ? 'movies' : 'tv';
        const favRes = await axios.get(
          `${import.meta.env.VITE_BASE}/account/${user.id}/favorite/${type}?session_id=${session_id}`,
          { signal: controller.signal, headers }
        );
        const watchRes = await axios.get(
          `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/${type}?session_id=${session_id}`,
          { signal: controller.signal, headers }
        );

        setIsFavorite(favRes.data.results.some(m => m.id === Number(id)));
        setIsWatchList(watchRes.data.results.some(m => m.id === Number(id)));

      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Lỗi khi fetch favorite/watchlist:", error);
      }
    };

    fetchUserLists();

    return () => controller.abort();
  }, [movie, user, session_id, id, selectedType]);


  useEffect(() => {
    return () => cleanup();
  }, []);

  let duration = "Không rõ";
  if (selectedType === "movie" && movie?.runtime > 0) {
    duration = `${movie.runtime} phút`;
  } else if (selectedType === "tv" && Array.isArray(movie?.episode_run_time)) {
    const times = movie.episode_run_time.filter(t => t > 0);
    if (times.length === 1) duration = `${times[0]} phút / tập`;
    else if (times.length > 1) duration = `${Math.min(...times)}–${Math.max(...times)} phút / tập`;
  }

  if (!movie || loading) return <div>Đang tải ...</div>;
  if (error) return <div className="text-red-500">Lỗi khi tải dữ liệu!</div>;

  return (
    <div className="movie-detail">
      <div className="relative w-full h-[600px]">
        <button onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex z-20 items-center gap-2 
                    hover:bg-[#1F202A] text-white cursor-pointer
                   px-4 py-2 rounded-lg transition-all duration-200">
          <FaArrowLeft className="w-5 h-5" />
          <span>Quay lại</span></button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover object-top z-0"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
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
    </div>
  );
};

export default MovieDetail;


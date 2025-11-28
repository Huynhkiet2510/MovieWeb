import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Review from '../Review/Review';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaStar, FaPlay, FaArrowLeft } from "react-icons/fa";
import Rating from "../../components/Rating/Rating"
import { toast } from 'react-toastify';
import axios from 'axios';

const MovieDetail = () => {
  const { media, id } = useParams();
  const selectedType = media;
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);

  const user = JSON.parse(localStorage.getItem("tmdb_user"));
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const detailRes = await axios.get(
          `https://api.themoviedb.org/3/${selectedType}/${id}`,
          { headers }
        );
        setMovie(detailRes.data);

        let creditsRes;
        if (selectedType === 'movie') {
          creditsRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits`,
            { headers }
          );

          const crew = creditsRes.data.crew || [];
          const castList = creditsRes.data.cast || [];
          const directorInfo = crew.find(c => c.job === "Director");
          setDirector(directorInfo ? directorInfo.name : "Không rõ");
          setCast(castList.slice(0, 5));

          if (user && session_id) {
            const favRes = await axios.get(
              `https://api.themoviedb.org/3/account/${user.id}/favorite/movies?session_id=${session_id}`,
              { headers }
            );
            setIsFavorite(favRes.data.results.some(m => m.id === Number(id)));
          }
        } else if (selectedType === 'tv') {
          creditsRes = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/credits`,
            { headers }
          );
          const castList = creditsRes.data.cast || [];
          setDirector(detailRes.data.created_by.map(c => c.name).join(', ') || "Không rõ");
          setCast(castList.slice(0, 5));
        }

      } catch (err) {
        console.error("Lỗi khi fetch detail:", err);
      }
    };

    fetchDetail();
  }, [id, selectedType]);

  const toggleFavorite = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Yêu thích 😢");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?session_id=${session_id}`,
        {
          media_type: media,
          media_id: Number(id),
          favorite: !isFavorite
        },
        { headers }
      );

      setIsFavorite(!isFavorite);
      toast.success("Thêm phim vào danh sách yêu thích thành công 🎉")
    } catch (error) {
      console.error("Lỗi favorite:", error);
      toast.error("Thêm phim vào danh sách yêu thích thất bại 😢");
    }
  };

  const toggleWatchList = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Danh sách 😢");
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?session_id=${session_id}`,
        {
          media_type: media,
          media_id: Number(id),
          watchlist: !isWatchList,
        },
        { headers });

      setIsWatchList(!isWatchList);
      toast.success("Thêm phim vào danh sách mong muốn thành công 🎉")
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error)
      toast.error("Thêm phim vào danh sách mong muốn thất bại 😢");
    }
  }

  if (!movie) return <p className="movie-loading">Đang tải...</p>;

  // Thời lượng
  let duration = "Không rõ";
  if (selectedType === "movie" && movie.runtime > 0) duration = `${movie.runtime} phút`;
  else if (selectedType === "tv" && Array.isArray(movie.episode_run_time)) {
    const times = movie.episode_run_time.filter(t => t > 0);
    if (times.length === 1) duration = `${times[0]} phút / tập`;
    else if (times.length > 1) duration = `${Math.min(...times)}–${Math.max(...times)} phút / tập`;
  }

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

      <div className="relative flex flex-col md:flex-row -mt-40 px-6 md:px-10 gap-6 z-20">

        <div className="relative z-10 flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
            loading="lazy"
            className="h-72 md:h-110 rounded-2xl shadow-xl"
          />
        </div>

        <div className="flex-1 bg-[#2b2c38] rounded-2xl p-6 md:p-10 shadow-md flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{movie.title || movie.name}</h1>

          <div className="space-y-3 text-gray-300">
            <div className="flex gap-2"><span className="font-bold text-white">Ngày phát hành:</span>{movie.release_date || movie.first_air_date}</div>
            <div className="flex gap-2"><span className="font-bold text-white">Điểm:</span><span className="flex items-center gap-1 text-yellow-400"><FaStar /> {movie.vote_average}</span></div>
            <div className="flex gap-2"><span className="font-bold text-white">Thời lượng:</span>{duration}</div>
            <div className="flex gap-2"><span className="font-bold text-white">Thể loại:</span>{movie?.genres?.map(g => g.name).join(", ")}</div>
            <div className="flex gap-2"><span className="font-bold text-white">Đạo diễn:</span>{director}</div>
            <div className="flex gap-2"><span className="font-bold text-white">Diễn viên:</span>{cast.map(c => c.name).join(', ')}</div>
            <div><span className="font-bold text-white">Giới thiệu:</span><p className="text-gray-400 mt-2">{movie.overview}</p></div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => navigate(`/watch/${selectedType}/${id}`)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-300 hover:shadow-[0_0_15px_0_rgba(22,163,74,0.6),0_0_25px_0_rgba(134,239,172,0.4)] text-black text-lg font-bold px-4 rounded-3xl cursor-pointer transition-all duration-400"
            >
              <FaPlay /> Xem Trailer
            </button>


            <button className="flex flex-col items-center gap-2 px-4 py-2 rounded-lg text-white text-lg hover:bg-[#191B24] cursor-pointer transition-colors duration-200"
              onClick={toggleFavorite}>
              {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
              Yêu thích
            </button>

            <button onClick={toggleWatchList} className="flex flex-col items-center gap-2 px-4 py-2 rounded-lg text-white text-lg hover:bg-[#191B24] cursor-pointer transition-colors duration-200">
              {isWatchList ? <FaBookmark className='text-amber-300' /> : <FaRegBookmark />}
              Thêm vào
            </button>
            <Rating />
          </div>

          <Review />
        </div>
      </div>
    </div>

  );
};

export default MovieDetail;

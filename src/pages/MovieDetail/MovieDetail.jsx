import { useRef, useEffect, useState } from 'react';
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
  const favControllerRef = useRef(null);
  const watchControllerRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);

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
          `https://api.themoviedb.org/3/${selectedType}/${id}`,
          {
            signal: controller.signal,
            headers
          }
        );
        setMovie(detailRes.data);

        let creditsRes;
        if (selectedType === 'movie') {
          creditsRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits`,
            {
              signal: controller.signal,
              headers
            }
          );

          const crew = creditsRes.data.crew || [];
          const castList = creditsRes.data.cast || [];
          const directorInfo = crew.find(c => c.job === "Director");
          setDirector(directorInfo ? directorInfo.name : "Không rõ");
          setCast(castList.slice(0, 5));

          if (user && session_id) {
            const favRes = await axios.get(
              `https://api.themoviedb.org/3/account/${user.id}/favorite/movies?session_id=${session_id}`,
              {
                signal: controller.signal,
                headers
              }
            );
            setIsFavorite(favRes.data.results.some(m => m.id === Number(id)));
          }
        } else if (selectedType === 'tv') {
          creditsRes = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/credits`,
            {
              signal: controller.signal,
              headers
            }
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

  const toggleFavorite = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Yêu thích 😢");
      return;
    }

    // Hủy request favorite cũ (nếu có) để tránh race / spam
    favControllerRef.current?.abort();

    // Tạo controller mới cho request hiện tại và lưu vào ref
    const controller = new AbortController();
    favControllerRef.current = controller;

    try {
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      // Gọi API — gắn signal để có thể hủy nếu cần
      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?session_id=${session_id}`,
        {
          media_type: media,
          media_id: Number(id),
          favorite: !isFavorite,
        },
        { headers, signal: controller.signal }
      );

      // Chỉ cập nhật UI khi request thành công
      setIsFavorite(prev => !prev);
      toast.success(
        !isFavorite
          ? "Đã thêm vào danh sách yêu thích 🎉"
          : "Đã xóa khỏi danh sách yêu thích ❌"
      );
    } catch (error) {
      // Nếu request bị hủy (abort) thì không coi là lỗi
      if (axios.isCancel(error)) {
        console.log("⛔ Request favorite đã bị hủy");
        return;
      }
      console.error("Lỗi favorite:", error);
      toast.error("Thêm phim vào danh sách yêu thích thất bại 😢");
      setError(error);
    } finally {
      // Giải phóng ref (không hủy ở đây, chỉ clear ref)
      if (favControllerRef.current === controller) favControllerRef.current = null;
    }
  };

  const toggleWatchList = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Danh sách 😢");
      return;
    }

    // Hủy request watchlist cũ (nếu có)
    watchControllerRef.current?.abort();

    // Tạo controller mới cho request hiện tại và lưu vào ref
    const controller = new AbortController();
    watchControllerRef.current = controller;

    try {
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?session_id=${session_id}`,
        {
          media_type: media,
          media_id: Number(id),
          watchlist: !isWatchList,
        },
        { headers, signal: controller.signal }
      );

      setIsWatchList(prev => !prev);
      toast.success(
        !isWatchList
          ? "Đã thêm vào danh sách xem sau 🎉"
          : "Đã xóa khỏi danh sách xem sau ❌"
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("⛔ Request watchlist đã bị hủy");
        return;
      }
      console.error("Lỗi watchlist:", error);
      toast.error("Thêm phim vào danh sách mong muốn thất bại 😢");
      setError(error);
    } finally {
      if (watchControllerRef.current === controller) watchControllerRef.current = null;
    }
  };


  useEffect(() => {
    return () => {
      favControllerRef.current?.abort();
      watchControllerRef.current?.abort();
    };
  }, []);


  if (!movie) return <p className="movie-loading">Đang tải...</p>;

  let duration = "Không rõ";
  if (selectedType === "movie" && movie.runtime > 0) duration = `${movie.runtime} phút`;
  else if (selectedType === "tv" && Array.isArray(movie.episode_run_time)) {
    const times = movie.episode_run_time.filter(t => t > 0);
    if (times.length === 1) duration = `${times[0]} phút / tập`;
    else if (times.length > 1) duration = `${Math.min(...times)}–${Math.max(...times)} phút / tập`;
  }

  if (loading) return <div>Loading ...</div>
  if (error) return <div className="text-red-500">Lỗi khi tải danh sách yêu thích!</div>

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

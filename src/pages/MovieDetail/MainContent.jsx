import Review from '../Review/Review';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPlay, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import Rating from "../../components/Rating/Rating";

const MainContent = ({ movie, duration, director, cast, selectedType, id, toggleFavorite, isFavorite, toggleWatchList, isWatchList }) => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col md:flex-row -mt-50 px-6 md:px-10 gap-6 z-20">
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
    )
}

export default MainContent;

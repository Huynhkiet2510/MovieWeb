import Review from '../ReviewPage/Review';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPlay, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import Rating from "../../components/Rating/Rating";

const MainContent = ({ movie, duration, director, cast, selectedType, id, toggleFavorite, isFavorite, toggleWatchList, isWatchList }) => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col md:flex-row -mt-50 px-6 md:px-10 gap-6 z-20 pb-10">
            <div className="relative z-10 flex-shrink-0">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    loading="lazy"
                    className="h-72 md:h-110 rounded-2xl shadow-xl"
                />
            </div>

            <div className="flex-1 bg-card-bg rounded-2xl p-6 md:pt-10 md:px-10 md:pb-0 shadow-md flex flex-col gap-6">
                <h1 className="text-3xl md:text-4xl font-bold text-text-muted">{movie.title || movie.name}</h1>
                <div className="space-y-3">
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Ngày phát hành:</span>{movie.release_date || movie.first_air_date}</div>
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Điểm:</span><span className="flex items-center gap-1 text-yellow-400"><FaStar /> {movie.vote_average}</span></div>
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Thời lượng:</span>{duration}</div>
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Thể loại:</span>{movie?.genres?.map(g => g.name).join(", ")}</div>
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Đạo diễn:</span>{director}</div>
                    <div className="flex gap-2 text-info-value"><span className="font-bold text-text-muted">Diễn viên:</span>{cast.map(c => c.name).join(', ')}</div>
                    <div className="text-info-value"><span className="font-bold text-text-muted">Giới thiệu:</span> {movie.overview}</div>
                </div>


                <div className="flex flex-col lg:flex-row items-center gap-6 mt-6 lg:gap-8 w-full">
                    <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                        <button
                            onClick={() => navigate(`/watch/${selectedType}/${id}`)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-300 hover:shadow-[0_0_15px_0_rgba(22,163,74,0.6),0_0_25px_0_rgba(134,239,172,0.4)] text-black text-lg font-bold px-8 py-3 rounded-full cursor-pointer transition-all duration-400 shrink-0"
                        >
                            <FaPlay /> Xem Trailer
                        </button>
                    </div>

                    <div className="flex items-center gap-8 lg:gap-6">
                        <button
                            className="flex flex-col items-center gap-1 text-text-muted hover:text-red-500 transition-colors duration-200 cursor-pointer"
                            onClick={toggleFavorite}
                        >
                            <div className="text-2xl">
                                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Yêu thích</span>
                        </button>

                        <button
                            onClick={toggleWatchList}
                            className="flex flex-col items-center gap-1 text-text-muted hover:text-orange-400 transition-colors duration-200 cursor-pointer"
                        >
                            <div className="text-2xl">
                                {isWatchList ? <FaBookmark className='text-orange-400' /> : <FaRegBookmark />}
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Thêm vào</span>
                        </button>
                    </div>

                    <div className="w-full lg:w-fit flex flex-col items-center lg:items-start">
                        <div className="scale-110 origin-center lg:origin-left">
                            <Rating />
                        </div>
                    </div>
                </div>
                <div className="mt-2 pb-10 min-h-[30px]">
                    <Review media={selectedType} id={id} />
                </div>
            </div>
        </div>
    )
}

export default MainContent;

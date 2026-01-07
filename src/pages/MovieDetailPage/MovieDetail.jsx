import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MainContent from "./MainContent";
import MovieDetailSkeleton from "../../components/MovieDetailSkeleton/MovieDetailSkeleton";
import { useFetchMovieDetail } from "./useFetchMovieDetail"
import { formatDuration } from "../../utils/formatDuration";

const MovieDetail = () => {
  const { media: selectedType, id } = useParams();
  const navigate = useNavigate();
  const { movie, director, cast, error, loading, isFavorite, isWatchList, toggleFavorite, toggleWatchList } = useFetchMovieDetail(selectedType, id);

  const duration = formatDuration(selectedType, movie);

  if (error) {
    return (
      <div className="text-red-500 p-10 text-center">
        Lỗi khi tải dữ liệu!
      </div>
    );
  }

  return (
    <div className="bg-page-bg relative movie-detail">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-card-bg/60 hover:bg-red-600 hover:text-white text-text-main px-4 py-2 rounded-lg transition-all duration-200 border border-border shadow-lg backdrop-blur-m cursor-pointer">
        <FaArrowLeft />
        <span>Quay lại</span>
      </button>

      {loading || !movie ? (
        <MovieDetailSkeleton />
      ) : (
        <>
          <div className="relative w-full h-[600px]">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path
                }`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/50" />
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

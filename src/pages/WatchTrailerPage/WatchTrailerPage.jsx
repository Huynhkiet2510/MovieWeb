import { FaArrowLeft } from "react-icons/fa";
import ErrorState from "../../components/ErrorState/ErrorState"
import WatchTrailerSkeleton from "../../components/WatchTrailerSkeleton/WatchTrailerSkeleton";
import { useWatchTrailer } from "./useWatchTrailer"

const WatchTrailerPage = () => {

    const { trailerKey, loading, error, noTrailer, handleBack } = useWatchTrailer();

    if (error) {
        return (
            <ErrorState
                title="Không tải được thông tin của Phim rồi =((("
                message="Tôi vừa chia tay bạn gái xong thì bạn đừng mong đc xem phim đâu!!!!"
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-page-bg flex flex-col transition-colors duration-500">
            <div className="p-4 sm:absolute sm:top-6 sm:left-6 sm:z-10 sm:p-0">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 bg-card-bg/60 hover:bg-red-600 
                               hover:text-white text-text-main px-3 py-2 sm:px-4 sm:py-2 
                               rounded-lg transition-all duration-200 border border-border 
                               shadow-lg backdrop-blur-md cursor-pointer"
                >
                    <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium text-sm sm:text-base">Quay lại</span>
                </button>
            </div>

            <div className="flex-1 flex flex-col sm:justify-center items-center p-0 sm:p-4">

                {loading ? (
                    <div className="w-full max-w-6xl aspect-video">
                        <WatchTrailerSkeleton />
                    </div>
                ) : noTrailer ? (
                    <div className="mt-10 sm:mt-0 bg-card-bg w-[90%] max-w-md text-center p-8 rounded-2xl shadow-xl border border-border">

                        <p className="text-text-main font-medium text-lg mb-2">Không tìm thấy trailer</p>
                        <button onClick={handleBack} className="mt-4 text-red-600 font-bold hover:underline">
                            Quay lại trang trước
                        </button>
                    </div>
                ) : (
                    <div className="w-full sm:max-w-6xl aspect-video shadow-2xl">
                        <div className="sm:hidden p-6 w-full text-center">
                            <h2 className="text-text-main font-bold text-xl uppercase tracking-wider">
                                Đang xem Trailer
                            </h2>
                        </div>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                            title="Movie Trailer"
                            className="w-full h-full sm:rounded-2xl border-b sm:border border-border"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}


            </div>
        </div>
    );
};

export default WatchTrailerPage;
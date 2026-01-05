import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import getTrailer from "../../services/WatchTrailerApi";
import WatchTrailerSkeleton from "../../components/WatchTrailerSkeleton/WatchTrailerSkeleton";

const WatchTrailerPage = () => {
    const { media, id } = useParams();
    const navigate = useNavigate();

    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noTrailer, setNoTrailer] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchTrailer = async () => {
            try {
                setLoading(true);
                setError(null);
                setNoTrailer(false);

                const res = await getTrailer(media, id, {
                    signal: controller.signal,
                });

                const videos = res?.data?.results || [];
                // Ưu tiên tìm video có type là Trailer, nếu không có lấy video đầu tiên
                const trailer = videos.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                ) || videos.find(v => v.site === "YouTube");

                if (!trailer) {
                    setNoTrailer(true);
                } else {
                    setTrailerKey(trailer.key);
                }
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError("Không thể tải trailer. Vui lòng thử lại!");
                console.error("Fetch trailer error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
        return () => controller.abort();
    }, [media, id]);

    const handleBack = () => navigate(-1);

    return (
        <div className="relative w-full h-screen bg-black flex justify-center items-center p-4">
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 
                           bg-black/60 hover:bg-white/20 text-white 
                           px-4 py-2 rounded-lg transition-all duration-200"
            >
                <FaArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
            </button>

            {loading ? (
                <WatchTrailerSkeleton />
            ) : error ? (
                <div className="text-red-500 text-lg">{error}</div>
            ) : noTrailer ? (
                <div className="bg-[#14161D] w-full max-w-md text-center p-10 rounded-2xl text-sm text-gray-400">
                    <p>Rất tiếc, hiện tại không có trailer cho phim này.</p>
                </div>
            ) : (
                <div className="w-full h-full max-w-6xl aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                        title="Movie Trailer"
                        className="w-full h-full rounded-xl shadow-2xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    );
};

export default WatchTrailerPage;
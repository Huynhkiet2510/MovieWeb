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
        <div className="relative w-full h-screen bg-page-bg flex justify-center items-center p-4 transition-colors duration-500">
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 
                           bg-card-bg/60 hover:bg-red-600 hover:text-white text-text-main 
                           px-4 py-2 rounded-lg transition-all duration-200 border border-border shadow-lg backdrop-blur-md"
            >
                <FaArrowLeft className="w-4 h-4" />
                <span className="font-medium">Quay lại</span>
            </button>

            {loading ? (
                <WatchTrailerSkeleton />
            ) : error ? (
                <div className="text-red-600 font-semibold bg-red-600/10 px-6 py-4 rounded-xl border border-red-600/20">
                    {error}
                </div>
            ) : noTrailer ? (
                <div className="bg-card-bg w-full max-w-md text-center p-10 rounded-2xl shadow-xl border border-border">
                    <div className="text-5xl mb-4">🎬</div>
                    <p className="text-text-main font-medium text-lg mb-2">Không tìm thấy trailer</p>
                    <p className="text-text-muted text-sm">Rất tiếc, hiện tại hệ thống chưa cập nhật trailer cho phim này.</p>
                    <button
                        onClick={handleBack}
                        className="mt-6 text-red-600 font-bold hover:underline"
                    >
                        Quay lại trang trước
                    </button>
                </div>
            ) : (
                <div className="w-full h-full max-w-6xl aspect-video relative group">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                        title="Movie Trailer"
                        className="w-full h-full rounded-2xl  border border-border"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    );
};


export default WatchTrailerPage;
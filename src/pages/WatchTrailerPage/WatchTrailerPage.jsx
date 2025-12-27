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
                const trailer = videos.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                );

                if (!trailer) {
                    setNoTrailer(true);
                    return;
                }

                setTrailerKey(trailer.key);
            } catch (err) {
                if (err.name === "CanceledError" || axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
        return () => controller.abort();
    }, [media, id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-lg">
                Không thể tải trailer. Vui lòng thử lại!
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen flex justify-center items-center p-4">
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 flex items-center gap-2
          bg-black hover:bg-[#1F202A] text-white
          px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            >
                <FaArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
            </button>

            {loading && <WatchTrailerSkeleton />}

            {!loading && noTrailer && (
                <p className="bg-[#14161D] w-80 text-center p-10 rounded-2xl text-sm text-gray-400">
                    Không có trailer
                </p>
            )}

            {!loading && trailerKey && (
                <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Movie Trailer"
                    className="w-full h-full max-w-5xl rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}

        </div>
    );
};

export default WatchTrailerPage;

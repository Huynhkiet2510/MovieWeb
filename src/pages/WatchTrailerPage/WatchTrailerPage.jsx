import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const WatchTrailerPage = () => {
    const { media, id } = useParams();
    const [trailerKey, setTrailerKey] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const fetchTrailer = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                    accept: "application/json",
                };

                const res = await axios.get(
                    `https://api.themoviedb.org/3/${media}/${id}/videos`, {
                    signal: controller.signal,
                    headers
                }
                );

                const videos = res.data.results;
                const trailer = videos.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                );

                if (trailer) setTrailerKey(trailer.key);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Lỗi khi lấy dữ liệu", error);
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
        return () => controller.abort();

    }, [media, id]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };


    if (loading) return <div>Loading ...</div>
    if (error) return <div className="text-red-500">Lỗi khi tải danh sách yêu thích!</div>
    if (!trailerKey) return <p className="col-span-8 bg-[#14161D] w-80 text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-gray-400">Không có trailer</p>;


    return (
        <div className="relative w-full h-screen bg-black flex justify-center items-center p-4">

            <button
                onClick={handleBack}
                className="absolute top-6 left-6 flex items-center gap-2 
                   bg-black hover:bg-[#1F202A] text-white cursor-pointer
                   px-4 py-2 rounded-lg transition-all duration-200"
            >
                <FaArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
            </button>

            <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                className="w-full h-full max-w-5xl rounded-xl"
                allowFullScreen
            ></iframe>
        </div>

    );
};

export default WatchTrailerPage;

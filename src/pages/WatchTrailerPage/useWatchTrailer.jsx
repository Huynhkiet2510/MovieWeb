import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getTrailer from "../../services/WatchTrailerApi";
import axios from "axios";

export const useWatchTrailer = () => {
    const { media, id } = useParams();
    const navigate = useNavigate();

    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noTrailer, setNoTrailer] = useState(false);

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
                ) || videos.find(v => v.site === "YouTube");

                if (!trailer) {
                    setNoTrailer(true);
                } else {
                    setTrailerKey(trailer.key);
                }
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
        return () => controller.abort();

    }, [media, id]);

    const handleBack = () => navigate(-1);

    return {
        trailerKey, loading, error, noTrailer, handleBack
    }
}

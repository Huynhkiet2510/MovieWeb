import { useEffect, useState } from "react";
import getReview from "../../services/ReviewApi"
import axios from "axios";

export const useFetchReview = ({ media, id, page = 1 }) => {
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || !media) return;

        const controller = new AbortController();

        const fetchReview = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getReview(media, id, {
                    params: { page },
                    signal: controller.signal,
                });
                setReviews(res.data.results || []);
                setTotalPages(res.data.total_pages || 1);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
        return () => controller.abort();
    }, [id, page]);

    return { reviews, totalPages, loading, error };
};

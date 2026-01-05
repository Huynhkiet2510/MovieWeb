import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getFavoriteMulti from "../../services/FavoriteApi"

export const useFetchFavorite = (page = 1) => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const user = useSelector(state => state.auth.user);
    const session_id = useSelector(state => state.auth.session_id);

    useEffect(() => {
        if (!user?.id || !session_id) return;

        const controller = new AbortController();

        const fetchFavoriteList = async () => {
            try {
                setLoading(true);
                setError(null);

                const [movieRes, tvRes] = await getFavoriteMulti(
                    user.id,
                    session_id,
                    {
                        params: { page },
                        signal: controller.signal
                    }
                )

                const merged = [
                    ...movieRes.data.results.map(item => ({
                        ...item,
                        media_type: "movie",
                        display_title: item.title,
                    })),
                    ...tvRes.data.results.map(item => ({
                        ...item,
                        media_type: "tv",
                        display_title: item.name,
                    })),
                ];

                const total = Math.max(movieRes.data.total_pages, tvRes.data.total_pages);
                setTotalPages(total);

                const sortedList = [...merged].sort((a, b) => {
                    return b.id - a.id;
                });
                setFavoriteList(sortedList);
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteList();
        return () => controller.abort();

    }, [user?.id, session_id, page]);

    return {
        favoriteList, loading, error, totalPages
    }
}

import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import getWishlistMulti from "../../services/WishListApi"

export const useFetchWishList = (page = 1) => {

    const [wishList, setWishlist] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const user = useSelector(state => state.auth.user);
    const session_id = useSelector(state => state.auth.session_id);

    useEffect(() => {
        if (!user?.id || !session_id) return;

        const controller = new AbortController();

        const fetchWishList = async () => {
            try {
                setLoading(true);
                setError(null);

                const [movieRes, tvRes] = await getWishlistMulti(
                    user.id,
                    session_id,
                    {
                        params: { page },
                        signal: controller.signal
                    }
                );

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
                setWishlist(sortedList);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishList();
        return () => controller.abort();
    }, [user?.id, session_id, page]);
    return {
        wishList, loading, error, totalPages
    }
}

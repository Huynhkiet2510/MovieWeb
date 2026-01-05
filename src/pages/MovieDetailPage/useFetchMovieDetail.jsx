import { useEffect, useState } from 'react'
import { useMovieActions } from "./useMovieActions";
import { useSelector } from 'react-redux';
import {
    getDetail,
    getCredits,
    getFavoriteList,
    getWatchList,
} from "../../services/MovieDetailApi";
import axios from 'axios';

export const useFetchMovieDetail = (selectedType, id) => {
    const [movie, setMovie] = useState(null);
    const [director, setDirector] = useState("");
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        isFavorite,
        isWatchList,
        toggleFavorite,
        toggleWatchList,
        setIsFavorite,
        setIsWatchList,
        cleanup,
    } = useMovieActions({ media: selectedType, id });

    const user = useSelector((state) => state.auth.user);
    const session_id = useSelector((state) => state.auth.session_id);

    useEffect(() => {
        const controller = new AbortController();

        const fetchDetail = async () => {
            try {
                setLoading(true);

                const detailRes = await getDetail(selectedType, id, {
                    signal: controller.signal,
                });

                setMovie(detailRes.data);

                const creditsRes = await getCredits(selectedType, id, {
                    signal: controller.signal,
                });

                if (selectedType === "movie") {
                    const crew = creditsRes.data.crew || [];
                    const castList = creditsRes.data.cast || [];
                    const directorInfo = crew.find((c) => c.job === "Director");

                    setDirector(directorInfo?.name || "Không rõ");
                    setCast(castList.slice(0, 5));
                } else {
                    setDirector(
                        detailRes.data.created_by?.map((c) => c.name).join(", ") ||
                        "Không rõ"
                    );
                    setCast((creditsRes.data.cast || []).slice(0, 5));
                }
            } catch (err) {
                if (err.name !== "CanceledError") {
                    console.error("Lỗi khi fetch detail:", err);
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
        return () => controller.abort();
    }, [id, selectedType]);


    useEffect(() => {
        if (!movie || !user?.id || !session_id) return;

        const controller = new AbortController();
        const type = selectedType === "movie" ? "movies" : "tv";

        const fetchUserLists = async () => {
            try {
                const [favRes, watchRes] = await Promise.all([
                    getFavoriteList(user.id, type, session_id, {
                        signal: controller.signal,
                    }),
                    getWatchList(user.id, type, session_id, {
                        signal: controller.signal,
                    }),
                ]);

                setIsFavorite(favRes.data.results.some((m) => m.id === Number(id)));
                setIsWatchList(watchRes.data.results.some((m) => m.id === Number(id)));
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Lỗi khi fetch detail:", err);
                setError(err);
            }
        };

        fetchUserLists();
        return () => controller.abort();
    }, [movie, user?.id, session_id, selectedType]);

    useEffect(() => {
        return () => cleanup();
    }, []);



    return {
        movie, director, cast, error, loading, isFavorite, isWatchList, toggleFavorite, toggleWatchList
    }
}

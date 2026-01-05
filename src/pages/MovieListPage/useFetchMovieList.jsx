import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { mergeResult } from "../../utils/mergeResult"
import {
    searchMulti,
    discoverMulti,
    getTrending,
    getTopRated,
    getPopular,
} from "../../services/MovieListApi";

export const useFetchMovieList = ({ page, searchTerm, selectedGenre, selectedCountry, selectedType, selectedCategory, genres, countries }) => {
    const [listMovie, setListMovie] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCombined = async (signal) => {
        if (searchTerm) {
            const [movieRes, tvRes] = await searchMulti(searchTerm, page, { signal });
            return mergeResult(movieRes, tvRes);
        }

        if (selectedGenre || selectedCountry) {
            const [movieRes, tvRes] = await discoverMulti({
                genre: selectedGenre,
                country: selectedCountry,
                page,
            }, { signal });
            return mergeResult(movieRes, tvRes);
        }

        if (selectedCategory === "trending") {
            const [movieRes, tvRes] = await getTrending(page, { signal });
            return mergeResult(movieRes, tvRes);
        }

        if (selectedCategory === "top-rated") {
            const [movieRes, tvRes] = await getTopRated(page, { signal });
            return mergeResult(movieRes, tvRes);
        }

        const res = await getPopular(selectedType, page, { signal });
        return {
            results: res.data.results.map(i => ({ ...i, media_type: selectedType })),
            totalPages: res.data.total_pages || 1,
        };
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetchCombined(controller.signal);
                setListMovie(res.results);
                setTotalPages(res.totalPages);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err);
                setListMovie([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort()
    }, [searchTerm, selectedGenre, selectedCountry, selectedType, selectedCategory, page]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page, searchTerm, selectedGenre, selectedCountry, selectedType]);

    return {
        page, genres, countries, listMovie, totalPages, loading, error, selectedGenre, selectedCountry, selectedType, selectedCategory
    }
}

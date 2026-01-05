import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useMetadataContext } from "../../contexts/MetadataContext";

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { setSearchTerm, setSelectedGenre, setSelectedCountry, setSelectedType, setSelectedCategory } = useMetadataContext();

    useEffect(() => {
        const query = searchParams.get("keyword") || "";
        setSearchInput(query);
    }, [searchParams]);

    const handleSearch = useCallback(() => {
        const term = searchInput.trim();
        if (location.pathname !== "/") {
            navigate(`/?keyword=${encodeURIComponent(term)}`);
        } else {
            setSearchParams(term ? { keyword: term } : {});
        }
        [setSelectedGenre, setSelectedCountry, setSelectedType, setSelectedCategory].forEach(fn => fn(""));
        setSearchTerm(term);
    }, [searchInput, location.pathname, navigate, setSearchParams, setSearchTerm]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return { searchInput, setSearchInput, handleSearch, handleKeyDown };
};
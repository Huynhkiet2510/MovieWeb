import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMetadataContext } from "../../contexts/MetadataContext";

export const useFilter = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const metadata = useMetadataContext();

    const {
        setSelectedType,
        setSelectedGenre,
        setSelectedCountry,
        setSelectedCategory,
        setSearchTerm
    } = metadata;

    const resetFilters = useCallback((setter, value) => {
        const fieldMap = new Map([
            [setSelectedType, "type"],
            [setSelectedGenre, "genre"],
            [setSelectedCountry, "country"]
        ]);

        const paramKey = fieldMap.get(setter) || "";
        navigate(`/?${paramKey}=${value}`);

        setter(value);
        setSearchTerm("");

        if (setter !== setSelectedGenre) setSelectedGenre("");
        if (setter !== setSelectedCountry) setSelectedCountry("");
        if (setter !== setSelectedType) setSelectedType("");
        if (setter !== setSelectedCategory) setSelectedCategory("");
    }, [navigate, setSelectedType, setSelectedGenre, setSelectedCountry, setSelectedCategory, setSearchTerm]);

    return useMemo(() => ({
        openMenu,
        setOpenMenu,
        openMobileMenu,
        setOpenMobileMenu,
        resetFilters,
        navigate,
        metadata
    }), [openMenu, openMobileMenu, resetFilters, navigate, metadata.genres, metadata.countries]);
};
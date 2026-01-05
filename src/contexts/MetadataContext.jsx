import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { getGenreAndCountry } from "../services/GenreAndCountryApi";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("top-rated");
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const [genreRes, countryRes] = await getGenreAndCountry({
                    signal: controller.signal,
                });
                setGenres(genreRes.data.genres.slice(0, 10) || []);
                setCountries(countryRes.data.slice(0, 10) || []);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error(error);
            }
        };
        fetchData();
        return () => controller.abort();
    }, []);

    const value = {
        searchTerm, selectedGenre, selectedCategory, selectedCountry,
        selectedType, genres, countries,
        setSearchTerm, setSelectedGenre, setSelectedCountry,
        setSelectedType, setSelectedCategory
    };

    return (
        <MetadataContext.Provider value={value}>
            {children}
        </MetadataContext.Provider>
    );
};

/* eslint-disable react-refresh/only-export-components */
export const useMetadataContext = () => {
    const context = useContext(MetadataContext);
    if (context === undefined) {
        throw new Error("useMetadataContext must be used within a MetadataProvider");
    }
    return context;
};
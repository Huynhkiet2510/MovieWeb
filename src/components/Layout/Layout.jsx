import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      };

      try {
        const [genreRes, countryRes] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/genre/movie/list", {
            headers, signal: controller.signal
          }),

          axios.get("https://api.themoviedb.org/3/configuration/countries", {
            headers, signal: controller.signal
          })
        ]);

        setGenres(genreRes.data.genres || []);
        setCountries(countryRes.data || []);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        genres={genres}
        countries={countries}
      />

      <div className="flex-1 mb-10">
        <Outlet
          context={{
            searchTerm,
            selectedGenre, selectedCountry, selectedType, selectedCategory,
            genres,
            countries,
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

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

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genreRes, countryRes] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/genre/movie/list", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
          }),

          axios.get("https://api.themoviedb.org/3/configuration/countries", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
          })
        ]);

        setGenres(genreRes.data.genres || []);
        setCountries(countryRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        setSearchTerm={setSearchTerm}
        handleSearch={value => setSearchTerm(value)}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        genres={genres}
        countries={countries}
      />

      <div className="flex-1 mb-10">
        <Outlet
          context={{
            searchTerm,
            selectedGenre, selectedCountry, selectedType,
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

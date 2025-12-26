import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getGenreAndCountry } from "../../services/GenreAndCountryApi"
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

      try {

        const [genreRes, countryRes] = await getGenreAndCountry({
          signal: controller.signal,
        });

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

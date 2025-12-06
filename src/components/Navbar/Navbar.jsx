import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarUserMenu from "./NavbarUserMenu";
import { useMemo } from "react";
import axios from "axios";
import NavbarLinks from "./NavbarLinks";


const Navbar = ({ setSearchTerm, selectedGenre, setSelectedCategory, setSelectedGenre, selectedCountry, setSelectedCountry, setSelectedType, genres, countries }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();
  const controllerRef = useRef(null);
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    if (!session_id) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchUser = async () => {

      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE}/account?session_id=${session_id}`,
          {
            headers,
            signal: controller.signal,
          }
        );
        setUserInfo(res.data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    };

    fetchUser();
    return () => controller.abort();

  }, [session_id]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (location.pathname !== "/") navigate("/");
    setSearchTerm(searchInput); 
    setSelectedGenre("");
    setSelectedCountry("");
    setSelectedType("");
    setSelectedCategory("");
  };

  const resetFilters = (setter, value) => {
    if (location.pathname !== "/") {
      navigate("/");
    }

    setSearchTerm("");
    setSearchInput("");
    setter(value);
    if (setter !== setSelectedGenre) setSelectedGenre("");
    if (setter !== setSelectedCountry) setSelectedCountry("");
    if (setter !== setSelectedType) setSelectedType("");
    if (setter !== setSelectedCategory) setSelectedCategory("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
     handleSearch();
    }
  };

  const genreOptions = useMemo(() =>
    genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>),
    [genres]
  );

  const countryOptions = useMemo(() =>
    countries.map(c => (<option key={c.iso_3166_1} value={c.iso_3166_1}>{c.english_name}</option>)),
    [countries]
  );

  return (
    <nav className="flex justify-between items-center bg-[#1f202a] text-white sticky top-0 z-[1000] p-4">
      <div onClick={() => navigate("/")} className="font-bold text-3xl tracking-tight cursor-pointer">MovieApp</div>
      <div>
        <input
          type="text"
          placeholder="Nhập tên phim..."
          value={searchInput}
          onKeyDown={handleKeyDown}
          onChange={e => setSearchInput(e.target.value)}
          className="bg-[#545B68] rounded-tl-[5px] rounded-bl-[5px] px-[12px] py-[6px] text-white placeholder-white"
        />
        <button onClick={handleSearch} className="bg-red-600 rounded-tr-[5px] rounded-br-[5px] px-[12px] py-[6px] ml-2 hover:bg-red-800 cursor-pointer transition-colors duration-200 ease-out">Tìm kiếm</button>
      </div>

      <NavbarLinks
        resetFilters={resetFilters}
        setSelectedType={setSelectedType}
        setSelectedCategory={setSelectedCategory}
        selectedGenre={selectedGenre}
        genreOptions={genreOptions}
        setSelectedGenre={setSelectedGenre}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countryOptions={countryOptions}
      />

      <NavbarUserMenu
        userInfo={userInfo}
        menuRef={menuRef}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        setUserInfo={setUserInfo}
        navigate={navigate}
      />
    </nav>
  );
};

export default Navbar;

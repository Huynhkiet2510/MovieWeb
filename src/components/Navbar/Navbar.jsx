import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa"
import axios from "axios";


const Navbar = ({ setSearchTerm, handleSearch, selectedGenre, setSelectedGenre, selectedCountry, setSelectedCountry, setSelectedType, genres, countries}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/account?session_id=${session_id}`,
          { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, accept: "application/json" } }
        );
        setUserInfo(res.data);
      } catch (err) { console.error(err); }
    };
    fetchUser();
  }, []);


  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goHomeAndSet = (setter, value) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        setter(value);
        setSearchTerm("");
        if (setter !== setSelectedGenre) setSelectedGenre("");
        if (setter !== setSelectedCountry) setSelectedCountry("");
        if (setter !== setSelectedType) setSelectedType("");
      }, 100);
    } else {
      setter(value);
      setSearchTerm("");
      if (setter !== setSelectedGenre) setSelectedGenre("");
      if (setter !== setSelectedCountry) setSelectedCountry("");
      if (setter !== setSelectedType) setSelectedType("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }
  };


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
        <button onClick={() => handleSearch(searchInput)} className="bg-red-600 rounded-tr-[5px] rounded-br-[5px] px-[12px] py-[6px] ml-2 hover:bg-red-800 cursor-pointer transition-colors duration-200 ease-out">Tìm kiếm</button>

      </div>

      <div>
        <ul className="flex gap-4 items-center">
          <li
            onClick={() => goHomeAndSet(setSelectedType, "movie")}
            className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
          >
            Phim lẻ
          </li>
          <li
            onClick={() => goHomeAndSet(setSelectedType, "tv")}
            className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
          >
            Phim bộ
          </li>
          <li>
            <select
              value={selectedGenre}
              onChange={e => goHomeAndSet(setSelectedGenre, e.target.value)}
              className="bg-[#2B2D35] text-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Tất cả thể loại</option>
              {genres.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </li>

          <li>
            <select
              value={selectedCountry}
              onChange={e => goHomeAndSet(setSelectedCountry, e.target.value)}
              className="bg-[#2B2D35] text-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Quốc gia</option>
              {countries.map(c => (
                <option key={c.iso_3166_1} value={c.iso_3166_1}>
                  {c.english_name}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>


      <div>
        {!userInfo ? (
          <button className="bg-red-600 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-900 hover:text-white" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
        ) : (
          <div className="navbar__user" ref={menuRef}>
            <img
              src={
                userInfo.avatar?.tmdb?.avatar_path
                  ? `https://image.tmdb.org/t/p/w200${userInfo.avatar.tmdb.avatar_path}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              aria-label="User menu"
              aria-expanded={openMenu}
              onClick={() => setOpenMenu(!openMenu)}
              className=" h-[40px] w-[40px] rounded-full border border-red-600 cursor-pointer mr-2"
            />

            <div
              className={`
      absolute top-[60px] right-10 bg-[#2b2c38] rounded-lg shadow-lg w-40 overflow-hidden z-[1000]
      transition-all duration-300 ease-out transform origin-top-right
      ${openMenu ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
    `}
            >
              <p className="flex items-center font-bold px-3 py-2 border-b border-[#3a3b4d]">
                <FaUser className="text-red-500 mr-1" /><span>{userInfo.username}</span>
              </p>
              {[
                { label: "Yêu Thích", path: "/favorite" },
                { label: "Danh Sách", path: "/wishlist" },
                { label: "Tài Khoản", path: "/profile" },
              ].map((item) => (
                <div
                  key={item.path}

                  className="px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-[#ff3d3d] hover:text-white"
                  onClick={() => { navigate(item.path); setOpenMenu(false); }}

                >
                  {item.label}
                </div>
              ))}

              <div
                className="px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-[#ff3d3d] hover:text-white"
                onClick={() => {
                  localStorage.removeItem("session_id");
                  setUserInfo(null);
                  navigate("/");
                }}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;

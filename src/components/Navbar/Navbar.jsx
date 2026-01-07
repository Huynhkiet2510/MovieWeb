import { useMemo } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useFilter } from "./useFilter";
import { useClickOutside } from "./useClickOutside";
import { useSearch } from "./useSearch";
import { FaBars, FaTimes } from "react-icons/fa";
import NavbarUserMenu from "./NavbarUserMenu";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const { authLoading, user } = useSelector((state) => state.auth);

  const { searchInput, setSearchInput, handleSearch, handleKeyDown } = useSearch();

  const {
    resetFilters,
    openMenu,
    setOpenMenu,
    openMobileMenu,
    setOpenMobileMenu,
    navigate,
    metadata,
  } = useFilter();

  const navRef = useClickOutside(() => {
    setOpenMenu(false);
    setOpenMobileMenu(false);
  });

  const genreOptions = useMemo(
    () =>
      metadata.genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      )),
    [metadata.genres]
  );

  const countryOptions = useMemo(
    () =>
      metadata.countries.map((c) => (
        <option key={c.iso_3166_1} value={c.iso_3166_1}>
          {c.english_name}
        </option>
      )),
    [metadata.countries]
  );

  const linkProps = {
    genreOptions,
    countryOptions,
    selectedGenre: metadata.selectedGenre,
    selectedCountry: metadata.selectedCountry,
    setSelectedGenre: metadata.setSelectedGenre,
    setSelectedCountry: metadata.setSelectedCountry,
    setSelectedType: metadata.setSelectedType,
    setSelectedCategory: metadata.setSelectedCategory,
  };

  const handleLogoClick = () => {

    setOpenMenu(false);
    setOpenMobileMenu(false);

    metadata.setSelectedType("");
    metadata.setSelectedGenre("");
    metadata.setSelectedCountry("");
    metadata.setSelectedCategory("top-rated");
    metadata.setSearchTerm("");

    setSearchInput("");

    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav ref={navRef} className="bg-navbar sticky top-0 z-[1000] shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <div
          onClick={handleLogoClick}
          className="font-bold text-2xl md:text-3xl tracking-tighter cursor-pointer text-red-600 shrink-0 hover:opacity-80"
        >
          MovieZone
        </div>

        <div className="hidden sm:flex flex-1 max-w-[300px] lg:max-w-md items-center group">
          <input
            type="text"
            placeholder="Tìm phim..."
            value={searchInput}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-input-search text-text-muted placeholder-text-muted border border-transparent focus:border-red-600 rounded-l-md px-4 py-2 outline-none transition-all text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-text-muted ml-2 px-5 py-2 rounded-r-md hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Tìm
          </button>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden lg:block">
            <NavbarLinks resetFilters={resetFilters} {...linkProps} />
          </div>

          <button
            className={`lg:hidden text-lg p-2 rounded-md transition-all ${openMobileMenu ? "bg-red-600" : "hover:bg-nav-icon-hover"
              }`}
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            {openMobileMenu ? <FaTimes className="text-nav-icon"/> : <FaBars className="text-nav-icon"/>}
          </button>

          <NavbarUserMenu
            userInfo={user}
            menuRef={null}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            navigate={navigate}
            authLoading={authLoading}
            logout={logout}
          />

        </div>
      </div>

      <div className={`
        lg:hidden overflow-hidden transition-all duration-300 ease-in-out 
        ${openMobileMenu ? "max-h-[500px] border-t border-gray-700" : "max-h-0"}
      `}>
        <div className="p-5">
          <NavbarLinks
            {...linkProps}
            resetFilters={(setter, val) => {
              resetFilters(setter, val);
              setOpenMobileMenu(false);
            }}
          />
        </div>
      </div>

      <div className="sm:hidden px-4 pb-3">
        <div className="flex shadow-lg">
          <input
            type="text"
            className="w-full bg-input-search text-text-muted placeholder-text-muted rounded-l-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-600"
            placeholder="Nhập tên phim..."
            value={searchInput}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-text-muted px-4 rounded-r-md text-sm font-bold active:scale-95 transition-transform"
          >
            Tìm
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
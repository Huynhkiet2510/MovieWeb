const NavbarLinks = ({resetFilters, setSelectedType, setSelectedCategory, selectedGenre, genreOptions, setSelectedGenre, selectedCountry, setSelectedCountry, countryOptions}) => {
    return (
        <div>
            <ul className="flex gap-1 items-center">
                <li
                    onClick={() => resetFilters(setSelectedType, "movie")}
                    className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
                >
                    Phim lẻ
                </li>
                <li
                    onClick={() => resetFilters(setSelectedType, "tv")}
                    className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
                >
                    Phim bộ
                </li>
                <li
                    onClick={() => resetFilters(setSelectedCategory, "trending")}
                    className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
                >
                    Trending
                </li>
                <li
                    onClick={() => resetFilters(setSelectedCategory, "top-rated")}
                    className="px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-600 hover:text-white"
                >
                    Top Rated
                </li>
                <li>
                    <select
                        value={selectedGenre}
                        onChange={e => resetFilters(setSelectedGenre, e.target.value)}
                        className="bg-[#2B2D35] text-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="">Tất cả thể loại</option>
                        {genreOptions}
                    </select>
                </li>

                <li>
                    <select
                        value={selectedCountry}
                        onChange={e => resetFilters(setSelectedCountry, e.target.value)}
                        className="bg-[#2B2D35] text-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="">Quốc gia</option>
                        {countryOptions}
                    </select>
                </li>
            </ul>
        </div>
    )
}

export default NavbarLinks
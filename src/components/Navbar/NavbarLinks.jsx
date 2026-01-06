import { memo } from "react"

const NavbarLinks = ({ resetFilters, setSelectedType, setSelectedCategory, selectedGenre, genreOptions, setSelectedGenre, selectedCountry, setSelectedCountry, countryOptions }) => {
    return (
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-3 md:gap-6 w-full md:flex-1">
            <ul className="flex flex-wrap justify-center text-text-muted items-center gap-1 md:gap-2 text-sm font-medium">
                {[
                    { label: "Phim lẻ", action: () => resetFilters(setSelectedType, "movie") },
                    { label: "Phim bộ", action: () => resetFilters(setSelectedType, "tv") },
                    { label: "Trending", action: () => resetFilters(setSelectedCategory, "trending") },
                    { label: "Top Rated", action: () => resetFilters(setSelectedCategory, "top-rated") },
                ].map((item) => (
                    <li
                        key={item.label}
                        onClick={item.action}
                        className="px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-600/20 hover:text-red-500 transition-all border border-transparent hover:border-red-600/30 whitespace-nowrap"
                    >
                        {item.label}
                    </li>
                ))}
            </ul>

            <div className="flex justify-center gap-2 w-full md:w-auto mt-1 md:mt-0 items-center">
                <select
                    value={selectedGenre}
                    onChange={e => resetFilters(setSelectedGenre, e.target.value)}
                    className="bg-input-search w-[110px] text-text-muted md:w-32 lg:w-36 text-[12px] md:text-sm border border-gray-700 rounded-md px-2 py-1.5 outline-none focus:ring-1 focus:ring-red-600 cursor-pointer appearance-none text-left"
                >
                    <option value="">Thể loại</option>
                    {genreOptions}
                </select>

                <select
                    value={selectedCountry}
                    onChange={e => resetFilters(setSelectedCountry, e.target.value)}
                    className="bg-input-search w-[120px] text-text-muted md:w-32 lg:w-40 text-[12px] md:text-sm border border-gray-700 rounded-md px-2 py-1.5 outline-none focus:ring-1 focus:ring-red-600 cursor-pointer appearance-none text-left"
                >
                    <option value="">Quốc gia</option>
                    {countryOptions}
                </select>
            </div>
        </div>
    )
}

export default memo(NavbarLinks);
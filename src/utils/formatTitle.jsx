export const formatTitle = ({
    searchTerm,
    genreName,
    countryName,
    selectedType,
    selectedCategory
}) => {
    if (searchTerm) return `Kết quả tìm kiếm: "${searchTerm}"`;
    else if (genreName && countryName) return `Phim ${genreName} - ${countryName}`;
    else if (genreName) return `Phim ${genreName}`;
    else if (countryName) return `Phim ${countryName}`;
    else if (selectedType === "tv") return "Phim bộ";
    else if (selectedType === "movie") return "Phim lẻ";
    else if (selectedCategory === "trending") return "Phim xu hướng";
    else if (selectedCategory === "top-rated") return "Phim nổi bật";

    return ""
};

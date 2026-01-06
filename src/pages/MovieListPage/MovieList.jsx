import Pagination from "../../components/Pagination/Pagination";
import CartItem from "../../components/CartItem/CartItem";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";
import { formatTitle } from "../../utils/formatTitle";
import { useFetchMovieList } from "./useFetchMovieList";
import { useSearchParams } from 'react-router-dom';
import { useMetadataContext } from "../../contexts/MetadataContext";
import { memo } from "react";

const MovieList = () => {
  const { genres, countries, selectedGenre, selectedCountry, selectedType, selectedCategory, searchTerm } = useMetadataContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { listMovie, totalPages, loading, error } = useFetchMovieList({
    searchTerm,
    selectedGenre,
    selectedCountry,
    selectedType,
    selectedCategory,
    page
  });

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries([...searchParams]);
    if (newPage === 1) {
      delete params.page;
    } else {
      params.page = newPage;
    }
    setSearchParams(params);
  };

  const genreName = genres.find(g => g.id == selectedGenre)?.name;
  const countryName = countries.find(c => c.iso_3166_1 === selectedCountry)?.english_name;

  const title = formatTitle({
    searchTerm,
    genreName,
    countryName,
    selectedType,
    selectedCategory
  });

  return (
    <div className="text-center min-h-screen w-full px-5 bg-page-bg text-text-main transition-colors duration-300">
      <h2 className="font-bold text-xl md:text-3xl tracking-tight pt-8 text-text-main">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 py-6">
        {loading ? (
          Array(16).fill(0).map((_, i) => <MovieSkeleton key={i} />)
        ) : error ? (
          <p className="col-span-full text-red-500 text-center font-medium">
            Không thể tải dữ liệu. Vui lòng thử lại!
          </p>
        ) : listMovie.length === 0 ? (
          <p className="col-span-full bg-card-bg border border-border max-w-sm text-center p-10 mt-8 mx-auto rounded-2xl text-sm text-text-muted transition-colors">
            Không có phim nào
          </p>
        ) : (
          listMovie.map(item => (
            <CartItem key={`${item.media_type}-${item.id}`} item={item} />
          ))
        )}
      </div>

      <div className="mt-2 pb-10 min-h-[30px]">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(MovieList);

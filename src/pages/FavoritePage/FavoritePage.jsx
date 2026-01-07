import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";
import { useFetchFavorite } from "./useFetchFavorite";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const FavoritePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { favoriteList, loading, error, totalPages } = useFetchFavorite(page);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-page-bg text-text-main transition-colors duration-300">
      <SideBar />
      <section className="flex-1 flex flex-col">
        <div className="p-4 lg:p-8">
          <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-center lg:text-left">
            Danh sách yêu thích
          </h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array(12).fill(0).map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
                Không thể tải dữ liệu. Vui lòng thử lại!
              </p>
            </div>
          ) : favoriteList.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="bg-[#25272F] w-full max-w-2xl text-center p-10 rounded-2xl text-sm text-gray-400">
                Bạn không có phim yêu thích.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {favoriteList.map(item => (
                <CartItem
                  key={`${item.media_type}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        <nav className="mt-2 pb-10 min-h-[30px]">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </nav>
      </section>
    </div>
  );
};

export default FavoritePage;
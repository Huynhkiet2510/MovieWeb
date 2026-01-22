import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";
import { useFetchWishList } from "./useFetchWishList"
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import ErrorState from "../../components/ErrorState/ErrorState"

const WishListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { wishList, loading, error, totalPages } = useFetchWishList(page);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage })
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <ErrorState
        title="Không thể tải được danh sách phim mong muốn =((("
        message="Tôi vừa chia tay bạn gái xong thì bạn đừng mong đc xem phim đâu!!!!"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-page-bg text-text-main transition-colors duration-300">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-center lg:text-left">Danh sách mong muốn</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <MovieSkeleton key={i} />
                ))}
            </div>
          ) : wishList.length === 0 ? (
            <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">
              Bạn không có phim nào trong danh sách.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {wishList.map(item => (
                <CartItem key={`${item.media_type}-${item.id}`} item={item} />
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
      </div>
    </div>
  );
};

export default WishListPage;

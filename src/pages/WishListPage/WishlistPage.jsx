import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";
import axios from "axios";

const WishListPage = () => {
  const [wishList, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(state => state.auth.user);
  const session_id = useSelector(state => state.auth.session_id);

  useEffect(() => {
    if (!user?.id || !session_id) return;

    const controller = new AbortController();

    const fetchWishList = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const [movieRes, tvRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/movies?session_id=${session_id}`,
            { signal: controller.signal, headers }
          ),
          axios.get(
            `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/tv?session_id=${session_id}`,
            { signal: controller.signal, headers }
          ),
        ]);

        const merged = [
          ...movieRes.data.results.map(item => ({
            ...item,
            media_type: "movie",
            display_title: item.title,
          })),
          ...tvRes.data.results.map(item => ({
            ...item,
            media_type: "tv",
            display_title: item.name,
          })),
        ];

        setWishlist(merged);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
    return () => controller.abort();
  }, [user?.id, session_id]);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <h2 className="font-bold text-3xl mb-6">Danh sách mong muốn</h2>
        {loading ? (
          <div className="grid grid-cols-6 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">
            Không thể tải dữ liệu. Vui lòng thử lại!
          </p>
        ) : wishList.length === 0 ? (
          <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">
            Bạn không có phim nào trong danh sách.
          </p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {wishList.map(item => (
              <CartItem key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;

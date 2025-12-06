import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
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
          ...movieRes.data.results.map((item) => ({
            ...item,
            media_type: "movie",
            display_title: item.title,
          })),
          ...tvRes.data.results.map((item) => ({
            ...item,
            media_type: "tv",
            display_title: item.name,
          })),
        ];

        setWishlist(merged);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Lỗi lấy watchlist", error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();

    return () => controller.abort();

  }, [session_id, user?.id]);

  if (loading) return <div className="text-gray-400 p-10 text-center">Đang tải phim...</div>
  if (error) return <div className="text-red-500 p-10 text-center">Không thể tải dữ liệu. Vui lòng thử lại!</div>

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-full p-4">
        <h2 className="font-bold text-3xl mt-3 mb-5">Danh sách mong muốn</h2>

        {wishList.length === 0 ? (
          <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">
            Bạn không có phim nào trong danh sách.
          </p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {wishList.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;

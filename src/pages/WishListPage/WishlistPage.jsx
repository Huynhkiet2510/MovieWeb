import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";

const WishlistPage = () => {
  const [wishList, setWishList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("tmdb_user"));
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const controller = new AbortController();
    const fetchWishList = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const [movieRes, tvRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/movies?session_id=${session_id}`, {
            signal: controller.signal,
            headers
          }),
          axios.get(
            `${import.meta.env.VITE_BASE}/account/${user.id}/watchlist/tv?session_id=${session_id}`, {
            signal: controller.signal,
            headers
          }),]);

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

        setWishList(merged);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Lỗi lấy danh sách yêu thích", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
    return () => controller.abort();

  }, [session_id, user.id]);


  if (loading) return <div>Loading ...</div>
  if (error) return <div className="text-red-500">Lỗi khi tải danh sách yêu thích!</div>

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

export default WishlistPage;

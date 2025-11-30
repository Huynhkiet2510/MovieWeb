import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("tmdb_user"));
  const session_id = localStorage.getItem("session_id");


  useEffect(() => {
    const controller = new AbortController();
    const fetchFavoriteList = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const [movieRes, tvRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/account/${user.id}/favorite/movies?session_id=${session_id}`, {
            signal: controller.signal,
            headers
          }),
          axios.get(`https://api.themoviedb.org/3/account/${user.id}/favorite/tv?session_id=${session_id}`, {
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

        setFavoriteList(merged);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Lỗi lấy danh sách yêu thích:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteList();
    return () => controller.abort();

  }, []);

  if (loading) return <div>Loading ...</div>
  if (error) return <div className="text-red-500">Lỗi khi tải danh sách yêu thích!</div>

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-full p-4">
        <h2 className="font-bold text-3xl mt-3 mb-5">Danh sách yêu thích</h2>
        {favoriteList.length === 0 ? (
          <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">Bạn Không có phim yêu thích.</p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {favoriteList.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;

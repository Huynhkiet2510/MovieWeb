import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaPlus, FaUser, FaBell, FaFilm, FaTv } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishList, setWishList] = useState([]);

  const user = JSON.parse(localStorage.getItem("tmdb_user"));
  const session_id = localStorage.getItem("session_id");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        };

        const [movieRes, tvRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/account/${user.id}/watchlist/movies?session_id=${session_id}`,
            { headers }
          ),
          axios.get(
            `https://api.themoviedb.org/3/account/${user.id}/watchlist/tv?session_id=${session_id}`,
            { headers }
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

        setWishList(merged);
      } catch (error) {
        console.error("Lỗi lấy danh sách watchlist:", error);
      }
    };

    fetchWishList();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      <aside className="bg-[#25272F] w-[350px] h-[705px] p-10 m-5 rounded-2xl">
        <h2 className="font-bold text-lg mb-8">Quản Lý Tài Khoản</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 
              ${isActive("/favorite") ? "text-red-600 font-semibold" : "hover:text-red-600"}`}
              onClick={() => navigate("/favorite")}
            >
              <FaHeart />
              <span>Yêu thích</span>
            </button>
          </li>
          <hr className="text-gray-500" />
          <li>
            <button
              className={`flex items-center gap-2 cursor-pointer transition-colors duration-200
              ${isActive("/wishlist") ? "text-red-600 font-semibold" : "hover:text-red-600"}`}
              onClick={() => navigate("/wishlist")}
            >
              <FaPlus />
              <span>Danh sách</span>
            </button>
          </li>
          <hr className="text-gray-500" />
          <li>
            <button
              className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 
              ${isActive("/profile") ? "text-red-600 font-semibold" : "hover:text-red-600"}`}
              onClick={() => navigate("/profile")}
            >
              <FaUser />
              <span>Tài khoản</span>
            </button>
          </li>
          <hr className="text-gray-500" />
          <li>
            <button className="flex items-center gap-2 cursor-pointer hover:text-red-600" disabled>
              <FaBell /> Thông báo
            </button>
          </li>
          <hr className="text-gray-500" />
          
        </ul>

      </aside>

      <div className="w-full p-4">
        <h2 className="font-bold text-3xl mt-3 mb-5">Danh sách mong muốn</h2>

        {wishList.length === 0 ? (
          <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">
            Bạn không có phim nào trong danh sách.
          </p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {wishList.map((item) => (
              <div
                onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                className="bg-[#2B2C38] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
                key={item.media_type + item.id}
              >
                <div className="rounded-2xl">
                  <img
                    className="h-70"
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.display_title}
                  />

                  <h3 className="flex items-center truncate w-full p-2">
                    <span className="mr-2">
                      {item.media_type === "movie" ? (
                        <FaFilm className="text-yellow-300" />
                      ) : (
                        <FaTv className="text-blue-400" />
                      )}
                    </span>

                    {item.display_title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

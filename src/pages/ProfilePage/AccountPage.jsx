import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaPlus, FaUser, FaBell } from "react-icons/fa";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem("tmdb_user");
    if (data) setUser(JSON.parse(data));
  }, []);

  const isActive = (path) => location.pathname === path;

  if (!user) return <p className="text-center mt-10">Đang tải...</p>;

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


      <main className="w-full p-4">
        {/* Title */}
        <h2 className="font-bold text-3xl mt-3 mb-5">Tài khoản</h2>
        <p className="text-gray-400 mb-10">Cập nhật thông tin tài khoản</p>

        <div className="flex justify-between items-start gap-10">
          <div className="flex-1 space-y-6">
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="username">Email</label>
              <input
                id="username"
                type="text"
                value={user.username}
                readOnly
                className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="displayName">Tên hiển thị</label>
              <input
                id="displayName"
                type="text"
                value={user.name || ""}
                className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="country">Quốc gia</label>
              <input
                id="country"
                type="text"
                value={user.iso_3166_1 || ""}
                className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-3 text-gray-300">Giới tính</label>

              <div className="flex items-center gap-6 text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" defaultChecked />
                  Nam
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" />
                  Nữ
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" />
                  Không xác định
                </label>
              </div>
            </div>
            <button className="bg-yellow-400 px-6 py-3 rounded-xl text-black font-semibold hover:bg-yellow-500 cursor-pointer mt-4">
              Cập nhật
            </button>

            <p className="mt-3 text-gray-400">
              Đặt mật khẩu, nhấn vào
              <span className="text-yellow-500 cursor-pointer ml-1">đây</span>
            </p>
          </div>
          <div className="flex flex-col items-center mr-20">
            <img
              src={`https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`}
              alt="avatar"
              className="rounded-full h-44 w-44 border-2 border-gray-600 shadow-lg"
            />

            <p className="text-gray-300 mt-3 flex items-center gap-1">
              <span className="text-lg">📁</span> Ảnh có sẵn
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;

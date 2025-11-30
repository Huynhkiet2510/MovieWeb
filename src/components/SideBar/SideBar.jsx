import React from 'react'
import { FaHeart, FaPlus, FaUser, FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
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
    )
}

export default SideBar
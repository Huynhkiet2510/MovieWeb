import React from 'react';
import { FaHeart, FaPlus, FaUser, FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: "/favorite", icon: <FaHeart />, label: "Yêu thích" },
        { path: "/wishlist", icon: <FaPlus />, label: "Danh sách" },
        { path: "/profile", icon: <FaUser />, label: "Tài khoản" },
        { path: "/notification", icon: <FaBell />, label: "Thông báo" },
    ];

    return (
        // Mobile: h-auto, w-full | Desktop: lg:w-[300px], lg:min-h-screen
        <aside className="bg-[#25272F] w-full lg:w-[300px] p-6 lg:p-10 lg:m-5 rounded-none lg:rounded-2xl transition-all duration-300">
            <h2 className="font-bold text-lg mb-6 hidden lg:block text-white">Quản Lý Tài Khoản</h2>
            
            {/* Mobile: dùng flex-row để nằm ngang | Desktop: dùng flex-col để nằm dọc */}
            <ul className="flex flex-row lg:flex-col justify-around lg:justify-start gap-4 lg:space-y-4">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.path}>
                        <li className="flex-1 lg:flex-none">
                            <button
                                className={`flex flex-col lg:flex-row items-center gap-2 w-full cursor-pointer transition-all duration-200 text-sm lg:text-base
                                    ${isActive(item.path) ? "text-red-600 font-semibold" : "text-gray-400 hover:text-red-500"}`}
                                onClick={() => navigate(item.path)}
                            >
                                <span className="text-xl lg:text-base">{item.icon}</span>
                                <span className="text-[10px] lg:text-base uppercase lg:capitalize tracking-wider lg:tracking-normal">
                                    {item.label}
                                </span>
                            </button>
                        </li>
                        {/* Chỉ hiện gạch ngang trên màn hình lớn */}
                        {index < menuItems.length - 1 && (
                            <hr className="hidden lg:block border-gray-700" />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;
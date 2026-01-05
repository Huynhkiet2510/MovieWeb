import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";

const NavbarUserMenu = ({ userInfo, menuRef, openMenu, setOpenMenu, navigate, logout }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setOpenMenu(false);
        navigate("/");
    };

    return (
        <div className="w-auto lg:w-28 flex justify-end items-center shrink-0">
            {!userInfo ? (
                <button
                    className="bg-red-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-all whitespace-nowrap"
                    onClick={() => navigate("/login")}
                >
                    Đăng nhập
                </button>
            ) : (
                <div className="relative" ref={menuRef}>
                    <img
                        src={userInfo.avatar?.tmdb?.avatar_path
                            ? `https://image.tmdb.org/t/p/w200${userInfo.avatar.tmdb.avatar_path}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        onClick={() => setOpenMenu(!openMenu)}
                        className="h-9 w-9 rounded-full border-2 border-red-600 cursor-pointer object-cover hover:scale-105 transition-transform"
                    />

                    <div className={`
                        absolute top-full right-0 mt-3 bg-[#2b2c38] rounded-xl shadow-2xl w-48 overflow-hidden z-[1001]
                        transition-all duration-300 origin-top-right border border-gray-700
                        ${openMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}>
                        <div className="px-4 py-3 bg-[#3a3b4d] flex items-center gap-2">
                            <FaUser className="text-red-500 shrink-0" />
                            <span className="font-bold truncate text-sm">{userInfo.username}</span>
                        </div>

                        <div className="py-1">
                            {[
                                { label: "Yêu Thích", path: "/favorite" },
                                { label: "Danh Sách", path: "/wishlist" },
                                { label: "Tài Khoản", path: "/profile" },
                            ].map((item) => (
                                <div
                                    key={item.path}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-red-600 hover:text-white transition-colors text-left"
                                    onClick={() => { navigate(item.path); setOpenMenu(false); }}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>

                        <div
                            className="px-4 py-3 text-sm font-bold text-red-400 cursor-pointer hover:bg-red-600 hover:text-white border-t border-gray-700 transition-colors text-left"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavbarUserMenu;
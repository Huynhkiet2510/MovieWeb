import { FaUser } from "react-icons/fa"

const NavbarUserMenu = ({userInfo, menuRef, openMenu, setOpenMenu, setUserInfo, navigate}) => {
    return (
        <div>
            {!userInfo ? (
                <button className="bg-red-600 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-900 hover:text-white" onClick={() => navigate("/login")}>
                    Đăng nhập
                </button>
            ) : (
                <div className="navbar__user" ref={menuRef}>
                    <img
                        src={
                            userInfo.avatar?.tmdb?.avatar_path
                                ? `https://image.tmdb.org/t/p/w200${userInfo.avatar.tmdb.avatar_path}`
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        aria-label="User menu"
                        aria-expanded={openMenu}
                        onClick={() => setOpenMenu(!openMenu)}
                        className=" h-[40px] w-[40px] rounded-full border border-red-600 cursor-pointer mr-2"
                    />

                    <div
                        className={`
         absolute top-[60px] right-10 bg-[#2b2c38] rounded-lg shadow-lg w-40 overflow-hidden z-[1000]
         transition-all duration-300 ease-out transform origin-top-right
         ${openMenu ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
       `}
                    >
                        <p className="flex items-center font-bold px-3 py-2 border-b border-[#3a3b4d]">
                            <FaUser className="text-red-500 mr-1" /><span>{userInfo.username}</span>
                        </p>
                        {[
                            { label: "Yêu Thích", path: "/favorite" },
                            { label: "Danh Sách", path: "/wishlist" },
                            { label: "Tài Khoản", path: "/profile" },
                        ].map((item) => (
                            <div
                                key={item.path}

                                className="px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-[#ff3d3d] hover:text-white"
                                onClick={() => { navigate(item.path); setOpenMenu(false); }}

                            >
                                {item.label}
                            </div>
                        ))}

                        <div
                            className="px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-[#ff3d3d] hover:text-white"
                            onClick={() => {
                                localStorage.removeItem("session_id");
                                setUserInfo(null);
                                navigate("/");
                            }}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavbarUserMenu
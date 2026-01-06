import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { FaFolder } from "react-icons/fa";
import { toggleTheme } from "../../store/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";

const AccountPage = () => {
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  
  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-page-bg text-text-main">
        <p className="animate-pulse">Đang tải thông tin...</p>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-page-bg text-text-main transition-colors duration-300">
      <SideBar />
      <main className="flex-1 p-4 lg:p-10">
        <div className="text-center lg:text-left mb-8">
          <h2 className="font-bold text-3xl lg:text-4xl mb-2">Tài khoản</h2>
          <p className="text-text-muted">Cập nhật thông tin tài khoản của bạn</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-10">
          <div className="w-full lg:flex-1 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-text-muted" htmlFor="username">
                  Email / Tên đăng nhập
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  readOnly
                  className="bg-card-bg border border-border p-3 rounded-xl w-full text-text-muted cursor-not-allowed focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-text-muted" htmlFor="displayName">
                  Tên hiển thị
                </label>
                <input
                  id="displayName"
                  type="text"
                  defaultValue={user.name}
                  readOnly
                  className="bg-card-bg border border-border p-3 rounded-xl w-full text-text-muted cursor-not-allowed focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-text-muted" htmlFor="country">
                  Quốc gia
                </label>
                <input
                  id="country"
                  type="text"
                  defaultValue={user.iso_3166_1}
                  readOnly
                  className="bg-card-bg border border-border p-3 rounded-xl w-full text-text-muted cursor-not-allowed focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 text-sm text-text-muted">Giới tính</label>
              <div className="flex flex-wrap items-center gap-6 text-text-muted bg-card-bg p-4 rounded-xl border border-border transition-colors">
                <label className="flex items-center gap-2 cursor-pointer hover:text-text-main transition-colors">
                  <input type="radio" name="gender" className="accent-red-500 w-4 h-4" defaultChecked />
                  Nam
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-text-main transition-colors">
                  <input type="radio" name="gender" className="accent-red-500 w-4 h-4" />
                  Nữ
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-text-main transition-colors">
                  <input type="radio" name="gender" className="accent-red-500 w-4 h-4" />
                  Khác
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card-bg p-4 rounded-xl border border-border shadow-sm transition-all duration-500">
              <span className="text-text-main font-semibold text-sm uppercase tracking-wider">
                Chế độ
              </span>

              <button
                onClick={() => dispatch(toggleTheme())}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 focus:outline-none shadow-inner ${mode === 'light' ? 'bg-gray-300' : 'bg-red-600/80'
                  }`}
              >
                <div
                  className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 transform ${mode === 'light' ? 'translate-x-1' : 'translate-x-9'
                    }`}
                >
                  {mode === 'light' ? (
                    <FaSun className="text-yellow-500 text-xs" />
                  ) : (
                    <FaMoon className="text-red-600 text-xs" />
                  )}
                </div>

                <div className="flex w-full justify-between px-2 text-[10px]">
                  <FaMoon className={`${mode === 'light' ? 'text-gray-400' : 'opacity-0'} transition-opacity`} />
                  <FaSun className={`${mode === 'dark' ? 'text-white/50' : 'opacity-0'} transition-opacity`} />
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-border transition-colors">
              <button className="w-full lg:w-auto bg-red-600 px-10 py-3 rounded-xl text-text-main font-bold hover:bg-red-700 transition-all shadow-lg cursor-pointer active:scale-95">
                Cập nhật thông tin
              </button>
              <p className="mt-6 text-sm text-text-muted text-center lg:text-left">
                Bạn muốn đổi mật khẩu? nhấn vào
                <span className="text-red-500 hover:underline cursor-pointer ml-1 font-medium">đây</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:mr-10 xl:mr-20">
            <div className="relative group">
              <img
                src={user.avatar?.tmdb?.avatar_path
                  ? `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`
                  : "https://via.placeholder.com/200"}
                alt="avatar"
                className="rounded-full h-40 w-40 lg:h-52 lg:w-52 border-4 border-border shadow-2xl object-cover group-hover:border-yellow-500 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-bold">Thay đổi ảnh</span>
              </div>
            </div>

            <button className="text-text-muted mt-4 flex items-center gap-2 hover:text-yellow-500 transition-colors text-sm cursor-pointer">
              <FaFolder className="text-yellow-500 text-lg" /> Thư viện ảnh có sẵn
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AccountPage;
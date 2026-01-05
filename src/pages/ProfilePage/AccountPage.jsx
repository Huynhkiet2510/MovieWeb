import SideBar from "../../components/SideBar/SideBar";
import { useSelector } from "react-redux";
import { FaFolder } from "react-icons/fa";

const AccountPage = () => {
  const user = useSelector(state => state.auth.user)

  if (!user) return (
    <div className="flex justify-center items-center min-h-screen bg-[#14161B] text-white">
      <p className="animate-pulse">Đang tải thông tin...</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#14161B] text-white">
      <SideBar />
      <main className="flex-1 p-4 lg:p-10">
        <div className="text-center lg:text-left mb-8">
          <h2 className="font-bold text-3xl lg:text-4xl mb-2">Tài khoản</h2>
          <p className="text-gray-400">Cập nhật thông tin tài khoản của bạn</p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-10">
          <div className="w-full lg:flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-400" htmlFor="username">Email / Tên đăng nhập</label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  readOnly
                  className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400" htmlFor="displayName">Tên hiển thị</label>
                <input
                  id="displayName"
                  type="text"
                  defaultValue={user.name}
                  readOnly
                  className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400" htmlFor="country">Quốc gia</label>
                <input
                  id="country"
                  type="text"
                  defaultValue={user.iso_3166_1}
                  readOnly
                  className="bg-[#1F2028] border border-[#2E3039] p-3 rounded-xl w-full text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-400">Giới tính</label>
              <div className="flex flex-wrap items-center gap-6 text-gray-300 bg-[#1F2028] p-4 rounded-xl border border-[#2E3039]">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input type="radio" name="gender" className="accent-yellow-500 w-4 h-4" defaultChecked />
                  Nam
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input type="radio" name="gender" className="accent-yellow-500 w-4 h-4" />
                  Nữ
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input type="radio" name="gender" className="accent-yellow-500 w-4 h-4" />
                  Khác
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <button className="w-full lg:w-auto bg-yellow-400 px-10 py-3 rounded-xl text-black font-bold hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/10 cursor-pointer active:scale-95">
                Cập nhật thông tin
              </button>
              <p className="mt-6 text-sm text-gray-500 text-center lg:text-left">
                Bạn muốn đổi mật khẩu? nhấn vào
                <span className="text-yellow-500 hover:underline cursor-pointer ml-1 font-medium">đây</span>
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
                className="rounded-full h-40 w-40 lg:h-52 lg:w-52 border-4 border-[#2E3039] shadow-2xl object-cover group-hover:border-yellow-500 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs font-bold">Thay đổi ảnh</span>
              </div>
            </div>

            <button className="text-gray-400 mt-4 flex items-center gap-2 hover:text-amber-400 transition-colors text-sm cursor-pointer">
              <span className="text-lg"> <FaFolder className="text-amber-400" /> </span> Thư viện ảnh có sẵn
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AccountPage;
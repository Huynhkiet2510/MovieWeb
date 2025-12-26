import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import SideBar from "../../components/SideBar/SideBar";
import getFavoriteMulti from "../../services/FavoriteApi"
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(state => state.auth.user);
  const session_id = useSelector(state => state.auth.session_id);

  useEffect(() => {
    if (!user?.id || !session_id) return;

    const controller = new AbortController();

    const fetchFavoriteList = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieRes, tvRes] = await getFavoriteMulti(
          user.id,
          session_id,
          { signal: controller.signal }
        )

        const merged = [
          ...movieRes.data.results.map(item => ({
            ...item,
            media_type: "movie",
            display_title: item.title,
          })),
          ...tvRes.data.results.map(item => ({
            ...item,
            media_type: "tv",
            display_title: item.name,
          })),
        ];

        setFavoriteList(merged);
      } catch (err) {
        if (err.name === "CanceledError" || axios.isCancel(err)) return;
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteList();
    return () => controller.abort();

  }, [user?.id, session_id]);

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 p-6">
        <h2 className="font-bold text-3xl mb-6">Danh sách yêu thích</h2>
        {loading ? (
          <div className="grid grid-cols-6 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">
            Không thể tải dữ liệu. Vui lòng thử lại!
          </p>
        ) : favoriteList.length === 0 ? (
          <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">
            Bạn không có phim yêu thích.
          </p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {favoriteList.map(item => (
              <CartItem
                key={`${item.media_type}-${item.id}`}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;

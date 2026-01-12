import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { postFavorite, postWatchList } from "../../services/MovieDetailApi";

export const useMovieActions = ({ media, id }) => {
  const favControllerRef = useRef(null);
  const watchControllerRef = useRef(null);

  const user = useSelector(state => state.auth.user);
  const session_id = useSelector(state => state.auth.session_id);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);

  const toggleFavorite = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Yêu thích");
      return;
    }

    favControllerRef.current?.abort();
    const controller = new AbortController();
    favControllerRef.current = controller;

    try {

      await postFavorite(user.id, media, id, isFavorite, session_id, session_id,
        {
          signal: controller.signal
        });

      setIsFavorite(prev => !prev);
      toast.success(!isFavorite ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích");
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.error("Lỗi favorite:", error);
      toast.error("Thêm phim vào danh sách yêu thích thất bại");
    } finally {
      if (favControllerRef.current === controller) favControllerRef.current = null;
    }
  };

  const toggleWatchList = async () => {
    if (!user || !session_id) {
      toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Danh sách");
      return;
    }

    watchControllerRef.current?.abort();
    const controller = new AbortController();
    watchControllerRef.current = controller;

    try {
      await postWatchList(user.id, media, id, isWatchList, session_id,
        {
          signal: controller.signal
        }
      )

      setIsWatchList(prev => !prev);
      toast.success(!isWatchList ? "Đã thêm vào danh sách xem sau" : "Đã xóa khỏi danh sách xem sau");
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.error("Lỗi watchlist:", error);
      toast.error("Thêm phim vào danh sách mong muốn thất bại");
    } finally {
      if (watchControllerRef.current === controller) watchControllerRef.current = null;
    }
  };

  const cleanup = () => {
    favControllerRef.current?.abort();
    watchControllerRef.current?.abort();
  };

  return {
    isFavorite,
    isWatchList,
    toggleFavorite,
    toggleWatchList,
    cleanup,
    setIsFavorite,
    setIsWatchList,
  };
};

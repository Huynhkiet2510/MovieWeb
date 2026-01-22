import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AccountLayout from "./components/Layout/AccountLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieListPage from "./pages/MovieListPage/MovieList";
import MovieDetail from "./pages/MovieDetailPage/MovieDetail";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/AccountPage";
import WishListPage from "./pages/WishListPage/WishListPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import WatchTrailerPage from "./pages/WatchTrailerPage/WatchTrailerPage";
import RequireAuth from "./routes/RequireAuth";
import RequireGuest from "./routes/RequireGuest";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);


  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        position={window.innerWidth < 768 ? "top-center" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          width: window.innerWidth < 768 ? '80%' : '350px',
          top: window.innerWidth < 768 ? '20px' : '40px',
          right: window.innerWidth < 768 ? 'auto' : '20px'
        }}
      />
      <Routes>
        <Route path="/login" element={
          <RequireGuest>
            <LoginPage />
          </RequireGuest>} />
        <Route path="/auth" element={
          <RequireGuest>
            <AuthPage />
          </RequireGuest>} />

        <Route element={<Layout />} >
          <Route path="/" element={<MovieListPage />} />

          <Route element={<RequireAuth><AccountLayout /></RequireAuth>}>
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/:media/:id" element={<MovieDetail />} />
          <Route path="/watch/:media/:id" element={<WatchTrailerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

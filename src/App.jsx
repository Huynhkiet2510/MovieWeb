import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieListPage from "./pages/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/AccountPage";
import WishListPage from "./pages/WishListPage/WishListPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import WatchTrailerPage from "./pages/WatchTrailerPage/WatchTrailerPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import RequireAuth from "./routes/RequireAuth";
import RequireGuest from "./routes/RequireGuest";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        style={{ top: '50px', right: '20px' }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={
          <RequireGuest>
            <LoginPage />
          </RequireGuest>} />

        <Route element={<Layout />} >
          <Route path="/" element={<MovieListPage />} />
          <Route path="/favorite" element={
            <RequireAuth>
              <FavoritePage />
            </RequireAuth>} />
          <Route path="/wishlist" element={
            <RequireAuth>
              <WishListPage />
            </RequireAuth>} />
          <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>} />
          <Route path="/:media/:id" element={<MovieDetail />} />
          <Route path="/watch/:media/:id" element={<WatchTrailerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

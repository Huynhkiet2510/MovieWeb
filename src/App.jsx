import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MovieListPage from "./pages/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/AccountPage";
import WishlistPage from "./pages/WishListPage/WishlistPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import WatchTrailerPage from "./pages/WatchTrailerPage/WatchTrailerPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<Layout />} >
          <Route path="/" element={<MovieListPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/:media/:id" element={<MovieDetail />} />
          <Route path="/watch/:media/:id" element={<WatchTrailerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

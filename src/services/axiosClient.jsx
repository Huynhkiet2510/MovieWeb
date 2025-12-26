import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
});

export default axiosClient;

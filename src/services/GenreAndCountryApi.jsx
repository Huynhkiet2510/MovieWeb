import api from "./axiosClient";

export const getGenreAndCountry = (config = {}) => {
  return Promise.all([
    api.get("genre/movie/list", config),
    api.get("configuration/countries", config),
  ]);
};

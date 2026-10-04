import api from "./axiosClient";

const getWishlistMulti = (userId, sessionId, config = {}) => {
  return Promise.all([
    api.get(`/account/${userId}/watchlist/movies`, {
      ...config,
      params: { sessionId }
    }),
    api.get(`/account/${userId}/watchlist/tv`, {
      ...config,
      params: { sessionId }
    }),
  ]);
};

export default getWishlistMulti;

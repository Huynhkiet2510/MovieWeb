import api from "./axiosClient";

const getWishlistMulti = (userId, sessionId, config  = {}) => {
  return Promise.all([
    api.get(`/account/${userId}/watchlist/movies`, {
      params: { sessionId },
      ...config ,
    }),
    api.get(`/account/${userId}/watchlist/tv`, {
      params: { sessionId },
      ...config ,
    }),
  ]);
};

export default getWishlistMulti;

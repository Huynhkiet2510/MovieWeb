import api from "./axiosClient";

const getWishlistMulti = (userId, sessionId, config  = {}) => {
  return Promise.all([
    api.get(`/account/${userId}/watchlist/movies`, {
      params: { session_id: sessionId },
      ...config ,
    }),
    api.get(`/account/${userId}/watchlist/tv`, {
      params: { session_id: sessionId },
      ...config ,
    }),
  ]);
};

export default getWishlistMulti;

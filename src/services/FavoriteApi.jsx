import api from "./axiosClient";

const getFavoriteMulti = async (userId, sessionId, config = {}) => {
  return await Promise.all([
    api.get(`/account/${userId}/favorite/movies`, {
      ...config,
      params: { sessionId }
    }),
    api.get(`/account/${userId}/favorite/tv`, {
      ...config,
      params: { sessionId }
    }),
  ]);


};

export default getFavoriteMulti;

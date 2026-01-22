import api from "./axiosClient";

const getFavoriteMulti = async (userId, sessionId, config = {}) => {
  return await Promise.all([
    api.get(`/account/${userId}/favorite/movies`, {
      params: { sessionId },
      ...config,
    }),
    api.get(`/account/${userId}/favorite/tv`, {
      params: { sessionId },
      ...config,
    }),
  ]);


};

export default getFavoriteMulti;

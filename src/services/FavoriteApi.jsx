import api from "./axiosClient";

const getFavoriteMulti = async (userId, sessionId, config = {}) => {
  return await Promise.all([
    api.get(`/account/${userId}/favorite/movies`, {
      params: { session_id: sessionId },
      ...config,
    }),
    api.get(`/account/${userId}/favorite/tv`, {
      params: { session_id: sessionId },
      ...config,
    }),
  ]);


};

export default getFavoriteMulti;

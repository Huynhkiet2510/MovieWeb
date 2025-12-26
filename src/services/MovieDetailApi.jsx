import api from "./axiosClient";

export const getDetail = (type, id, config = {}) => {
  return api.get(`/${type}/${id}`, config);
}

export const getCredits = (type, id, config = {}) => {
  return api.get(`/${type}/${id}/credits`, config);
};

export const getFavoriteList = (userId, type, sessionId, config = {}) => {
  return api.get(
    `/account/${userId}/favorite/${type}`,
    {
      params: { session_id: sessionId },
      ...config,
    }
  );
};

export const getWatchList = (userId, type, sessionId, config = {}) => {
  return api.get(
    `/account/${userId}/watchlist/${type}`,
    {
      params: { session_id: sessionId },
      ...config,
    }
  );
};

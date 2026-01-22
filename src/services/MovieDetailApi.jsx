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
      params: { sessionId },
      ...config,
    }
  );
};

export const postFavorite = (userId, type, type_id, isFavorite, sessionId) => {
  return api.post(
    `/account/${userId}/favorite`,
    {
      media_type: type,
      media_id: Number(type_id),
      favorite: !isFavorite,
    },
    {
      params: { sessionId },
    }
  );
};


export const getWatchList = (userId, type, sessionId, config = {}) => {
  return api.get(
    `/account/${userId}/watchlist/${type}`,
    {
      params: { sessionId },
      ...config,
    }
  );
};

export const postWatchList = (userId, type, type_id, isWatchList, sessionId) => {
  return api.post(
    `/account/${userId}/watchlist`,
    {
      media_type: type,
      media_id: Number(type_id),
      watchlist: !isWatchList,
    },
    {
      params: { sessionId },
    }
  );
};

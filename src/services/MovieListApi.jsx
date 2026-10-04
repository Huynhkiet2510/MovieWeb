import api from "./axiosClient";

export const getFavoriteList = (userId, type, sessionId, config = {}) => {
  return api.get(`/account/${userId}/favorite/${type}`, {
    ...config,
    params: { sessionId }
  });
};

export const getFavoriteMulti = (userId, sessionId, config = {}) => {
  return Promise.all([
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

export const getWishlistMulti = (userId, sessionId, config = {}) => {
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

export const searchMulti = (query, page, config = {}) => {
  return Promise.all([
    api.get("/search/movie", {
      ...config,
      params: { query, page }
    }),
    api.get("/search/tv", {
      ...config,
      params: { query, page }
    }),
  ]);
};

export const discoverMulti = ({ genre, country, page }, config = {}) => {
  const params = {
    ...(genre && { with_genres: genre }),
    ...(country && { with_origin_country: country }),
    page,
  };

  return Promise.all([
    api.get("/discover/movie", { ...config, params }),
    api.get("/discover/tv", { ...config, params }),
  ]);
};

export const getTrending = (page, config = {}) =>
  Promise.all([
    api.get("/trending/movie/day", {
      ...config,
      params: { page }
    }),
    api.get("/trending/tv/day", {
      ...config,
      params: { page }
    }),
  ]);

export const getTopRated = (page, config = {}) =>
  Promise.all([
    api.get("/movie/top_rated", {
      ...config,
      params: { page }
    }),
    api.get("/tv/top_rated", {
      ...config,
      params: { page }
    }),
  ]);

export const getPopular = (type, page, config = {}) =>
  api.get(`/${type}/popular`, {
    ...config,
    params: { page }
  });

export const getDetail = (type, id, config = {}) => {
  return api.get(`/${type}/${id}`, config);
};

export const getCredits = (type, id, config = {}) => {
  return api.get(`/${type}/${id}/credits`, config);
};

export const getReview = (id, config = {}) => {
  return api.get(`/movie/${id}/reviews`, config);
};

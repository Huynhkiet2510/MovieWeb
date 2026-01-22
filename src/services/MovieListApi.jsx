import api from "./axiosClient";

export const getFavoriteList = (userId, type, sessionId, config = {}) => {
  return api.get(`/account/${userId}/favorite/${type}`, {
    params: { sessionId },
    ...config,
  });
};

export const getFavoriteMulti = (userId, sessionId, config = {}) => {
  return Promise.all([
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

export const getWishlistMulti = (userId, sessionId, config = {}) => {
  return Promise.all([
    api.get(`/account/${userId}/watchlist/movies`, {
      params: { sessionId },
      ...config,
    }),
    api.get(`/account/${userId}/watchlist/tv`, {
      params: { sessionId },
      ...config,
    }),
  ]);
};

export const searchMulti = (query, page, config = {}) => {
  return Promise.all([
    api.get("/search/movie", {
      params: { query, page },
      ...config,
    }),
    api.get("/search/tv", {
      params: { query, page },
      ...config,
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
    api.get("/discover/movie", { params, ...config }),
    api.get("/discover/tv", { params, ...config }),
  ]);
};

export const getTrending = (page, config = {}) =>
  Promise.all([
    api.get("/trending/movie/day", {
      params: { page },
      ...config,
    }),
    api.get("/trending/tv/day", {
      params: { page },
      ...config,
    }),
  ]);

export const getTopRated = (page, config = {}) =>
  Promise.all([
    api.get("/movie/top_rated", {
      params: { page },
      ...config,
    }),
    api.get("/tv/top_rated", {
      params: { page },
      ...config,
    }),
  ]);

export const getPopular = (type, page, config = {}) =>
  api.get(`/${type}/popular`, {
    params: { page },
    ...config,
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

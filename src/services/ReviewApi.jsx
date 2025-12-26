import api from "../services/axiosClient";

const getReview = (id, params = {}, config = {}) => {
  return api.get(`/movie/${id}/reviews`,{
    params: params,
    ...config
  } );
};

export default getReview;


import api from "../services/axiosClient";

const getReview = (mediaType, id, config = {}) => {
  return api.get(`/${mediaType}/${id}/reviews`, config);
};
export default getReview;


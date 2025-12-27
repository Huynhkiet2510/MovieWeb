import api from "./axiosClient";


const getTrailer = (type, id, config = {}) => {
    return api.get(`/${type}/${id}/videos`, config);
};

export default getTrailer;
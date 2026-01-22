import api from "../services/axiosClient";

export const getRate = (type, id, sessionId, config = {}) => {
  return api.get(`/${type}/${id}/account_states`, {
    params: { sessionId },
    ...config,
  });
};

export const postRate = (type, id, sessionId, value) => {
  return api.post(
    `/${type}/${id}/rating`,
    {
      value: value * 2,
    },
    {
      params: { sessionId }
    }
  );
};

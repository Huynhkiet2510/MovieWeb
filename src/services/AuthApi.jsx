import api from "./axiosClient";

export const createSession = (request_token, config = {}) => {
  return api.post(
    "/authentication/session/new",
    { request_token },
    config
  );
};

export const getAccount = (session_id, config = {}) => {
  return api.get(
    `/account?session_id=${session_id}`,
    config
  );
};

export const createRequestToken = (config = {}) => {
  return api.get("/authentication/token/new", config);
};

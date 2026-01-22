import api from "./axiosClient";

export const createSession = (request_token, config = {}) => {
  return api.post(
    "/authentication/session/new",
    { request_token },
    config
  );
};

export const getAccount = (sessionId, config = {}) => {
  return api.get(
    `/account?session_id=${sessionId}`,
    config
  );
};

export const createRequestToken = (config = {}) => {
  return api.get("/authentication/token/new", config);
};

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { createSession, getAccount } from "../../services/AuthApi";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const request_token = params.get("request_token");
    const controller = new AbortController();

    if (!request_token) return;

    const loginTMDB = async () => {
      try {
        const sessionRes = await createSession(request_token, {
          signal: controller.signal,
        });

        const session_id = sessionRes.data.session_id;

        const accountRes = await getAccount(session_id, {
          signal: controller.signal,
        });

        dispatch(loginSuccess({
          user: accountRes.data,
          session_id,
        }));

        navigate("/", { replace: true });
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Lỗi login TMDB:", err);
      }
    };

    loginTMDB();
    return () => controller.abort();
  }, [location.search, dispatch, navigate]);

  return null;
};

export default AuthPage;

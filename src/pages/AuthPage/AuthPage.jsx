import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const request_token = params.get("request_token");

        if (!request_token) return;

        const loginTMDB = async () => {
            try {
                const sessionRes = await axios.post(
                    "https://api.themoviedb.org/3/authentication/session/new",
                    { request_token },
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                            accept: "application/json",
                        },
                    }
                );

                const session_id = sessionRes.data.session_id;

                const accountRes = await axios.get(
                    `https://api.themoviedb.org/3/account?session_id=${session_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                            accept: "application/json",
                        },
                    }
                );

                const user = accountRes.data;

                dispatch(loginSuccess({ user, session_id }));
                navigate("/");

            } catch (error) {
                console.error("Lỗi login TMDB:", error);
            }
        };

        loginTMDB();
    }, []);
};


export default AuthPage;

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const request_token = params.get("request_token");

        if (!request_token) return;

        const loginTMDB = async () => {
            try {
                // 1. Tạo session
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
                localStorage.setItem("session_id", session_id);

                // 2. Lấy thông tin người dùng
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
                localStorage.setItem("tmdb_user", JSON.stringify(user));
                navigate("/");

            } catch (error) {
                console.error("Lỗi login TMDB:", error);
            }
        };

        loginTMDB();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: 100, color: "white" }}>
            <h2>Đang xác thực đăng nhập...</h2>
        </div>
    );
};

export default AuthPage;

import React from "react";
import axios from "axios";

const LoginPage = () => {
    const handleLogin = async () => {
        try {
            // 1. Lấy request token từ TMDB
            const res = await axios.get(
                "https://api.themoviedb.org/3/authentication/token/new",
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        accept: "application/json",
                    },
                }
            );

            const token = res.data.request_token;

            // 2. Chuyển hướng user sang TMDB để login
            window.location.href =
                `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/auth`;
        } catch (err) {
            console.error("Lỗi login:", err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
            <h1>Đăng nhập bằng TMDB</h1>
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    background: "#01b4e4",
                    border: "none",
                    borderRadius: "5px",
                    color: "white"
                }}
            >
                Login với TMDB
            </button>
        </div>
    );
};

export default LoginPage;

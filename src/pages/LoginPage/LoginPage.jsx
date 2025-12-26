import { useEffect, useRef } from "react";
import { createRequestToken } from "../../services/AuthApi";
import axios from "axios";

const LoginPage = () => {
    const controllerRef = useRef(null);

    const handleLogin = async () => {
        controllerRef.current?.abort();
        const controller = new AbortController();

        try {
            const res = await createRequestToken({
                signal: controller.signal,
            })

            const token = res.data.request_token;

            window.location.href =
                `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/auth`;
        } catch (err) {
            if (axios.isCancel(err)) return;
            console.error("Lỗi login:", err);
        }
    };

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, []);
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

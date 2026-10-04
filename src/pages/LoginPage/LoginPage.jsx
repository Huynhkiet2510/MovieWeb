import { useLogin } from "./useLogin"

const LoginPage = () => {

    const handleLogin = useLogin();

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

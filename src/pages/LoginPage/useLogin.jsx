import axios from 'axios';
import { useEffect, useRef } from "react";
import { createRequestToken } from "../../services/AuthApi";

export const useLogin = () => {
    const controllerRef = useRef(null);

    const handleLogin = async () => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        
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

    return handleLogin;

}

import { useState, useEffect, useRef } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Rating = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { media, id } = useParams();
    const rateControllerRef = useRef(null);

    const session_id = localStorage.getItem("session_id");

    useEffect(() => {
        const controller = new AbortController();

        const fetchRating = async () => {

            const headers = {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                accept: "application/json",
            };

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE}/${media}/${id}/account_states?session_id=${session_id}`,
                    { headers, signal: controller.signal }
                );
                if (res.data && res.data.rated) {
                    const currentRating = typeof res.data.rated === "object" ? res.data.rated.value / 2 : res.data.rated / 2;
                    setRating(currentRating);
                }
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Lỗi khi fetch rating", error);
            }
        };

        fetchRating();
        return () => controller.abort();

    }, [media, id, session_id]);

    const handleRate = async (value) => {
        if (!session_id) {
            toast.error("Bạn cần đăng nhập TMDB để dùng tính năng Đánh giá");
            return;
        }

        rateControllerRef.current?.abort();
        const controller = new AbortController();
        rateControllerRef.current = controller;

        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
        };
        
        try {

            await axios.post(
                `${import.meta.env.VITE_BASE}/${media}/${id}/rating?session_id=${session_id}`,
                { value: value * 2 }, // TMDB dùng 10 point scale
                { headers, signal: controller.signal }
            );
            setRating(value);
            toast.success("Đánh giá thành công");
        } catch (error) {
            console.error("Lỗi khi đánh giá", error);
            toast.error("Đánh giá thất bại");
        }
    };

    useEffect(() => {
        return () => rateControllerRef.current?.abort();
    }, []);

    return (
        <div className="flex items-center gap-1 ml-8">
            {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                    key={star}
                    size={28}
                    className={`cursor-pointer transition ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => handleRate(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
        </div>
    );
};

export default Rating;

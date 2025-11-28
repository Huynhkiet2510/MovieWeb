import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Rating = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { media, id } = useParams();

    const session_id = localStorage.getItem("session_id");

    const handleRate = async (value) => {
        try {
            const headers = {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                accept: "application/json",
                "Content-Type": "application/json",
            };
            await axios.post(`https://api.themoviedb.org/3/${media}/${id}/rating?session_id=${session_id}`,
                { value: value * 2 },
                { headers }
            );
            setRating(value);
            toast.success("Đánh giá thành công 🎉");
        } catch (error) {
            console.error("Lỗi khi đánh giá", error);
            toast.error("Đánh giá thất bại 😢");
        }
    };


    return (<div className="flex items-center gap-1 ml-8">
        {[1, 2, 3, 4, 5].map(star => (
            <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-400"
                    }`}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
            />
        ))} </div>
    );
};

export default Rating;

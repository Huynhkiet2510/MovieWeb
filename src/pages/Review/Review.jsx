import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaComment  } from "react-icons/fa";


const Review = () => {
  const { id } = useParams(); 
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setReviews(res.data.results || []);
      } catch (error) {
        console.error("Lỗi khi lấy review:", error);
        setReviews([]);
      }
    };

    fetchReview(); 
  }, [id]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaComment /> Đánh giá phim</h2>

      {reviews.length === 0 ? (
        <p className="bg-[#14161D] w-full text-center p-10 rounded-2xl text-sm text-gray-400">Không có đánh giá nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#191B24] rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                  {review.author[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  {review.author_details?.rating && (
                    <span className="flex items-center gap-1 text-yellow-400 text-sm">
                      <FaStar /> {review.author_details.rating}/10
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm">
                {review.content.length > 300
                  ? review.content.slice(0, 300) + "..."
                  : review.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;

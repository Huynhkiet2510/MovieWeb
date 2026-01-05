import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilm, FaTv } from "react-icons/fa";

const CartItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/${item.media_type}/${item.id}`)}
            className="bg-[#2B2C38] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
            key={item.media_type + item.id}
        >
            <div className="rounded-2xl">
                <img
                    className="h-70 w-full"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.display_title}
                    loading="lazy"
                />

                <h3 className="flex items-center w-full p-2">
                    <span className="mr-2">
                        {item.media_type === "movie" ? (
                            <FaFilm className="text-yellow-300" />
                        ) : (
                            <FaTv className="text-blue-400" />
                        )}
                    </span>
                    <span className="truncate">{item.display_title || item.name || item.title}</span>
                </h3>
            </div>
        </div>
    )
}

export default memo(CartItem);
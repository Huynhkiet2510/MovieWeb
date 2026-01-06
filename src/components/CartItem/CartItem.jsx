import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilm, FaTv } from "react-icons/fa";

const CartItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/${item.media_type}/${item.id}`)}
            className="bg-card-bg border border-border rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg group"
            key={item.media_type + item.id}
        >
            <div className="relative">
                <img
                    className="h-70 w-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.display_title}
                    loading="lazy"
                />

                <h3 className="flex items-center w-full p-2 text-text-main font-medium">
                    <span className="mr-2 shrink-0">
                        {item.media_type === "movie" ? (
                            <FaFilm className="text-yellow-500" />
                        ) : (
                            <FaTv className="text-blue-500" />
                        )}
                    </span>
                    <span className="truncate text-sm">
                        {item.display_title || item.name || item.title}
                    </span>
                </h3>
            </div>
        </div>
    )
}

export default memo(CartItem);
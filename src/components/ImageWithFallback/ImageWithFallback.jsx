const ImageWithFallback = ({ src, alt, className, ...props }) => {
    const fallbackImage = "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";

    return (
        <img
            className={`${className} transition-opacity duration-300`}
            src={src ? src : fallbackImage}
            alt={alt || "Movie Poster"}
            onError={(e) => {
                if (e.currentTarget.src !== fallbackImage) {
                    e.currentTarget.src = fallbackImage;
                }
                e.currentTarget.classList.add('opacity-80');
            }}
            {...props}
        />
    );
};

export default ImageWithFallback;
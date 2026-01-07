import { useSearchParams } from "react-router-dom";
import { FaStar, FaComment } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination";
import { useFetchReview } from "./useFetchReview"

const Review = ({ media, id }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { reviews, totalPages, loading, error } = useFetchReview({ media, id, page });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage })
  };

  return (
    <div className="mt-8 text-text-muted">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaComment /> Đánh giá phim</h2>
        {loading ? (
          <>
            <div className="bg-review-skeleton w-full h-32 animate-pulse rounded-2xl" />
          </>
        ) : error ? (
          <p className="text-red-500 text-center">Lỗi tải đánh giá!</p>
        ) : reviews.length === 0 ? (
          <p className="bg-page-bg w-full text-center p-10 rounded-2xl text-sm text-text-muted">Không có đánh giá nào.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-page-bg rounded-2xl  p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-page-bg flex items-center justify-center text-text-muted font-bold text-lg">
                    {(review.author?.charAt(0) || "U").toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-text-muted">{review.author}</h4>
                    {review.author_details?.rating && (
                      <span className="flex items-center gap-1 text-yellow-400 text-sm">
                        <FaStar /> {review.author_details.rating}/10
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-text-muted text-sm">
                  {review.content.length > 300
                    ? review.content.slice(0, 300) + "..."
                    : review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <nav>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </nav>
      )}

    </div>
  );
};

export default Review;

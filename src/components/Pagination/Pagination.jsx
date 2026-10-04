const Pagination = ({ page, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    const delta = window.innerWidth < 640 ? 1 : 2;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const btnBase = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded transition-all duration-200 cursor-pointer text-xs md:text-sm font-medium";

  const navBtnBase = "px-3 py-1.5 md:px-4 md:py-2 border border-border rounded transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs md:text-sm font-medium";

  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 text-text-main w-full px-2 flex-wrap transition-colors duration-300">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`${navBtnBase} bg-card-bg hover:bg-border text-text-main shadow-sm`}
      >
        <span className="hidden md:inline">Trước</span>
        <span className="md:hidden">{"<"}</span>
      </button>

      <div className="flex items-center gap-1 md:gap-2">
        {getPages().map((p, index) =>
          p === '...' ? (
            <span key={index} className="px-1 md:px-2 text-text-muted">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(p)}
              className={`${btnBase} ${p === page
                  ? 'bg-red-600 border-red-600 text-white shadow-md' // Giữ nguyên màu đỏ để làm nổi bật trang hiện tại
                  : 'bg-card-bg text-text-muted hover:text-text-main hover:border-text-main shadow-sm'
                }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${navBtnBase} bg-card-bg hover:bg-border text-text-main shadow-sm`}
      >
        <span className="hidden md:inline">Sau</span>
        <span className="md:hidden">{">"}</span>
      </button>
    </div>
  );
};

export default Pagination;
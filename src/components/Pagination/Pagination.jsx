const Pagination = ({ page, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = []
    const delta = 2

    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    pages.push(1)
    if (left > 2) pages.push('...')

    for (let i = left; i <= right; i++) {
      pages.push(i)
    }

    if (right < totalPages - 1) pages.push('...')
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const btnBase = "w-10 h-10 flex items-center justify-center border border-gray-700 rounded transition-colors duration-200 cursor-pointer"
  const navBtnBase = "px-4 py-2 border border-gray-700 rounded transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"

  return (
    <div className="flex justify-center items-center gap-2 my-8 text-white">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`${navBtnBase} bg-gray-800 hover:bg-gray-700 `}
      >
        Trước
      </button>

      {getPages().map((p, index) =>
        p === '...' ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(p)}
            className={`${btnBase} ${
              p === page 
                ? 'bg-red-600 border-red-600 text-white'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${navBtnBase} bg-gray-800 hover:bg-gray-700`}
      >
        Sau
      </button>
    </div>
  )
}

export default Pagination
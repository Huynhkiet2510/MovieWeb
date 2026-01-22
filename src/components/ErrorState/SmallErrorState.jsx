const SmallErrorState = ({ message, onRetry }) => {
    return (
        <div className="flex items-center gap-3 py-4 px-5 bg-page-bg rounded-xl border border-white/10 my-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-red-500 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <span className="text-text-muted text-sm leading-tight">
               {message || "Không thể tải dữ liệu lúc này"}
            </span>

            <button
                onClick={onRetry}
                className="text-red-500 hover:text-red-400 text-sm font-bold underline underline-offset-4 ml-auto whitespace-nowrap cursor-pointer"
            >
                Thử lại
            </button>
        </div>
    );
};

export default SmallErrorState;
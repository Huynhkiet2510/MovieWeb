import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
<div className="flex items-center justify-center gap-4 mt-6">

  <button
    disabled={page === 1}
    onClick={() => onPageChange(page - 1)}
    className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#2B2C38] text-white hover:bg-[#111] cursor-pointer transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed`}
  >
    <FaAngleLeft />
  </button>

  <span className="px-3 py-2 rounded-lg bg-[#2B2C38] text-white font-semibold">
    Trang <strong>{page}</strong> / {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => onPageChange(page + 1)}
    className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#2B2C38] text-white hover:bg-[#111] cursor-pointer transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed`}
  >
    <FaAngleRight />
  </button>
</div>
  );
};

export default Pagination;

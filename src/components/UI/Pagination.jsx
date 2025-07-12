import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="flex items-center justify-center my-5 flex-wrap">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="btn btn-sm px-3 disabled:opacity-50"
      >
        <GrFormPrevious />
      </button>
      {pages.map((page, index) => {
        return (
          <button
            onClick={() => setCurrentPage(page)}
            key={index}
            className={`${
              page == currentPage
                ? "btn btn-primary mx-1"
                : "btn bg-gray-500 text-white mx-1"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn btn-sm px-3 disabled:opacity-50"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;

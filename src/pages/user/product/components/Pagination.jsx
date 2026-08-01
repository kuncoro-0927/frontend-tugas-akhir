const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center md:justify-end mt-10 gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-black text-white" : ""}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
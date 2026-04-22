export const PrevIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
export const NextIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }:any) => (
  <div className="flex justify-center items-center gap-1 mt-2 pb-2">
    <button
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
      aria-label="Previous page"
    >
      <PrevIcon />
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        aria-current={page === currentPage ? "page" : undefined}
        className={`w-7 h-7 flex items-center justify-center rounded text-sm font-medium border transition cursor-pointer
          ${page === currentPage
            ? "bg-blue-50 border-blue-400 text-blue-700"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
      aria-label="Next page"
    >
      <NextIcon />
    </button>
  </div>
);

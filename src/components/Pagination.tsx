interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", 8, 9, 10];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-end space-x-2 mt-6">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="/arrow.svg" alt="arrow" />
        <span>Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="items-center hidden sm:flex">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-250 ease-in-out text-brand rounded-lg ${
                  page === currentPage
                    ? "bg-brand-light"
                    : "bg-white hover:bg-[var(--color-brand-50)] text-gray-medium"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <img src="/arrow.svg" alt="arrow" className="rotate-180" />
      </Button>
    </div>
  );
}

export default Pagination;

const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-gray-600 bg-white hover:bg-[var(--color-brand-50)] disabled:opacity-50 transition-colors duration-250 ease-in-out rounded-lg"
    >
      {children}
    </button>
  );
};

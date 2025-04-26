import { useTheme } from "next-themes";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  borderColor: string;
}

export default function ProductPagination({
  page,
  totalPages,
  handlePageChange,
  borderColor,
}: ProductPaginationProps) {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center mt-12 space-x-3">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-5 py-2 rounded-full font-body backdrop-blur-sm border-2 ${borderColor}
          ${
            theme === "dark"
              ? "hover:bg-dark-primary/30 text-dark-text"
              : "hover:bg-primary/30 text-charcoal"
          } disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-5 py-2 rounded-full font-body backdrop-blur-sm border-2 ${borderColor}
            ${
              page === p
                ? theme === "dark"
                  ? "bg-dark-primary/50 text-dark-text border-dark-primary"
                  : "bg-primary/50 text-cream border-primary"
                : theme === "dark"
                ? "hover:bg-dark-primary/30 text-dark-text"
                : "hover:bg-primary/30 text-charcoal"
            } transition-all duration-300 hover:shadow-md`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-5 py-2 rounded-full font-body backdrop-blur-sm border-2 ${borderColor}
          ${
            theme === "dark"
              ? "hover:bg-dark-primary/30 text-dark-text"
              : "hover:bg-primary/30 text-charcoal"
          } disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md`}
      >
        Next
      </button>
    </div>
  );
}

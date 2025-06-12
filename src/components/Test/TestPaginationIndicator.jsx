import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestPaginationIndicator({
  currentPage,
  totalPages,
  handlePageClick,
}) {
  const groupSize = 10;
  const currentGroup = Math.floor(currentPage / groupSize);
  const startIndex = currentGroup * groupSize;
  const endIndex = Math.min(startIndex + groupSize, totalPages);

  const canGoPrev = startIndex > 0;
  const canGoNext = endIndex < totalPages;

  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      {/* Indikator Halaman */}
      <div className="flex items-center justify-center space-x-2 mb-2">
        {canGoPrev && (
          <button
            onClick={() => handlePageClick(startIndex - 1)}
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            <ChevronLeft className="w-4 h-4 inline-block" /> Prev
          </button>
        )}

        {Array.from({ length: endIndex - startIndex }, (_, i) => {
          const pageIndex = startIndex + i;

          return (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                pageIndex === currentPage
                  ? "bg-gradient-to-r from-purple-500 to-amber-500 scale-125"
                  : pageIndex < currentPage
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            ></button>
          );
        })}

        {canGoNext && (
          <button
            onClick={() => handlePageClick(endIndex)}
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            Next <ChevronRight className="w-4 h-4 inline-block" />
          </button>
        )}
      </div>

      {/* Info halaman */}
      <div className="text-center text-sm text-gray-600 mb-2">
        Halaman {currentPage + 1} dari {totalPages}
      </div>

      {/* Motivasi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center p-4 rounded-lg bg-purple-50/50"
      >
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
          <span className="text-sm font-medium text-gray-700">
            Tetap semangat! Setiap jawaban membawa Anda lebih dekat pada
            pemahaman diri yang mendalam.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

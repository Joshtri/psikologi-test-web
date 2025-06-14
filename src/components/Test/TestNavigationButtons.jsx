// components/test/TestNavigationButtons.jsx
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function TestNavigationButtons({
  currentPage,
  totalPages,
  canProceed,
  handleNext,
  handlePrevious,
  handleFinishTest, // ✅ Tambahan
  isLastPage, // ✅ Tambahan
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Sebelumnya
      </button>

      {isLastPage ? (
        <button
          onClick={handleFinishTest}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
            !canProceed()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          Selesai & Kirim
          <CheckCircle className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
            !canProceed()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-amber-500 text-white hover:bg-amber-600"
          }`}
        >
          Selanjutnya
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

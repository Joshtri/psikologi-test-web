// components/test/TestNavigationButtons.jsx
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { PDQ_SCORING } from "../../constants/inference/pdqInference";

export default function TestNavigationButtons({
  currentPage,
  totalPages,
  canProceed,
  handleNext,
  handlePrevious,
  handleFinishTest,
  isLastPage,
  answers,
  pdqSubQuestions,
}) {
  const [loading, setLoading] = useState(false); // Loading state for "Selesai & Kirim"

  // Function to convert PDQ sub-questions to scores
  const convertPdqSubQuestions = (subQuestions) => {
    const convertedScores = {};
    const subQuestionIds = [34, 35, 36, 37, 38, 39];

    subQuestionIds.forEach((questionId) => {
      if (subQuestions[questionId] !== undefined) {
        const score = PDQ_SCORING.SCALE_MAPPING[subQuestions[questionId]] || 0;
        convertedScores[`pdq_4-${questionId}`] = score;
      }
    });

    return convertedScores;
  };

  const handleNextClick = () => {
    if (isLastPage) {
      const convertedPdqScores = convertPdqSubQuestions(pdqSubQuestions || {});
      const completeAnswers = { ...answers, ...convertedPdqScores };

      localStorage.setItem("resultsData", JSON.stringify(completeAnswers));
      console.log("Complete answers saved to localStorage on last page:", completeAnswers);
      console.log("PDQ sub-questions converted scores:", convertedPdqScores);
    }
    handleNext();
  };

  const handleFinishClick = async () => {
    setLoading(true); // Start loading
    try {
      const convertedPdqScores = convertPdqSubQuestions(pdqSubQuestions || {});
      const completeAnswers = { ...answers, ...convertedPdqScores };

      localStorage.setItem("resultsData", JSON.stringify(completeAnswers));
      console.log("Complete answers saved to localStorage on finish:", completeAnswers);
      console.log("PDQ sub-questions converted scores:", convertedPdqScores);

      await handleFinishTest(); // Ensure the finish test logic is executed
    } catch (error) {
      console.error("Error finishing test:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
          onClick={handleFinishClick}
          disabled={!canProceed() || loading} // Disable button while loading
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
            !canProceed() || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat...
            </div>
          ) : (
            <>
              Selesai & Kirim
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      ) : (
        <button
          onClick={handleNextClick}
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

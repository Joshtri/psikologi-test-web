import { Card } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../../../data/questions.json";
import { useToast } from "../../provider/ToastProvider";
import {
  generateAllQuestions,
  getCurrentPageQuestions,
  getTotalProgress,
  getAnsweredCount,
} from "@/utils/testUtils";
import VerticalStepper from "@/components/ui/VerticalStepper";

// Komponen dinamis per skala
import PdqScale from "@/components/QuestionScale/PdqScale";
import TestNavigationButtons from "@/components/test/TestNavigationButtons";
import QuestionPagination from "@/components/test/TestPaginationIndicator";
import HfsScale from "@/components/QuestionScale/HfsScale";

const testSequence = ["hfs", "pdq_4"]; // Tambahkan ID skala berikutnya di sini
const steps = ["PDQ Scale", "HFS Scale", "Selesai"];

export default function TestIndexPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentTestId = testSequence[currentTestIndex];
  const currentTest = questionsData.tests.find((t) => t.id === currentTestId);

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const allQuestions = generateAllQuestions(currentTest);
  const questionsPerPage = 10;
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const currentQuestions = getCurrentPageQuestions(
    allQuestions,
    currentPage,
    questionsPerPage
  );

  const canProceed = () =>
    getAnsweredCount(currentQuestions, answers) === currentQuestions.length;

  const handleNext = () => {
    if (!canProceed()) {
      showToast({
        type: "error",
        message: "Mohon jawab semua pertanyaan sebelum melanjutkan!",
        align: "top-right",
        duration: 3000,
      });
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      navigate("/test/result", {
        state: {
          answers,
          allQuestions,
          timeElapsed,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 text-gray-800">
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VerticalStepper steps={steps} currentStep={currentTestIndex} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 shadow-xl border-2 bg-white border-purple-200 p-6">
                {currentTestId === "pdq_4" ? (
                  <PdqScale
                    answers={answers}
                    setAnswers={setAnswers}
                    currentPage={currentPage}
                    questionsPerPage={questionsPerPage}
                    timeElapsed={timeElapsed}
                  />
                ) : currentTestId === "hfs" ? (
                  <HfsScale
                    answers={answers}
                    setAnswers={setAnswers}
                    currentPage={currentPage}
                    questionsPerPage={questionsPerPage}
                    timeElapsed={timeElapsed}
                  />
                ) : (
                  <div className="text-center text-gray-500 italic">
                    Skala untuk tes ini belum tersedia.
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          <TestNavigationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            canProceed={canProceed}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />

          <QuestionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            currentQuestions={currentQuestions}
            allQuestions={allQuestions}
            answers={answers}
            canProceed={canProceed}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handlePageClick={(pageIndex) => setCurrentPage(pageIndex)}
          />
        </div>
      </div>
    </div>
  );
}

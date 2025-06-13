import { Card } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hfsData from "../../../data/questions/hfsQuestion.json";
import pdqData from "../../../data/questions/pdqQuestion.json";
import { useToast } from "../../provider/ToastProvider";
import VerticalStepper from "@/components/ui/VerticalStepper";
import PdqScale from "@/components/QuestionScale/PdqScale";
import HfsScale from "@/components/QuestionScale/HfsScale";
import TestNavigationButtons from "@/components/Test/TestNavigationButtons";
import QuestionPagination from "@/components/Test/TestPaginationIndicator";
import PwbScale from "@/components/QuestionScale/PwbScale";
import pwbData from "../../../data/questions/pwbQuestion.json";
import aceData from "../../../data/questions/aceQuestion.json";
import AceScale from "@/components/QuestionScale/AceScale";
const testSequence = ["ace", "pwb", "pdq_4", "hfs"];
const steps = ["Bagian 1", "Bagian 2", "Bagian 3", "Bagian 4", "Selesai"];
const dataMap = {
  ace: {
    questions: aceData.sections.flatMap((s) => s.questions),
    full: aceData,
  },
  pwb: pwbData,
  pdq_4: pdqData,
  hfs: hfsData,
};

export default function TestIndexPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState([0]); // awalnya cuma step 0

  const questionsPerPage = 10;
  const currentTestId = testSequence[currentTestIndex];
  const currentTest = dataMap[currentTestId];
  const allQuestions = currentTest.questions;
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;
  const currentQuestions = allQuestions.slice(start, end);

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const canProceed = () => {
    return currentQuestions.every((q) => {
      const key =
        currentTestId === "pdq_4"
          ? `pdq_4-${q.id}`
          : currentTestId === "ace"
          ? `ace-${q.id}`
          : q.id;
      return answers[key];
    });
  };

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
    } else if (currentTestIndex < testSequence.length - 1) {
      const nextStep = currentTestIndex + 1;
      setCurrentTestIndex(nextStep);
      setCurrentPage(0);

      // ⬇ tambahkan nextStep ke daftar step yang pernah dikunjungi
      setVisitedSteps((prev) =>
        prev.includes(nextStep) ? prev : [...prev, nextStep]
      );
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleStepClick = (targetStep) => {
    if (visitedSteps.includes(targetStep)) {
      setCurrentTestIndex(targetStep);
      setCurrentPage(0);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 text-gray-800">
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VerticalStepper
            steps={steps}
            currentStep={currentTestIndex}
            onStepClick={handleStepClick}
            visitedSteps={visitedSteps}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentTestId}-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 shadow-xl border-2 bg-white border-purple-200 p-6">
                {currentTestId === "ace" ? (
                  <AceScale
                    questions={currentQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    timeElapsed={timeElapsed}
                    sectionInfo={currentTest.full.sections.find((s) =>
                      s.questions.some((q) => q.id === currentQuestions[0]?.id)
                    )}
                  />
                ) : currentTestId === "pdq_4" ? (
                  <PdqScale
                    questions={currentQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    timeElapsed={timeElapsed}
                    totalQuestions={allQuestions.length}
                  />
                ) : currentTestId === "hfs" ? (
                  <HfsScale
                    questions={currentQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    timeElapsed={timeElapsed}
                    totalQuestions={allQuestions.length}
                  />
                ) : currentTestId === "pwb" ? (
                  <PwbScale
                    questions={currentQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    timeElapsed={timeElapsed}
                    currentPage={currentPage}
                    questionsPerPage={questionsPerPage}
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

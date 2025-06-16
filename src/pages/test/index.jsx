import { Card } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
import LeavePagePrompt from "@/components/common/LeavePagePrompt";
import { TEST_SEQUENCE, TEST_STEPS, QUESTIONS_PER_PAGE, TEST_TYPES } from "@/constants/testConfig";

const dataMap = {
  [TEST_TYPES.ACE]: {
    questions: aceData.sections.flatMap((s) => s.questions),
    full: aceData,
  },
  [TEST_TYPES.PWB]: pwbData,
  [TEST_TYPES.PDQ_4]: pdqData,
  [TEST_TYPES.HFS]: hfsData,
};

export default function TestIndexPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState([0]);

  const currentTestId = TEST_SEQUENCE[currentTestIndex];
  const currentTest = dataMap[currentTestId];
  const allQuestions = currentTest.questions;
  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);
  const start = currentPage * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const currentQuestions = allQuestions.slice(start, end);

  const canProceed = () => {
    return currentQuestions.every((q) => {
      const key =
        currentTestId === TEST_TYPES.PDQ_4 ? `pdq_4-${q.id}` : currentTestId === TEST_TYPES.ACE ? `ace-${q.id}` : q.id;
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
    } else if (currentTestIndex < TEST_SEQUENCE.length - 1) {
      const nextStep = currentTestIndex + 1;
      setCurrentTestIndex(nextStep);
      setCurrentPage(0);

      setVisitedSteps((prev) => (prev.includes(nextStep) ? prev : [...prev, nextStep]));
    }

    console.log(answers); //debug block
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
    <>
      <LeavePagePrompt when={Object.keys(answers).length > 0} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 text-gray-800">
        <div className="relative z-10 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <VerticalStepper
              steps={TEST_STEPS}
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
                  {currentTestId === TEST_TYPES.ACE ? (
                    <AceScale
                      questions={currentQuestions}
                      answers={answers}
                      setAnswers={setAnswers}
                      sectionInfo={currentTest.full.sections.find((s) =>
                        s.questions.some((q) => q.id === currentQuestions[0]?.id)
                      )}
                    />
                  ) : currentTestId === TEST_TYPES.PDQ_4 ? (
                    <PdqScale
                      questions={currentQuestions}
                      answers={answers}
                      setAnswers={setAnswers}
                      totalQuestions={allQuestions.length}
                    />
                  ) : currentTestId === TEST_TYPES.HFS ? (
                    <HfsScale
                      questions={currentQuestions}
                      answers={answers}
                      setAnswers={setAnswers}
                      totalQuestions={allQuestions.length}
                    />
                  ) : currentTestId === TEST_TYPES.PWB ? (
                    <PwbScale
                      questions={currentQuestions}
                      answers={answers}
                      setAnswers={setAnswers}
                      currentPage={currentPage}
                      questionsPerPage={QUESTIONS_PER_PAGE}
                    />
                  ) : (
                    <div className="text-center text-gray-500 italic">Skala untuk tes ini belum tersedia.</div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>

            <TestNavigationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              canProceed={canProceed}
              allQuestions={allQuestions}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              answers={answers}
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
    </>
  );
}

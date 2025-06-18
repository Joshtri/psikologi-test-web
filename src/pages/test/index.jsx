import { Card } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hfsData from "../../../data/questions/hfsQuestion.json";
import pdqData from "../../../data/questions/pdqQuestion.json";
import pwbData from "../../../data/questions/pwbQuestion.json";
import aceData from "../../../data/questions/aceQuestion.json";
import { useToast } from "../../provider/ToastProvider";
import VerticalStepper from "@/components/ui/VerticalStepper";
import PdqScale from "@/components/QuestionScale/PdqScale";
import HfsScale from "@/components/QuestionScale/HfsScale";
import TestNavigationButtons from "@/components/Test/TestNavigationButtons";
import QuestionPagination from "@/components/Test/TestPaginationIndicator";
import PwbScale from "@/components/QuestionScale/PwbScale";
import AceScale from "@/components/QuestionScale/AceScale";
import LeavePagePrompt from "@/components/common/LeavePagePrompt";
import { TEST_SEQUENCE, TEST_STEPS, QUESTIONS_PER_PAGE, TEST_TYPES } from "@/constants/testConfig";
import { submitRespondentForm } from "@/services/respondent.service";

// Import inference constants
import { HFS_SCORING, getSubscaleInterpretation, getTotalInterpretation } from "@/constants/inference/hfsInference";
import { PWB_SCORING, getPwbInterpretation } from "@/constants/inference/pwbInference";
import { PDQ_SCORING, PDQ_INTERPRETATIONS, getPdqInterpretation } from "@/constants/inference/pdqInference";
import { ACE_SCORING, ACE_INTERPRETATIONS, getAceInterpretation } from "@/constants/inference/aceInference";

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
  const [pdqSubQuestions, setPdqSubQuestions] = useState({});
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
      // Handle PDQ-4 sub-questions (34-39) - check persistent state
      if (currentTestId === TEST_TYPES.PDQ_4 && [34, 35, 36, 37, 38, 39].includes(q.id)) {
        return pdqSubQuestions[q.id] !== undefined;
      }

      // Skip validation for PDQ-4 instruction questions
      if (currentTestId === TEST_TYPES.PDQ_4 && q.isInstruction) {
        return true; // Always allow proceeding for instruction questions
      }

      const key =
        currentTestId === TEST_TYPES.PDQ_4
          ? `pdq_4-${q.id}`
          : currentTestId === TEST_TYPES.ACE
          ? `ace-${q.id}` // Check score value for ACE (no more raw)
          : currentTestId === TEST_TYPES.HFS
          ? `hfs-${q.id}`
          : currentTestId === TEST_TYPES.PWB
          ? `pwb-${q.id}`
          : q.id;

      // Check if the answer exists (not undefined), regardless of its value (including 0)
      return answers[key] !== undefined;
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

    // Check if this is the last page of the last test
    const isLastPage = currentPage === totalPages - 1 && currentTestIndex === TEST_SEQUENCE.length - 1;

    // Save answers to localStorage before proceeding on last page
    if (isLastPage) {
      localStorage.setItem("resultsData", JSON.stringify(answers));
      console.log("Answers saved to localStorage:", answers);
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (currentTestIndex < TEST_SEQUENCE.length - 1) {
      const nextStep = currentTestIndex + 1;
      setCurrentTestIndex(nextStep);
      setCurrentPage(0);

      setVisitedSteps((prev) => (prev.includes(nextStep) ? prev : [...prev, nextStep]));
    } else {
      // All tests completed - redirect to results page with answers
      console.log("Final answers (excluding sub-questions):", answers);
      console.log("PDQ Sub-questions (persistent, not saved):", pdqSubQuestions);
      navigate("/results", { state: { answers, pdqSubQuestions } });
      return;
    }

    console.log("Final answers (excluding sub-questions):", answers);
    console.log("PDQ Sub-questions (persistent, not saved):", pdqSubQuestions);
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

  // Handler for PDQ sub-questions changes - now directly updates persistent state
  const handlePdqSubQuestionsChange = (questionId, value) => {
    setPdqSubQuestions((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Function to calculate HFS summary
  const calculateHfsSummary = (answers) => {
    const hfsAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("hfs-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("hfs-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    const scores = { self: 0, others: 0, situation: 0 };

    hfsData.questions.forEach((question) => {
      const score = hfsAnswers[question.id];
      if (score !== undefined) {
        // Score is already calculated, just add to subscale
        scores[question.subscale] += score;
      }
    });

    const totalScore = scores.self + scores.others + scores.situation;

    return {
      total: {
        value: totalScore,
        inference: getTotalInterpretation(totalScore).interpretation,
      },
      self: {
        value: scores.self,
        inference: getSubscaleInterpretation(scores.self, "self").interpretation,
      },
      others: {
        value: scores.others,
        inference: getSubscaleInterpretation(scores.others, "others").interpretation,
      },
      situation: {
        value: scores.situation,
        inference: getSubscaleInterpretation(scores.situation, "situation").interpretation,
      },
    };
  };

  // Function to calculate PWB summary
  const calculatePwbSummary = (answers) => {
    const pwbAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("pwb-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("pwb-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    let totalScore = 0;

    pwbData.questions.forEach((question) => {
      const score = pwbAnswers[question.id];
      if (score !== undefined) {
        // Score is already calculated, just sum them up
        totalScore += score;
      }
    });

    return {
      total: {
        value: totalScore,
        inference: getPwbInterpretation(totalScore).interpretation,
      },
    };
  };

  // Function to calculate PDQ summary
  const calculatePdqSummary = (answers) => {
    const pdqAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("pdq_4-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("pdq_4-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    const labelScores = {};

    pdqData.questions.forEach((question) => {
      if (question.parentId) return;

      const score = pdqAnswers[question.id];
      if (score !== undefined && question.label) {
        // Score is already calculated, just add to label
        if (!labelScores[question.label]) {
          labelScores[question.label] = 0;
        }
        labelScores[question.label] += score;
      }
    });

    const disordersFound = getPdqInterpretation(labelScores);

    return {
      disorders: disordersFound,
      labelScores: labelScores, // Add total scores for each disorder
      inference:
        disordersFound.length > 0
          ? `Anda memiliki kecenderungan kepribadian: ${disordersFound.join(", ")}`
          : PDQ_INTERPRETATIONS.NO_DISORDER.interpretation,
    };
  };

  // Function to calculate ACE summary
  const calculateAceSummary = (answers) => {
    const aceAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("ace-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("ace-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    const categoryScores = {};
    const allQuestions = aceData.sections.flatMap((section) => section.questions);

    allQuestions.forEach((question) => {
      const score = aceAnswers[question.id];
      if (score !== undefined && question.category) {
        // Score is already calculated, just add to category
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = 0;
        }
        categoryScores[question.category] += score;
      }
    });

    const experiencedCategories = getAceInterpretation(categoryScores);

    return {
      experiences: experiencedCategories,
      categoryScores: categoryScores, // Add total scores for each category
      inference:
        experiencedCategories.length > 0
          ? `Anda pernah melewati pengalaman: ${experiencedCategories.join(", ")}`
          : ACE_INTERPRETATIONS.NO_EXPERIENCES.interpretation,
    };
  };

  const handleFinishTest = async () => {
    try {
      const respondentData = localStorage.getItem("respondentDraft");
      const resultsData = localStorage.getItem("resultsData");

      if (!respondentData) {
        showToast({
          type: "error",
          message: "Data responden tidak ditemukan.",
          align: "top-right",
        });
        return;
      }

      if (!resultsData) {
        showToast({
          type: "error",
          message: "Data hasil tes tidak ditemukan.",
          align: "top-right",
        });
        return;
      }

      const respondent = JSON.parse(respondentData);
      const testAnswers = JSON.parse(resultsData);

      // Calculate summaries for each test
      const hfsSummary = calculateHfsSummary(testAnswers);
      const pwbSummary = calculatePwbSummary(testAnswers);
      const pdqSummary = calculatePdqSummary(testAnswers);
      const aceSummary = calculateAceSummary(testAnswers);

      const payload = {
        name: respondent.name,
        dateOfBirth: respondent.dateOfBirth,
        age: respondent.age,
        gender: respondent.gender,
        phoneNumber: respondent.phoneNumber,
        educationLevel: respondent.educationLevel,
        schoolName: respondent.schoolName,
        livingWith: respondent.livingWith,
        address: respondent.address,
        parentOccupation: respondent.parentOccupation,
        birthOrder: respondent.birthOrder,
        ethnicity: respondent.ethnicity,
        answers: testAnswers,
        summary: {
          hfs: hfsSummary,
          pwb: pwbSummary,
          pdq: pdqSummary,
          ace: aceSummary,
        },
      };

      console.log("🔍 Payload yang dikirim ke backend:", payload);

      await submitRespondentForm(payload);

      showToast({
        type: "success",
        message: "Hasil tes berhasil disimpan!",
        align: "top-right",
      });

      navigate("/results", {
        state: { answers: testAnswers, pdqSubQuestions, respondent },
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: "Terjadi kesalahan saat menyimpan hasil.",
        align: "top-right",
      });
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
                      pdqSubQuestions={pdqSubQuestions}
                      onSubQuestionChange={handlePdqSubQuestionsChange}
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
              handleFinishTest={handleFinishTest}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              answers={answers}
              pdqSubQuestions={pdqSubQuestions} // Add this line
              isLastPage={currentPage === totalPages - 1 && currentTestIndex === TEST_SEQUENCE.length - 1}
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

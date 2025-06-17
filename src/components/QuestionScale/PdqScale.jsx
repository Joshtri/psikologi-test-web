import React, { useEffect } from "react";
import pdqData from "../../../data/questions/pdqQuestion.json";
import TestHeader from "@/components/Test/TestHeader";
import { Flame, Star, HeartPulse, ShieldAlert, HelpCircle } from "lucide-react";

export default function PdqScale({
  questions,
  answers,
  setAnswers,
  totalQuestions,
  pdqSubQuestions, // Persistent sub-questions from parent
  onSubQuestionChange, // Callback to update individual sub-question
}) {
  const { scale, name, instructions } = pdqData;

  const handleChange = (questionId, value) => {
    const subQuestions = [34, 35, 36, 37, 38, 39];

    if (subQuestions.includes(questionId)) {
      // Store sub-question answers in parent's persistent state
      onSubQuestionChange(questionId, value);
    } else {
      // Store regular answers in main state
      setAnswers((prev) => ({
        ...prev,
        [`pdq_4-${questionId}`]: value,
      }));
    }
  };

  // Auto-answer question 33 based on questions 34-39
  useEffect(() => {
    const subQuestions = [34, 35, 36, 37, 38, 39];
    const trueAnswers = subQuestions.filter((qId) => pdqSubQuestions[qId] === "true");

    // Check if all sub-questions (34-39) have been answered
    const allSubQuestionsAnswered = subQuestions.every((qId) => pdqSubQuestions[qId] !== undefined);

    // Only auto-answer if all sub-questions are answered
    if (allSubQuestionsAnswered) {
      const shouldBeTrue = trueAnswers.length >= 2;
      const currentAnswer = answers[`pdq_4-33`];
      const targetAnswer = shouldBeTrue ? "true" : "false";

      // Only update if the answer needs to change
      if (currentAnswer !== targetAnswer) {
        setAnswers((prev) => ({
          ...prev,
          [`pdq_4-33`]: targetAnswer,
        }));
      }
    }
  }, [pdqSubQuestions, answers, setAnswers]);

  // Calculate progress including sub-questions
  const mainAnswersCount = Object.keys(answers).filter((key) => key.startsWith("pdq_4-")).length;
  const subAnswersCount = Object.keys(pdqSubQuestions).length;
  const progress = Math.round(((mainAnswersCount + subAnswersCount) / totalQuestions) * 100);

  // used for the styling of each disorder type
  const labelMeta = {
    Histrionik: {
      color: "bg-pink-100 text-pink-700",
      icon: <Flame className="w-3.5 h-3.5 mr-1" />,
    },
    Narcissistic: {
      color: "bg-yellow-100 text-yellow-700",
      icon: <Star className="w-3.5 h-3.5 mr-1" />,
    },
    Borderline: {
      color: "bg-amber-100 text-amber-700",
      icon: <HeartPulse className="w-3.5 h-3.5 mr-1" />,
    },
    Antisocial: {
      color: "bg-green-100 text-green-700",
      icon: <ShieldAlert className="w-3.5 h-3.5 mr-1" />,
    },
    "": {
      color: "bg-gray-100 text-gray-500",
      icon: <HelpCircle className="w-3.5 h-3.5 mr-1" />,
    },
  };

  // Helper function to get the checked value for radio inputs
  const getCheckedValue = (questionId, value) => {
    const subQuestions = [34, 35, 36, 37, 38, 39];

    if (subQuestions.includes(questionId)) {
      return pdqSubQuestions[questionId] === value;
    } else {
      return answers[`pdq_4-${questionId}`] === value;
    }
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title="Bagian 3"
        description={instructions}
        progress={progress}
      />

      {questions.map((q, index) => {
        const isSub = q.parentId !== undefined;
        const labelInfo = labelMeta[q.label] || labelMeta[""];

        if (q.isInstruction) {
          return (
            <div
              key={q.id}
              className="p-4 rounded bg-yellow-50 border-l-4 border-yellow-400 shadow"
            >
              <p className="font-semibold text-gray-700">
                {q.id}. {q.text}
              </p>
            </div>
          );
        }

        return (
          <div
            key={q.id}
            className={`relative border p-4 pt-8 pr-20 rounded shadow ${
              isSub ? "ml-6 border-dashed border-gray-300" : ""
            }`}
          >
            <p className="mb-4 text-sm text-gray-800">
              {q.id}. {q.text}
            </p>
            <div className="flex justify-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`pdq_4-${q.id}`}
                  value="true"
                  checked={getCheckedValue(q.id, "true")}
                  onChange={() => handleChange(q.id, "true")}
                  className="w-4 h-4"
                />
                <span className="text-sm">{scale.labels.true}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`pdq_4-${q.id}`}
                  value="false"
                  checked={getCheckedValue(q.id, "false")}
                  onChange={() => handleChange(q.id, "false")}
                  className="w-4 h-4"
                />
                <span className="text-sm">{scale.labels.false}</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect } from "react";
import pdqData from "../../../data/questions/pdqQuestion.json";
import TestHeader from "@/components/Test/TestHeader";
import { Flame, Star, HeartPulse, ShieldAlert, HelpCircle } from "lucide-react";
import { PDQ_SCORING } from "../../constants/inference/pdqInference";

export default function PdqScale({
  questions,
  answers,
  setAnswers,
  totalQuestions,
  pdqSubQuestions, // Persistent sub-questions from parent
  onSubQuestionChange, // Callback to update individual sub-question
}) {
  const { scale, name, instructions } = pdqData;

  const calculateScore = (rawValue) => {
    return PDQ_SCORING.SCALE_MAPPING[rawValue] || 0;
  };

  // Function to get the raw value from the stored score
  const getRawValueFromScore = (score) => {
    if (score === undefined) return undefined;

    // Find the key that maps to this score
    return Object.keys(PDQ_SCORING.SCALE_MAPPING).find((key) => PDQ_SCORING.SCALE_MAPPING[key] === score);
  };

  const handleChange = (questionId, rawValue) => {
    const subQuestions = [34, 35, 36, 37, 38, 39];

    if (subQuestions.includes(questionId)) {
      // Store sub-question answers in parent's persistent state (these don't get scored)
      onSubQuestionChange(questionId, rawValue);
    } else {
      // Calculate score and store in main state
      const score = calculateScore(rawValue);
      setAnswers((prev) => ({
        ...prev,
        [`pdq_4-${questionId}`]: score,
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
      const currentScore = answers[`pdq_4-33`];
      const targetRawValue = shouldBeTrue ? "true" : "false";
      const targetScore = calculateScore(targetRawValue);

      // Only update if the score needs to change
      if (currentScore !== targetScore) {
        setAnswers((prev) => ({
          ...prev,
          [`pdq_4-33`]: targetScore,
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
  const getCheckedValue = (questionId, rawValue) => {
    const subQuestions = [34, 35, 36, 37, 38, 39];

    if (subQuestions.includes(questionId)) {
      return pdqSubQuestions[questionId] === rawValue;
    } else {
      const currentScore = answers[`pdq_4-${questionId}`];
      const currentRawValue = getRawValueFromScore(currentScore);
      return currentRawValue === rawValue;
    }
  };

  // Helper function to get radio button labels
  const getRadioLabels = (questionId) => {
    const subQuestions = [34, 35, 36, 37, 38, 39];

    if (subQuestions.includes(questionId)) {
      return {
        true: "pernah",
        false: "tidak pernah",
      };
    } else {
      return {
        true: scale.labels.true,
        false: scale.labels.false,
      };
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
        const radioLabels = getRadioLabels(q.id);

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
            className={`relative border p-4 pt-8 rounded shadow ${isSub ? "border-dashed border-gray-300" : ""}`}
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
                <span className="text-sm">{radioLabels.true}</span>
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
                <span className="text-sm">{radioLabels.false}</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

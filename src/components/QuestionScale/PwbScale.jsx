import React from "react";
import pwbData from "../../../data/questions/pwbQuestion.json";
import TestHeader from "@/components/Test/TestHeader";
import { PWB_SCORING } from "../../constants/inference/pwbInference";

export default function PwbScale({ answers, setAnswers, currentPage, questionsPerPage = 10 }) {
  const scaleLabels = pwbData.scale.labels;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = pwbData.questions.slice(startIndex, endIndex);

  const calculateScore = (question, rawValue) => {
    if (question.label === "favorable") {
      // For favorable items: use direct mapping
      return PWB_SCORING.SCALE_MAPPING.FAVORABLE[rawValue] || 0;
    } else if (question.label === "unfavorable") {
      // For unfavorable items: use reverse mapping
      return PWB_SCORING.SCALE_MAPPING.UNFAVORABLE[rawValue] || 0;
    }
    return 0;
  };

  // Function to get the raw value from the stored score
  const getRawValueFromScore = (question, score) => {
    if (score === undefined) return undefined;
    
    if (question.label === "favorable") {
      // Find the key that maps to this score in favorable mapping
      return Object.keys(PWB_SCORING.SCALE_MAPPING.FAVORABLE).find(
        key => PWB_SCORING.SCALE_MAPPING.FAVORABLE[key] === score
      );
    } else if (question.label === "unfavorable") {
      // Find the key that maps to this score in unfavorable mapping
      return Object.keys(PWB_SCORING.SCALE_MAPPING.UNFAVORABLE).find(
        key => PWB_SCORING.SCALE_MAPPING.UNFAVORABLE[key] === score
      );
    }
    return undefined;
  };

  const handleChange = (question, rawValue) => {
    const score = calculateScore(question, rawValue);
    setAnswers((prev) => ({ ...prev, [`pwb-${question.id}`]: score }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title="Bagian 2"
        description={pwbData.instructions}
        progress={Math.round(
          (Object.keys(answers).filter((key) => key.startsWith("pwb-")).length / pwbData.questions.length) * 100
        )}
      />

      {currentQuestions.map((q) => {
        const currentScore = answers[`pwb-${q.id}`];
        const currentRawValue = getRawValueFromScore(q, currentScore);

        return (
          <div
            key={q.id}
            className="bg-white p-4 rounded-xl shadow border relative"
          >
            <p className="mb-2 font-medium">
              {q.id}. {q.text}
            </p>
            <div className="flex gap-2 justify-between text-xs">
              {Object.keys(scaleLabels).map((val) => (
                <label
                  key={val}
                  className="flex flex-col items-center w-full cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`pwb-${q.id}`}
                    value={val}
                    checked={currentRawValue === val}
                    onChange={() => handleChange(q, val)}
                  />
                  <span className="mt-1">{scaleLabels[val]}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import hfsData from "../../../data/questions/hfsQuestion.json";
import TestHeader from "@/components/Test/TestHeader";

export default function HfsScale({ questions, answers, setAnswers, totalQuestions }) {
  const scaleValues = [1, 2, 3, 4, 5, 6, 7];
  const scaleLabels = {
    1: "Sangat tidak sesuai",
    3: "Agak tidak sesuai",
    5: "Agak sesuai",
    7: "Sangat sesuai",
  };

  const calculateScore = (question, rawValue) => {
    if (question.label === "favorable") {
      // For favorable items: score = answer value
      return rawValue;
    } else if (question.label === "unfavorable") {
      // For unfavorable items: reverse scoring (1->7, 2->6, 3->5, 4->4, 5->3, 6->2, 7->1)
      return 8 - rawValue;
    }
    return rawValue;
  };

  const handleChange = (question, rawValue) => {
    const score = calculateScore(question, rawValue);
    setAnswers((prev) => ({ ...prev, [`hfs-${question.id}`]: score }));
  };

  // Function to get the raw value from the stored score
  const getRawValueFromScore = (question, score) => {
    if (score === undefined) return undefined;
    
    if (question.label === "favorable") {
      return score;
    } else if (question.label === "unfavorable") {
      return 8 - score;
    }
    return score;
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title="Bagian 1"
        description={hfsData.instructions}
        progress={Math.round(
          (Object.keys(answers).filter((key) => key.startsWith("hfs-")).length / totalQuestions) * 100
        )}
      />

      {questions.map((q) => {
        const currentScore = answers[`hfs-${q.id}`];
        const currentRawValue = getRawValueFromScore(q, currentScore);

        return (
          <div
            key={q.id}
            className="bg-white p-4 rounded-xl shadow border"
          >
            <p className="mb-2 font-medium">
              {q.id}. {q.text}
            </p>
            <div className="flex gap-2 justify-between text-xs">
              {scaleValues.map((val) => (
                <label
                  key={val}
                  className="flex flex-col items-center w-full cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`hfs-${q.id}`}
                    value={val}
                    checked={currentRawValue === val}
                    onChange={() => handleChange(q, val)}
                  />
                  <span className="mt-1">{scaleLabels[val] || ""}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

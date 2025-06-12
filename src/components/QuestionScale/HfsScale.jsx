import React from "react";
import hfsData from "../../../data/questions/hfsQuestion.json"; // sesuaikan path
import TestHeader from "@/components/test/TestHeader";

export default function HfsScale({
  answers,
  setAnswers,
  currentPage,
  questionsPerPage = 10,
  timeElapsed,
}) {
  const scaleValues = [1, 2, 3, 4, 5, 6, 7];
  const scaleLabels = {
    1: "Sangat tidak sesuai",
    3: "Agak tidak sesuai",
    5: "Agak sesuai",
    7: "Sangat sesuai",
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = hfsData.questions.slice(startIndex, endIndex);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title={hfsData.name}
        description={hfsData.instructions}
        timeElapsed={timeElapsed}
        progress={Math.round(
          (Object.keys(answers).length / hfsData.questions.length) * 100
        )}
      />

      {currentQuestions.map((q) => (
        <div key={q.id} className="bg-white p-4 rounded-xl shadow border">
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
                  name={`question-${q.id}`}
                  value={val}
                  checked={answers[q.id] === val}
                  onChange={() => handleChange(q.id, val)}
                />
                <span className="mt-1">{scaleLabels[val] || ""}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

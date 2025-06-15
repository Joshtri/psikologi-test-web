import React from "react";
import hfsData from "../../../data/questions/hfsQuestion.json";
import TestHeader from "@/components/Test/TestHeader";

export default function HfsScale({
  questions,
  answers,
  setAnswers,
  timeElapsed,
  totalQuestions,
}) {
  const scaleValues = [1, 2, 3, 4, 5, 6, 7];
  const scaleLabels = {
    1: "Sangat tidak sesuai",
    3: "Agak tidak sesuai",
    5: "Agak sesuai",
    7: "Sangat sesuai",
  };


  const handleChange = (id, value) => {
    const key = `hfs-${id}`; // 👈 penting!
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title={hfsData.name}
        description={hfsData.instructions}
        timeElapsed={timeElapsed}
        progress={Math.round(
          (Object.keys(answers).length / totalQuestions) * 100
        )}
      />

      {questions.map((q) => (
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
                  checked={answers[`hfs-${q.id}`] === val}
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

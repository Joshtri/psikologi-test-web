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

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [`hfs-${id}`]: value }));
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

      {questions.map((q) => (
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

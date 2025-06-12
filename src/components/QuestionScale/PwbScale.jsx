import React from "react";
import pwbData from "../../../data/questions/pwbQuestion.json"; // sesuaikan path jika beda
import TestHeader from "@/components/test/TestHeader";

export default function PwbScale({
  answers,
  setAnswers,
  currentPage,
  questionsPerPage = 10,
  timeElapsed,
}) {
  const scaleLabels = pwbData.scale.labels;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = pwbData.questions.slice(startIndex, endIndex);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title={pwbData.name}
        description={pwbData.instructions}
        timeElapsed={timeElapsed}
        progress={Math.round(
          (Object.keys(answers).length / pwbData.questions.length) * 100
        )}
      />

      {currentQuestions.map((q) => (
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
                  name={`question-${q.id}`}
                  value={val}
                  checked={answers[q.id] === val}
                  onChange={() => handleChange(q.id, val)}
                />
                <span className="mt-1">{scaleLabels[val]}</span>
              </label>
            ))}
          </div>
          {/* <div className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600 font-medium">
            {q.category}
          </div> */}
        </div>
      ))}
    </div>
  );
}

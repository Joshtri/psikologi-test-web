import React from "react";
import aceData from "../../../data/questions/aceQuestion.json";
import TestHeader from "@/components/Test/TestHeader";

export default function AceScale({
  questions,
  answers,
  setAnswers,
}) {
  const { name, sections } = aceData;

  const progress = Math.round(
    (Object.keys(answers).filter((key) => key.startsWith("ace-")).length /
      sections.reduce((acc, s) => acc + s.questions.length, 0)) *
      100
  );

  // Group questions by section
  const groupedSections = sections
    .map((section) => {
      const matchedQuestions = section.questions.filter((q) =>
        questions.some((currentQ) => currentQ.id === q.id)
      );
      return matchedQuestions.length > 0
        ? { ...section, questions: matchedQuestions }
        : null;
    })
    .filter(Boolean); // remove null sections

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`ace-${questionId}`]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title={name}
        description="Jawaban berdasarkan pengalaman hingga usia 18 tahun."
        progress={progress}
      />

      {groupedSections.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <div className="p-4 rounded bg-blue-50 border-l-4 border-blue-400 shadow-sm">
            <h2 className="font-semibold text-blue-900">{section.title}</h2>
            <p className="text-sm text-blue-800">{section.instructions}</p>
          </div>

          {section.questions.map((q) => (
            <div
              key={q.id}
              className="border p-4 pt-6 rounded relative shadow bg-white"
            >
              <p className="mb-2 text-sm text-gray-800">
                {q.id}. {q.text}
              </p>

              <div className="flex flex-wrap gap-4">
                {Object.keys(q.scoring).map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`ace-${q.id}`}
                      value={option}
                      checked={answers[`ace-${q.id}`] === option}
                      onChange={() => handleChange(q.id, option)}
                      className="accent-blue-600"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

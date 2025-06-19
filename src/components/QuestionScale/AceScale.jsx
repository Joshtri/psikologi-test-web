import React from "react";
import aceData from "../../../data/questions/aceQuestion.json";
import TestHeader from "@/components/Test/TestHeader";
import { ACE_SCORING } from "../../constants/inference/aceInference";

export default function AceScale({ questions, answers, setAnswers }) {
  const { name, sections } = aceData;

  // Count only the score answers, not raw values
  const progress = Math.round(
    (Object.keys(answers).filter((key) => key.startsWith("ace-") && !key.includes("-raw")).length /
      sections.reduce((acc, s) => acc + s.questions.length, 0)) *
      100
  );

  // Group questions by section
  const groupedSections = sections
    .map((section) => {
      const matchedQuestions = section.questions.filter((q) => questions.some((currentQ) => currentQ.id === q.id));
      return matchedQuestions.length > 0 ? { ...section, questions: matchedQuestions } : null;
    })
    .filter(Boolean); // remove null sections

  // Store selected raw values in component state to manage UI
  const [selectedValues, setSelectedValues] = React.useState({});

  const calculateScore = (question, rawValue) => {
    // Special handling for question 19 (Household member treated violently)
    if (question.id === 19 && question.category === "Household member treated violently") {
      return ACE_SCORING.QUESTION_19_SCORING[rawValue] || 0;
    } else {
      // Use the category's scoring system
      const categoryScoring = ACE_SCORING.CATEGORY_SCORING[question.category];
      if (categoryScoring) {
        return categoryScoring[rawValue] || 0;
      }
    }
    return 0;
  };

  const handleChange = (question, rawValue) => {
    const score = calculateScore(question, rawValue);

    // Update local state for UI
    setSelectedValues((prev) => ({
      ...prev,
      [question.id]: rawValue,
    }));

    // Only store the calculated score
    setAnswers((prev) => ({
      ...prev,
      [`ace-${question.id}`]: score,
    }));
  };

  return (
    <div className="space-y-6">
      <TestHeader
        title="Bagian 4"
        description="Jawaban berdasarkan pengalaman hingga usia 18 tahun."
        progress={progress}
      />

      {groupedSections.map((section, idx) => (
        <div
          key={idx}
          className="space-y-4"
        >
          <div className="p-4 rounded bg-blue-50 border-l-4 border-blue-400 shadow-sm">
            <p className="text-sm text-blue-800">{section.instructions}</p>
          </div>

          {section.questions.map((q) => {
            const currentRawValue = selectedValues[q.id];

            return (
              <div
                key={q.id}
                className="border p-4 pt-6 rounded relative shadow bg-white"
              >
                <p className="mb-2 text-sm text-gray-800">
                  {q.id}. {q.text}
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  {Object.keys(q.scoring).map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name={`ace-${q.id}`}
                        value={option}
                        checked={currentRawValue === option}
                        onChange={() => handleChange(q, option)}
                        className="accent-blue-600"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

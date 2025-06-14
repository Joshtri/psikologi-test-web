import React from "react";
import pdqData from "../../../data/questions/pdqQuestion.json";
import TestHeader from "@/components/Test/TestHeader";
import { Flame, Star, HeartPulse, ShieldAlert, HelpCircle } from "lucide-react";

export default function PdqScale({
  questions,
  answers,
  setAnswers,
  timeElapsed,
  totalQuestions,
}) {
  const { scale, name, instructions } = pdqData;

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`pdq_4-${questionId}`]: value,
    }));
  };

  const progress = Math.round(
    (Object.keys(answers).filter((key) => key.startsWith("pdq_4-")).length /
      totalQuestions) *
      100
  );

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

  return (
    <div className="space-y-6">
      <TestHeader
        title={name}
        description={instructions}
        progress={progress}
        timeElapsed={timeElapsed}
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
                {index + 1}. {q.text}
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
            <p className="mb-2 text-sm text-gray-800">
              {index + 1}. {q.text}
            </p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={`pdq_4-${q.id}`}
                  value="true"
                  checked={answers[`pdq_4-${q.id}`] === "true"}
                  onChange={() => handleChange(q.id, "true")}
                />{" "}
                {scale.labels.true}
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdq_4-${q.id}`}
                  value="false"
                  checked={answers[`pdq_4-${q.id}`] === "false"}
                  onChange={() => handleChange(q.id, "false")}
                />{" "}
                {scale.labels.false}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

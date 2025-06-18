import { Card } from "flowbite-react";
import { useMemo } from "react";
import pwbData from "../../../data/questions/pwbQuestion.json";
import { PWB_SCORING, getPwbInterpretation } from "../../constants/inference/pwbInference";

export default function PwbInference({ answers }) {
  const pwbScore = useMemo(() => {
    // Extract PWB answers from the answers object (now they're already scores)
    const pwbAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("pwb-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("pwb-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    let totalScore = 0;

    // Calculate total score - scores are already calculated, just sum them up
    pwbData.questions.forEach((question) => {
      const score = pwbAnswers[question.id];
      if (score !== undefined) {
        totalScore += score;
      }
    });

    return {
      total: totalScore,
      maxPossible: PWB_SCORING.MAX_SCORES.TOTAL,
    };
  }, [answers]);

  const interpretation = getPwbInterpretation(pwbScore.total);

  // Function to get custom background color
  const getCustomBg = (bgClass) => {
    if (bgClass === "bg-red-50") return { backgroundColor: "#EB5A3C" };
    if (bgClass === "bg-yellow-50") return { backgroundColor: "#F3C623" };
    if (bgClass === "bg-green-50") return { backgroundColor: "#89AC46" };
    return {};
  };

  return (
    <Card className="mb-6 shadow-lg border-2 border-gray-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h3 className="text-2xl font-bold text-black mb-2">Bagian 2</h3>
        </div>

        {/* PWB Score Card */}
        <div className="space-y-4">
          <div
            className="rounded-lg p-6 shadow-sm"
            style={getCustomBg(interpretation.bg)}
          >
            <h4 className="text-xl font-semibold text-black">{interpretation.interpretation}</h4>
          </div>
        </div>
      </div>
    </Card>
  );
}

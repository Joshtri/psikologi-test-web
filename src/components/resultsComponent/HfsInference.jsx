import { Card } from "flowbite-react";
import { useMemo } from "react";
import hfsData from "../../../data/questions/hfsQuestion.json";
import { HFS_SCORING, getSubscaleInterpretation, getTotalInterpretation } from "../../constants/inference/hfsInference";

export default function HfsInference({ answers }) {
  const hfsScores = useMemo(() => {
    // Extract HFS answers from the answers object
    const hfsAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("hfs-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("hfs-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    // Initialize scores for each subscale
    const scores = {
      self: 0,
      others: 0,
      situation: 0,
    };

    // Calculate scores for each subscale
    hfsData.questions.forEach((question) => {
      const answer = hfsAnswers[question.id];
      if (answer !== undefined) {
        let score;

        if (question.label === "favorable") {
          // For favorable items: score = answer value
          score = answer;
        } else if (question.label === "unfavorable") {
          // For unfavorable items: reverse scoring (1->7, 2->6, 3->5, 4->4, 5->3, 6->2, 7->1)
          score = 8 - answer;
        }

        // Add to appropriate subscale
        scores[question.subscale] += score;
      }
    });

    // Calculate total score
    const totalScore = scores.self + scores.others + scores.situation;

    return {
      self: scores.self,
      others: scores.others,
      situation: scores.situation,
      total: totalScore,
      maxPossiblePerSubscale: HFS_SCORING.MAX_SCORES.PER_SUBSCALE,
      maxPossibleTotal: HFS_SCORING.MAX_SCORES.TOTAL,
    };
  }, [answers]);

  const selfInterpretation = getSubscaleInterpretation(hfsScores.self, "self");
  const othersInterpretation = getSubscaleInterpretation(hfsScores.others, "others");
  const situationInterpretation = getSubscaleInterpretation(hfsScores.situation, "situation");
  const totalInterpretation = getTotalInterpretation(hfsScores.total);

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
          <h3 className="text-2xl font-bold text-black mb-2">Bagian 1</h3>
        </div>

        {/* Four Cards Layout - Each in own row */}
        <div className="space-y-4">
          {/* Total Score Card */}
          <div
            className="rounded-lg p-6 shadow-sm"
            style={getCustomBg(totalInterpretation.bg)}
          >
            <h4 className="text-xl font-semibold text-black mb-4">Skor Total</h4>
            <p className="text-gray-950 text-lg leading-relaxed">{totalInterpretation.interpretation}</p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-600 text-sm font-medium">dengan rincian</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Self Forgiveness Card */}
          <div
            className="rounded-lg p-6 shadow-sm"
            style={getCustomBg(selfInterpretation.bg)}
          >
            <h4 className="text-xl font-semibold text-black mb-3">Pemaafan Diri</h4>
            <p className="text-gray-950 text-lg">{selfInterpretation.interpretation}</p>
          </div>

          {/* Others Forgiveness Card */}
          <div
            className="rounded-lg p-6 shadow-sm"
            style={getCustomBg(othersInterpretation.bg)}
          >
            <h4 className="text-xl font-semibold text-black mb-3">Pemaafan Orang Lain</h4>
            <p className="text-gray-950 text-lg">{othersInterpretation.interpretation}</p>
          </div>

          {/* Situation Forgiveness Card */}
          <div
            className="rounded-lg p-6 shadow-sm"
            style={getCustomBg(situationInterpretation.bg)}
          >
            <h4 className="text-xl font-semibold text-black mb-3">Pemaafan Situasi</h4>
            <p className="text-gray-950 text-lg">{situationInterpretation.interpretation}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

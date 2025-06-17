import { Card } from "flowbite-react";
import { useMemo } from "react";
import pdqData from "../../../data/questions/pdqQuestion.json";
import { PDQ_SCORING, PDQ_INTERPRETATIONS, getPdqInterpretation } from "../../constants/inference/pdqInference";

export default function PdqInference({ answers }) {
  const pdqResults = useMemo(() => {
    // Extract PDQ answers from the answers object
    const pdqAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("pdq_4-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("pdq_4-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    // Initialize scores for each label
    const labelScores = {};

    // Calculate scores for each label
    pdqData.questions.forEach((question) => {
      // Skip questions with parentId (34-39) as they don't count toward label scores
      if (question.parentId) {
        return;
      }

      const answer = pdqAnswers[question.id];
      if (answer !== undefined && question.label) {
        let score = PDQ_SCORING.SCALE_MAPPING[answer] || 0;

        if (!labelScores[question.label]) {
          labelScores[question.label] = 0;
        }
        labelScores[question.label] += score;
      }
    });

    // Get disorders that meet the threshold
    const disordersFound = getPdqInterpretation(labelScores);

    return {
      labelScores,
      disordersFound,
      hasDisorders: disordersFound.length > 0,
    };
  }, [answers]);

  // Function to get custom background color for disorders
  const getDisorderBg = (disorder) => {
    return { backgroundColor: PDQ_INTERPRETATIONS.DISORDER_COLORS[disorder] || "#F3C623" };
  };

  // Function to get custom background color for no disorder
  const getNoDisorderBg = () => {
    return { backgroundColor: "#89AC46" };
  };

  return (
    <Card className="mb-6 shadow-lg border-2 border-gray-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h3 className="text-2xl font-bold text-black mb-2">Bagian 3</h3>
        </div>

        {/* PDQ Results */}
        <div className="space-y-4">
          {pdqResults.hasDisorders ? (
            // Show disorder cards
            pdqResults.disordersFound.map((disorder, index) => (
              <div
                key={index}
                className="rounded-lg p-6 shadow-sm"
                style={getDisorderBg(disorder)}
              >
                <h4 className="text-xl font-semibold text-black">Anda terindikasi disorder {disorder}</h4>
              </div>
            ))
          ) : (
            // Show no disorder card
            <div
              className="rounded-lg p-6 shadow-sm"
              style={getNoDisorderBg()}
            >
              <h4 className="text-xl font-semibold text-black mb-4">Personality Diagnostic Questionnaire (PDQ-4)</h4>
              <p className="text-gray-950 leading-relaxed">{PDQ_INTERPRETATIONS.NO_DISORDER.interpretation}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

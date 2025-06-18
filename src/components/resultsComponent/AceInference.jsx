import { Card } from "flowbite-react";
import { useMemo } from "react";
import aceData from "../../../data/questions/aceQuestion.json";
import { ACE_SCORING, ACE_INTERPRETATIONS, getAceInterpretation } from "../../constants/inference/aceInference";

export default function AceInference({ answers }) {
  const aceResults = useMemo(() => {
    // Extract ACE answers from the answers object (now they're already scores)
    const aceAnswers = Object.entries(answers)
      .filter(([key]) => key.startsWith("ace-"))
      .reduce((acc, [key, value]) => {
        const questionId = parseInt(key.replace("ace-", ""));
        acc[questionId] = value;
        return acc;
      }, {});

    // Initialize scores for each category
    const categoryScores = {};

    // Get all questions from all sections
    const allQuestions = aceData.sections.flatMap((section) => section.questions);

    // Calculate scores for each category
    allQuestions.forEach((question) => {
      const score = aceAnswers[question.id];
      if (score !== undefined && question.category) {
        // Score is already calculated, just add to category
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = 0;
        }
        categoryScores[question.category] += score;
      }
    });

    // Get categories that meet the threshold
    const experiencedCategories = getAceInterpretation(categoryScores);

    return {
      categoryScores,
      experiencedCategories,
      hasExperiences: experiencedCategories.length > 0,
    };
  }, [answers]);

  // Function to get custom background color
  const getCustomBg = (bgClass) => {
    if (bgClass === "bg-red-50") return { backgroundColor: "#EB5A3C" };
    if (bgClass === "bg-green-50") return { backgroundColor: "#89AC46" };
    return {};
  };

  return (
    <Card className="mb-6 shadow-lg border-2 border-gray-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h3 className="text-2xl font-bold text-black mb-2">Bagian 4</h3>
        </div>

        {/* ACE Results */}
        <div className="space-y-4">
          {aceResults.hasExperiences ? (
            <div
              className="rounded-lg p-6 shadow-sm"
              style={getCustomBg(ACE_INTERPRETATIONS.HAS_EXPERIENCES.bg)}
            >
              <p className="text-gray-950 text-xl font-semibold leading-relaxed mb-3">
                Anda pernah melewati pengalaman:
              </p>
              <ul className="text-gray-950 leading-relaxed space-y-1">
                {aceResults.experiencedCategories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-start text-lg"
                  >
                    <span className="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className="rounded-lg p-6 shadow-sm"
              style={getCustomBg(ACE_INTERPRETATIONS.NO_EXPERIENCES.bg)}
            >
              <h4 className="text-xl font-semibold text-black mb-4">Adverse Childhood Experiences (ACE)</h4>
              <p className="text-gray-950 leading-relaxed">{ACE_INTERPRETATIONS.NO_EXPERIENCES.interpretation}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

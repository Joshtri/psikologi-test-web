import aceData from "../../../data/questions/aceQuestion.json";

export default function AceRespondentResult({ respondent }) {
  const renderCategoryQuestions = (category, answers) => {
    // Get all questions from all sections that match the category
    const questions = [];
    aceData.sections.forEach((section) => {
      const categoryQuestions = section.questions.filter((q) => q.category === category);
      questions.push(...categoryQuestions);
    });

    if (questions.length === 0) return null;

    return (
      <div className="mt-3">
        <h5 className="font-semibold text-gray-800 mb-1">Kategori: {category}</h5>
        <table className="w-full border text-sm bg-white rounded shadow table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-1 border w-16">No</th>
              <th className="px-3 py-1 border">Pernyataan</th>
              <th className="px-3 py-1 border w-24">Jawaban</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td className="px-3 py-1 border w-16">{q.id}</td>
                <td className="px-3 py-1 border break-words">{q.text}</td>
                <td className="px-3 py-1 border w-20 text-center">{answers[`ace-${q.id}`] ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const categoryNames = [
    "Emotional Neglect",
    "Physical Neglect",
    "Emotional Abuse",
    "Physical Abuse",
    "Contact Sexual Abuse",
    "Alcohol and/or drug abuser in the household",
    "Someone chronically depressed, mentally ill, institutionalized, or suicidal",
    "Incarcerated household member",
    "One or no parents, parental separation, or divorce",
    "Household member treated violently",
    "Bullying",
    "Community Violence",
    "Collective Violence",
  ];

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700">Detail Skor ACE:</h4>
      <ul className="list-disc list-inside text-gray-600 text-sm">
        {categoryNames.map((category) => (
          <li key={category}>
            <strong>{category}:</strong> {respondent.summary?.ace?.categoryScores?.[category] ?? "-"}
          </li>
        ))}
      </ul>

      {respondent.summary?.ace?.inference && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            <strong>Interpretasi:</strong> {respondent.summary.ace.inference}
          </p>
        </div>
      )}

      {/* Table for each category */}
      {categoryNames.map((category) => renderCategoryQuestions(category, respondent.answers))}
    </div>
  );
}

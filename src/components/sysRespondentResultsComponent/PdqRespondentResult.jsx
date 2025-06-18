import pdqData from "../../../data/questions/pdqQuestion.json";

export default function PdqRespondentResult({ respondent }) {
  const renderLabelQuestions = (label, answers) => {
    const questions = pdqData.questions.filter((q) => q.label === label && q.text && !q.isInstruction);

    return (
      <div className="mt-3">
        <h5 className="font-semibold text-gray-800 mb-1">Kategori: {label}</h5>
        <table className="w-full border text-sm bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-1 border">No</th>
              <th className="px-3 py-1 border">Pernyataan</th>
              <th className="px-3 py-1 border">Jawaban</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td className="px-3 py-1 border w-16">{q.id}</td>
                <td className="px-3 py-1 border">{q.text}</td>
                <td className="px-3 py-1 border w-24">{answers[`pdq_4-${q.id}`]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700">Detail Skor PDQ:</h4>
      <ul className="list-disc list-inside text-gray-600 text-sm">
        <li>
          <strong>Histrionik:</strong> {respondent.summary?.pdq?.labelScores?.Histrionik ?? "-"}
        </li>
        <li>
          <strong>Narcissistic:</strong> {respondent.summary?.pdq?.labelScores?.Narcissistic ?? "-"}
        </li>
        <li>
          <strong>Borderline:</strong> {respondent.summary?.pdq?.labelScores?.Borderline ?? "-"}
        </li>
        <li>
          <strong>Antisocial:</strong> {respondent.summary?.pdq?.labelScores?.Antisocial ?? "-"}
        </li>
      </ul>

      {respondent.summary?.pdq?.inference && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            <strong>Interpretasi:</strong> {respondent.summary.pdq.inference}
          </p>
        </div>
      )}

      {/* Table for each label */}
      {renderLabelQuestions("Histrionik", respondent.answers)}
      {renderLabelQuestions("Narcissistic", respondent.answers)}
      {renderLabelQuestions("Borderline", respondent.answers)}
      {renderLabelQuestions("Antisocial", respondent.answers)}
    </div>
  );
}

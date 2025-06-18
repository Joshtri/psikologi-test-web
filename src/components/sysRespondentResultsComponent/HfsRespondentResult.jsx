import hfsData from "../../../data/questions/hfsQuestion.json";

export default function HfsRespondentResult({ respondent }) {
  const renderSubscaleQuestions = (subscale, answers) => {
    const questions = hfsData.questions.filter((q) => q.subscale === subscale);

    return (
      <div className="mt-3">
        <h5 className="font-semibold text-gray-800 capitalize mb-1">Skala: {subscale}</h5>
        <table className="w-full border text-sm bg-white rounded shadow">
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
                <td className="px-3 py-1 border">{q.id}</td>
                <td className="px-3 py-1 border">{q.text}</td>
                <td className="px-3 py-1 border">{answers[`hfs-${q.id}`] ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700">Detail Skor HFS:</h4>
      <ul className="list-disc list-inside text-gray-600 text-sm">
        <li>
          <strong>Self:</strong> {respondent.summary?.hfs?.self?.value ?? "-"} –{" "}
          {respondent.summary?.hfs?.self?.inference ?? "-"}
        </li>
        <li>
          <strong>Others:</strong> {respondent.summary?.hfs?.others?.value ?? "-"} –{" "}
          {respondent.summary?.hfs?.others?.inference ?? "-"}
        </li>
        <li>
          <strong>Situation:</strong> {respondent.summary?.hfs?.situation?.value ?? "-"} –{" "}
          {respondent.summary?.hfs?.situation?.inference ?? "-"}
        </li>
      </ul>

      {/* Table for each subscale */}
      {renderSubscaleQuestions("self", respondent.answers)}
      {renderSubscaleQuestions("others", respondent.answers)}
      {renderSubscaleQuestions("situation", respondent.answers)}
    </div>
  );
}

import pwbData from "../../../data/questions/pwbQuestion.json";

export default function PwbRespondentResult({ respondent }) {
  return (
    <div className="space-y-2 mt-4">
      <h4 className="font-semibold text-gray-700">Detail Skor PWB:</h4>
      <ul className="list-disc list-inside text-gray-600 text-sm">
        <li>
          <strong>Total:</strong> {respondent.summary?.pwb?.total?.value ?? "-"} –{" "}
          {respondent.summary?.pwb?.total?.inference ?? "-"}
        </li>
      </ul>

      {/* Table for all questions */}
      <div className="mt-3">
        <h5 className="font-semibold text-gray-800 mb-1">Semua Pertanyaan PWB</h5>
        <table className="w-full border text-sm bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-1 border">No</th>
              <th className="px-3 py-1 border">Pernyataan</th>
              <th className="px-3 py-1 border">Jawaban</th>
            </tr>
          </thead>
          <tbody>
            {pwbData.questions.map((q) => (
              <tr key={q.id}>
                <td className="px-3 py-1 border">{q.id}</td>
                <td className="px-3 py-1 border">{q.text}</td>
                <td className="px-3 py-1 border">{respondent.answers[`pwb-${q.id}`] ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

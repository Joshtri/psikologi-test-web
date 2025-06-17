"use client";

import { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import Container from "@/components/ui/Container";
import { getRespondents } from "@/services/respondent.service";
import { ChevronDown, ChevronUp } from "lucide-react";
import hfsData from "../../../../data/questions/hfsQuestion.json"; // HFS questions JSON file

export default function RespondentResultsPage() {
  const [respondents, setRespondents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchRespondents = async () => {
    try {
      const data = await getRespondents();
      setRespondents(data);
    } catch (error) {
      console.error("Gagal memuat data responden:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const renderSubscaleQuestions = (subscale, answers) => {
    const questions = hfsData.questions.filter((q) => q.subscale === subscale);

    return (
      <div className="mt-3">
        <h5 className="font-semibold text-gray-800 capitalize mb-1">
          Skala: {subscale}
        </h5>
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
                <td className="px-3 py-1 border">{q.id}</td>
                <td className="px-3 py-1 border">{q.text}</td>
                <td className="px-3 py-1 border">
                  {answers[`hfs-${q.id}`] ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    fetchRespondents();
  }, []);

  return (
    <Container className="py-6">
      <PageBreadcrumb items={[{ label: "Hasil Responden" }]} />
      <h1 className="text-2xl font-bold mb-6">Hasil Responden</h1>

      {isLoading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-700">No</th>
                <th className="px-4 py-2 font-medium text-gray-700">Nama</th>
                <th className="px-4 py-2 font-medium text-gray-700">Usia</th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Jenis Kelamin
                </th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Pendidikan
                </th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Total Skor HFS
                </th>
                <th className="px-4 py-2 font-medium text-gray-700">
                  Interpretasi
                </th>
                <th className="px-4 py-2 font-medium text-gray-700">Tanggal</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-center">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {respondents.map((res, index) => (
                <>
                  <tr key={res.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{res.name}</td>
                    <td className="px-4 py-2">{res.age}</td>
                    <td className="px-4 py-2">{res.gender}</td>
                    <td className="px-4 py-2">{res.educationLevel}</td>
                    <td className="px-4 py-2">
                      {res.summary?.hfs?.total?.value ?? "-"}
                    </td>
                    <td className="px-4 py-2">
                      {res.summary?.hfs?.total?.inference?.slice(0, 60) ?? "-"}
                      ...
                    </td>
                    <td className="px-4 py-2">
                      {new Date(res.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => toggleExpand(res.id)}
                      >
                        {expandedRow === res.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedRow === res.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700">
                            Detail Skor HFS:
                          </h4>
                          <ul className="list-disc list-inside text-gray-600 text-sm">
                            <li>
                              <strong>Self:</strong>{" "}
                              {res.summary?.hfs?.self?.value ?? "-"} –{" "}
                              {res.summary?.hfs?.self?.inference ?? "-"}
                            </li>
                            <li>
                              <strong>Others:</strong>{" "}
                              {res.summary?.hfs?.others?.value ?? "-"} –{" "}
                              {res.summary?.hfs?.others?.inference ?? "-"}
                            </li>
                            <li>
                              <strong>Situation:</strong>{" "}
                              {res.summary?.hfs?.situation?.value ?? "-"} –{" "}
                              {res.summary?.hfs?.situation?.inference ?? "-"}
                            </li>
                          </ul>

                          {/* Table for each subscale */}
                          {renderSubscaleQuestions("self", res.answers)}
                          {renderSubscaleQuestions("others", res.answers)}
                          {renderSubscaleQuestions("situation", res.answers)}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}

import { useLocation } from "react-router-dom";
import { Card } from "flowbite-react";
import HfsInference from "../../components/resultsComponent/HfsInference";
import PwbInference from "../../components/resultsComponent/PwbInference";
import PdqInference from "../../components/resultsComponent/PdqInference";
import AceInference from "../../components/resultsComponent/AceInference";

export default function ResultsPage() {
  const location = useLocation();

  // Get answers from navigation state or from localStorage/sessionStorage if needed
  const answers = location.state?.answers || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hasil Tes Psikologi</h1>
          <p className="text-gray-600">Berikut adalah hasil analisis dari jawaban Anda</p>
        </div>

        <HfsInference answers={answers} />
        <PwbInference answers={answers} />
        <PdqInference answers={answers} />
        <AceInference answers={answers} />

        {/* Information Card */}
        <Card
          className="mb-6 shadow-lg border-2 border-blue-200"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-black mb-2">Informasi Penting</h3>
            </div>

            <div className="space-y-4">
              <p className="text-gray-950 leading-relaxed">
                Ini merupakan screening, bukan diagnosa kondisi mental. Jika ingin mengetahui lebih banyak terkait
                kesehatan mental Anda silahkan melakukan konsultasi dengan tenaga profesional.
              </p>

              <div>
                <h4 className="text-lg font-semibold text-black mb-3">Daftar layanan psikologi di Kota Kupang:</h4>
                <ul className="text-gray-950 leading-relaxed space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Layanan Psikologi Terpadu UNDANA:</strong> 085338585891 (Gratis khusus civitas UNDANA)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Layanan Konseling PKBI NTT:</strong> 082146188168 (Gratis)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Konsultan Psikologi Sepe Growth:</strong> 085808585688
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Klinik Dewanta Kupang:</strong> 081239003006 (BPJS)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Rumah Sejiwa Flobamora:</strong> 082137393200
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      <strong>Lazar.Id Layanan Psikologi:</strong> 085213819096
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

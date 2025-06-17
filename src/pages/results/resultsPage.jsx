import { useLocation } from "react-router-dom";
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
      </div>
    </div>
  );
}

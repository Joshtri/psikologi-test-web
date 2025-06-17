import { useLocation } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

import HfsInference from "../../components/resultsComponent/HfsInference";
import PwbInference from "../../components/resultsComponent/PwbInference";
import PdqInference from "../../components/resultsComponent/PdqInference";
import AceInference from "../../components/resultsComponent/AceInference";

export default function ResultsPage() {
  const location = useLocation();
  const answers = location.state?.answers || {};
  const resultRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const [results, setResults] = useState(null);
  const [respondent, setRespondent] = useState(null);

  useEffect(() => {
    const resultsData = localStorage.getItem("resultsData");
    const respondentData = localStorage.getItem("respondentDraft");

    if (resultsData) {
      setResults(JSON.parse(resultsData));
    }

    if (respondentData) {
      setRespondent(JSON.parse(respondentData));
    }
  }, []);

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      const element = resultRef.current;
      if (!element) throw new Error("Element tidak ditemukan");

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          const imgWidth = pdfWidth;
          const imgHeight = (img.height * imgWidth) / img.width;

          // Jika tinggi melebihi 1 halaman A4
          if (imgHeight > pdfHeight) {
            let position = 0;
            let pageHeightLeft = imgHeight;

            while (pageHeightLeft > 0) {
              pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
              pageHeightLeft -= pdfHeight;
              if (pageHeightLeft > 0) {
                pdf.addPage();
                position -= pdfHeight;
              }
            }
          } else {
            pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
          }

          const fileName = `Hasil_Evaluasi_${
            new Date().toISOString().split("T")[0]
          }.pdf`;
          pdf.save(fileName);
          resolve(true);
        };
      });
    } catch (err) {
      console.error("Gagal konversi ke PDF:", err);
      alert("Export PDF gagal. Pastikan halaman sudah sepenuhnya dimuat.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Tombol Export */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Hasil Tes Psikologi
          </h1>
          <p className="text-gray-600 mb-4">
            Berikut adalah hasil analisis dari jawaban Anda
          </p>

          <Button
            onClick={exportToPDF}
            isProcessing={isExporting}
            disabled={isExporting}
          >
            {isExporting ? "Mengunduh..." : "Unduh Hasil PDF"}
          </Button>
        </div>

        {/* Data Responden */}
        {respondent && (
          <Card className="mb-6 border-blue-300 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-black">Data Responden</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>
                  <strong>Nama:</strong> {respondent.name}
                </li>
                <li>
                  <strong>Jenis Kelamin:</strong> {respondent.gender}
                </li>
                <li>
                  <strong>Tanggal Lahir:</strong> {respondent.dateOfBirth}
                </li>
                <li>
                  <strong>Usia:</strong> {respondent.age} tahun
                </li>
                <li>
                  <strong>Alamat:</strong> {respondent.address}
                </li>
                <li>
                  <strong>Nomor HP:</strong> {respondent.phoneNumber}
                </li>
                <li>
                  <strong>Tingkat Pendidikan:</strong>{" "}
                  {respondent.educationLevel}
                </li>
                <li>
                  <strong>Nama Sekolah:</strong> {respondent.schoolName}
                </li>
                <li>
                  <strong>Tinggal Dengan:</strong> {respondent.livingWith}
                </li>
                <li>
                  <strong>Pekerjaan Orang Tua:</strong>{" "}
                  {respondent.parentOccupation}
                </li>
                <li>
                  <strong>Anak Ke-:</strong> {respondent.birthOrder}
                </li>
                <li>
                  <strong>Suku:</strong> {respondent.ethnicity}
                </li>
              </ul>
            </div>
          </Card>
        )}

        {/* Semua hasil yang ingin diexport */}
        <div ref={resultRef} className="bg-white rounded-lg p-4 space-y-6">
          <HfsInference answers={answers} />
          <PwbInference answers={answers} />
          <PdqInference answers={answers} />
          <AceInference answers={answers} />

          {/* Informasi Penting */}
          <Card
            className="mb-6 shadow-lg border-2 border-blue-200"
            style={{ backgroundColor: "#e3f2fd" }}
          >
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-black mb-2">
                  Informasi Penting
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-950 leading-relaxed">
                  Ini merupakan screening, bukan diagnosa kondisi mental. Jika
                  ingin mengetahui lebih banyak terkait kesehatan mental Anda
                  silahkan melakukan konsultasi dengan tenaga profesional.
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-3">
                    Daftar layanan psikologi di Kota Kupang:
                  </h4>
                  <ul className="text-gray-950 leading-relaxed space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Layanan Psikologi Terpadu UNDANA:</strong>{" "}
                        085338585891
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Layanan Konseling PKBI NTT:</strong>{" "}
                        082146188168
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Konsultan Psikologi Sepe Growth:</strong>{" "}
                        085808585688
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Klinik Dewanta Kupang:</strong> 081239003006
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Rumah Sejiwa Flobamora:</strong> 082137393200
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span>
                        <strong>Lazar.Id Layanan Psikologi:</strong>{" "}
                        085213819096
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

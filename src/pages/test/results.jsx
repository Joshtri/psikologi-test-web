"use client";

import { useEffect, useState } from "react";
import { Download, FileText, User, Calendar } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ResultsPage() {
  const [results, setResults] = useState(null);
  const [respondent, setRespondent] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  

  useEffect(() => {
    const resultsData = localStorage.getItem("testResults");
    const respondentData = localStorage.getItem("respondentDraft");

    if (resultsData) {
      setResults(JSON.parse(resultsData));
    }

    if (respondentData) {
      setRespondent(JSON.parse(respondentData));
    }
  }, []);

  const exportToPDF = () => {
    setIsExporting(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      let yPosition = 30;

      // Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Hasil Evaluasi Psikologi", pageWidth / 2, yPosition, {
        align: "center",
      });

      yPosition += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(
        "RaiReflect - Refleksi Diri Bermakna",
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      yPosition += 20;

      // Data Responden Section
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Data Responden", margin, yPosition);
      yPosition += 10;

      const respondentData = [
        ["Nama", respondent.name],
        ["Usia", `${respondent.age} tahun`],
        ["Jenis Kelamin", respondent.gender],
        ["Pendidikan", respondent.educationLevel],
        ["No. HP", respondent.phoneNumber],
        ["Tanggal Tes", new Date().toLocaleDateString("id-ID")],
      ];

      autoTable(doc, {
        startY: yPosition,
        head: [["Keterangan", "Data"]],
        body: respondentData,
        theme: "grid",
        headStyles: { fillColor: [147, 51, 234], textColor: 255 },
        styles: { fontSize: 10 },
        margin: { left: margin, right: margin },
      });

      yPosition = doc.lastAutoTable.finalY + 20;

      // HFS Results Section
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(
        "Hasil Skala HFS (Heartland Forgiveness Scale)",
        margin,
        yPosition
      );
      yPosition += 10;

      // HFS Total Score
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Skor Total: ${results.hfs.total.value}`, margin, yPosition);
      yPosition += 5;
      doc.setFont("helvetica", "normal");
      const maxWidth = pageWidth - margin * 2;
      doc.text(
        `Interpretasi: ${results.hfs.total.inference}`,
        margin,
        yPosition,
        { maxWidth, align: "left" }
      );
      yPosition += 15;

      // HFS Subscales Table
      const hfsData = [
        [
          "Diri Sendiri (Self)",
          results.hfs.self.value,
          results.hfs.self.inference,
        ],
        [
          "Orang Lain (Others)",
          results.hfs.others.value,
          results.hfs.others.inference,
        ],
        [
          "Keadaan (Situation)",
          results.hfs.situation.value,
          results.hfs.situation.inference,
        ],
      ];

      autoTable(doc, {
        startY: yPosition,
        head: [["Dimensi", "Skor", "Interpretasi"]],
        body: hfsData,
        theme: "striped",
        headStyles: { fillColor: [147, 51, 234], textColor: 255 },
        styles: { fontSize: 10 },
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 30, halign: "center" },
          2: { cellWidth: 80 },
        },
      });

      yPosition = doc.lastAutoTable?.finalY
        ? doc.lastAutoTable.finalY + 20
        : yPosition + 20;

      // Footer
      if (yPosition > doc.internal.pageSize.height - 40) {
        doc.addPage();
        yPosition = 30;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(
        "Dokumen ini dibuat secara otomatis oleh sistem RaiReflect",
        pageWidth / 2,
        yPosition,
        {
          align: "center",
        }
      );
      yPosition += 5;
      doc.text(
        `Tanggal cetak: ${new Date().toLocaleString("id-ID")}`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      // Page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Halaman ${i} dari ${pageCount}`,
          pageWidth - margin,
          doc.internal.pageSize.height - 10,
          {
            align: "right",
          }
        );
      }

      // Save the PDF
      const fileName = `Hasil_Evaluasi_${respondent.name.replace(
        /\s+/g,
        "_"
      )}_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!results || !respondent) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-center space-x-2 text-purple-600">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <span>Memuat hasil...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Hasil Evaluasi Responden
        </h1>
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Mengekspor...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Data Responden */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-lg text-gray-800">
            Data Responden
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama:</span>
              <span className="font-medium">{respondent.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Usia:</span>
              <span className="font-medium">{respondent.age} tahun</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jenis Kelamin:</span>
              <span className="font-medium">{respondent.gender}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Pendidikan:</span>
              <span className="font-medium">{respondent.educationLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">No. HP:</span>
              <span className="font-medium">{respondent.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Tes:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hasil HFS */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-lg text-gray-800">
            Skala HFS (Heartland Forgiveness Scale)
          </h2>
        </div>

        {/* Total Score */}
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-purple-800">
              Skor Total:
            </span>
            <span className="text-2xl font-bold text-purple-600">
              {results.hfs.total.value}
            </span>
          </div>
          <p className="text-purple-700 mt-2">
            <strong>Interpretasi:</strong> {results.hfs.total.inference}
          </p>
        </div>

        {/* Subscales */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800 mb-3">
            Detail per Dimensi:
          </h3>

          <div className="grid gap-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">
                  Diri Sendiri (Self)
                </span>
                <p className="text-sm text-gray-600">
                  {results.hfs.self.inference}
                </p>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {results.hfs.self.value}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">
                  Orang Lain (Others)
                </span>
                <p className="text-sm text-gray-600">
                  {results.hfs.others.inference}
                </p>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {results.hfs.others.value}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">
                  Keadaan (Situation)
                </span>
                <p className="text-sm text-gray-600">
                  {results.hfs.situation.inference}
                </p>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {results.hfs.situation.value}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Print Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800">Informasi</h3>
            <p className="text-sm text-blue-700 mt-1">
              Hasil evaluasi ini dapat diekspor ke format PDF untuk disimpan
              atau dicetak. Klik tombol "Export PDF" di atas untuk mengunduh
              dokumen lengkap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

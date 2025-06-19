"use client";

import { consentItems } from "@/constants/consentItems";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../provider/ToastProvider";

export default function ConsentPage({ onBack }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    participation: false,
    risks: false,
    criteria: false,
    incentive: false,
    confidentiality: false,
    voluntary: false,
    finalConsent: false,
  });

  const handleCheckboxChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleProceed = () => {
    if (allAgreed) {
      showToast({
        type: "success",
        message: "Terima kasih! Anda akan diarahkan ke formulir isian.",
        align: "top-right",
        duration: 3000,
      });
      navigate("/respondent-fill-form"); // ✅ arahkan ke halaman isian
    } else {
      showToast({
        type: "error",
        message: "Mohon centang semua persetujuan untuk melanjutkan.",
        align: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2E3ODJmZiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iNSIvPjxwYXRoIGQ9Ik0xMCAyMEMxNS41MjMgMjAgMjAgMTUuNTIzIDIwIDEwUzE1LjUyMyAwIDEwIDBTMCA0LjQ3NyAwIDEwczQuNDc3IDEwIDEwIDEweiIgc3Ryb2tlPSIjZTlkNWZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-screen-sm sm:max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-t-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 to-amber-600"
          >
            <div className="p-5 sm:p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Informed Consent</h1>
                  <p className="text-white/90">
                    Persetujuan Partisipasi Penelitian Psikologi 2025
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-xl rounded-b-2xl overflow-hidden"
          >
            <div className="p-8">
              {/* Introduction */}
              <div className="mb-8 space-y-6 text-gray-700 text-lg leading-relaxed">
                <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-start">
                    <Info className="w-6 h-6 mr-3 mt-1 text-amber-600" />
                    <div>
                      <p className="text-amber-700">
                        Terima kasih telah mempertimbangkan untuk
                        berpartisipasi. Mohon untuk menandai semua kotak di
                        bawah ini sebagai tanda persetujuan atas pernyataan
                        tertulis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent Items */}
              <div className="space-y-6">
                {consentItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-6 rounded-xl border hover:shadow-md transition-all duration-300 ${
                      agreements[item.key]
                        ? "bg-purple-50 border-purple-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        id={item.key}
                        checked={agreements[item.key]}
                        onChange={() => handleCheckboxChange(item.key)}
                        className="w-5 h-5 mt-1 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <item.icon
                            className={`w-5 h-5 mr-2 ${
                              agreements[item.key]
                                ? "text-purple-600"
                                : "text-gray-500"
                            }`}
                          />
                          <h4
                            className={`font-semibold ${
                              agreements[item.key]
                                ? "text-purple-800"
                                : "text-gray-700"
                            }`}
                          >
                            {item.title}
                          </h4>
                        </div>
                        <label
                          htmlFor={item.key}
                          className="cursor-pointer leading-relaxed text-gray-700"
                        >
                          {item.label}
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Final Consent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="border-t pt-8 mt-8 border-gray-200"
                >
                  <div
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      agreements.finalConsent
                        ? "bg-gradient-to-r from-purple-50 to-amber-50 border-purple-300"
                        : "bg-gray-50 border-gray-300 border-dashed"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-red-500 text-xl font-bold">*</span>
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="finalConsent"
                          checked={agreements.finalConsent}
                          onChange={() => handleCheckboxChange("finalConsent")}
                          className="w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                        />
                        <div>
                          <h4 className="font-bold mb-2 text-purple-800">
                            Persetujuan Final
                          </h4>
                          <label
                            htmlFor="finalConsent"
                            className="cursor-pointer text-lg leading-relaxed text-gray-700"
                          >
                            Saya telah membaca dan memahami informasi pada
                            Lembar Penjelasan Penelitian dan menyetujui untuk
                            berpartisipasi dalam penelitian Psikologi 2025.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Progress Persetujuan
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {Object.values(agreements).filter(Boolean).length} /{" "}
                    {Object.keys(agreements).length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (Object.values(agreements).filter(Boolean).length /
                          Object.keys(agreements).length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row justify-between gap-4 mt-12"
              >
                <Button
                  color="light"
                  size="lg"
                  onClick={onBack}
                  className="px-8 py-3 bg-gray-600 text-gray-700 hover:bg-gray-50 border border-gray-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali
                </Button>

                <Button
                  size="lg"
                  className={`px-8 py-3 transition-all duration-300 ${
                    allAgreed
                      ? "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed text-gray-200"
                  }`}
                  onClick={handleProceed}
                  disabled={!allAgreed}
                >
                  {allAgreed ? (
                    <>
                      Selanjutnya
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Lengkapi Persetujuan
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "../../provider/ToastProvider";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Heart, CheckCircle, ArrowLeft, ArrowRight, Sun, Moon, Info } from "lucide-react";

export default function ConsentPage({ onBack }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [agreements, setAgreements] = useState({
    participation: false,
    risks: false,
    criteria: false,
    incentive: false,
    confidentiality: false,
    voluntary: false,
    finalConsent: false,
  });

  // Check system preference for dark mode on load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
        message: "Terima kasih! Anda akan diarahkan ke tes.",
        align: "top-right",
        duration: 3000,
      });
      navigate("/test/start");
    } else {
      showToast({
        type: "error",
        message: "Mohon centang semua persetujuan untuk melanjutkan.",
        align: "top-right",
        duration: 3000,
      });
    }
  };

  const consentItems = [
    {
      key: "participation",
      icon: Shield,
      title: "Partisipasi Sukarela",
      label:
        "Saya memahami bahwa partisipasi saya bersifat sukarela dan saya bebas untuk mengundurkan diri dari penelitian ini kapanpun, tanpa perlu memberikan alasan apapun, dan tanpa mendapat konsekuensi apapun.",
    },
    {
      key: "risks",
      icon: Info,
      title: "Pemahaman Risiko",
      label:
        "Saya memahami potensi risiko yang mungkin terjadi bila saya berpartisipasi dalam penelitian ini dan bahwa bantuan akan diberikan kepada saya bila mengalami ketidaknyamanan ketika berpartisipasi dalam penelitian ini.",
    },
    {
      key: "criteria",
      icon: CheckCircle,
      title: "Kriteria Partisipan",
      label:
        "Saya memahami kriteria dan karakteristik partisipan yang menjadi syarat berpartisipasi dalam penelitian ini, dan saya memenuhi kriteria tersebut.",
    },
    {
      key: "incentive",
      icon: Heart,
      title: "Insentif Penelitian",
      label:
        "Saya memahami bahwa saya akan mendapatkan insentif berupa finansial sebesar Rp 50,000,- (lima puluh ribu rupiah) dan akses gratis pada artikel ilmiah terkait topik pada studi ini.",
    },
    {
      key: "confidentiality",
      icon: Shield,
      title: "Kerahasiaan Data",
      label:
        "Saya memahami bahwa informasi yang saya berikan akan dianonimkan dan dijaga kerahasiaannya oleh peneliti dan hanya digunakan untuk kepentingan publikasi ilmiah.",
    },
    {
      key: "voluntary",
      icon: Heart,
      title: "Persetujuan Sukarela",
      label: "Saya secara sukarela dan tanpa paksaan setuju untuk berpartisipasi dalam penelitian ini.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? "bg-gray-700 text-yellow-300" : "bg-purple-100 text-purple-800"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

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
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-t-2xl overflow-hidden shadow-xl ${
              darkMode
                ? "bg-gradient-to-r from-purple-900 to-amber-900"
                : "bg-gradient-to-r from-purple-600 to-amber-600"
            }`}
          >
            <div className="p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Informed Consent</h1>
                  <p className="text-white/90">Persetujuan Partisipasi Penelitian</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl rounded-b-2xl overflow-hidden`}
          >
            <div className="p-8">
              {/* Introduction */}
              <div className={`mb-8 space-y-6 ${darkMode ? "text-gray-300" : "text-gray-700"} text-lg leading-relaxed`}>
                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-amber-900/20 border border-amber-700/30" : "bg-amber-50 border border-amber-200"
                  }`}
                >
                  <div className="flex items-start">
                    <Info className={`w-6 h-6 mr-3 mt-1 ${darkMode ? "text-amber-300" : "text-amber-600"}`} />
                    <div>
                      <h3 className={`font-semibold mb-2 ${darkMode ? "text-amber-200" : "text-amber-800"}`}>
                        Selamat Datang di Penelitian Nama Penelitian
                      </h3>
                      <p className={darkMode ? "text-amber-100" : "text-amber-700"}>
                        Mohon untuk mengisi formulir di bawah ini setelah Saudara/i membaca lembar penjelasan penelitian
                        dari peneliti mengenai penelitian yang akan dilaksanakan.
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Terima kasih telah mempertimbangkan untuk berpartisipasi pada penelitian ini. Mohon untuk menandai
                  semua kotak di bawah ini sebagai tanda persetujuan atas pernyataan tertulis di atas.
                </p>

                <p>
                  Bila Anda bersedia untuk berpartisipasi dalam penelitian ini, mohon untuk menekan tombol
                  'Selanjutnya'. Bila tidak, cukup tutup form ini atau klik tombol 'Kembali'.
                </p>
              </div>

              {/* Consent Items */}
              <div className="space-y-6">
                {consentItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      agreements[item.key]
                        ? darkMode
                          ? "bg-purple-900/20 border-purple-600/50"
                          : "bg-purple-50 border-purple-200"
                        : darkMode
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    } hover:shadow-md`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 pt-1">
                        <input
                          type="checkbox"
                          id={item.key}
                          checked={agreements[item.key]}
                          onChange={() => handleCheckboxChange(item.key)}
                          className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <item.icon
                            className={`w-5 h-5 mr-2 ${
                              agreements[item.key]
                                ? darkMode
                                  ? "text-purple-300"
                                  : "text-purple-600"
                                : darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                          <h4
                            className={`font-semibold ${
                              agreements[item.key]
                                ? darkMode
                                  ? "text-purple-200"
                                  : "text-purple-800"
                                : darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {item.title}
                          </h4>
                        </div>
                        <label
                          htmlFor={item.key}
                          className={`cursor-pointer leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
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
                  className={`border-t pt-8 mt-8 ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                >
                  <div
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      agreements.finalConsent
                        ? darkMode
                          ? "bg-gradient-to-r from-purple-900/30 to-amber-900/30 border-purple-500"
                          : "bg-gradient-to-r from-purple-50 to-amber-50 border-purple-300"
                        : darkMode
                        ? "bg-gray-700/50 border-gray-600 border-dashed"
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
                          <h4
                            className={`font-bold mb-2 ${
                              agreements.finalConsent
                                ? darkMode
                                  ? "text-purple-200"
                                  : "text-purple-800"
                                : darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            Persetujuan Final
                          </h4>
                          <label
                            htmlFor="finalConsent"
                            className={`cursor-pointer text-lg leading-relaxed ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Saya telah membaca dan memahami informasi pada Lembar Penjelasan Penelitian sebelumnya dan
                            menyetujui untuk berpartisipasi dalam penelitian Nama Penelitian.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Progress Persetujuan
                  </span>
                  <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {Object.values(agreements).filter(Boolean).length} / {Object.keys(agreements).length}
                  </span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <div
                    className="bg-gradient-to-r from-purple-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (Object.values(agreements).filter(Boolean).length / Object.keys(agreements).length) * 100
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
                  className={`px-8 py-3 transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
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

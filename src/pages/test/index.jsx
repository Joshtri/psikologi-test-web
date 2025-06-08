"use client";

import { useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { motion } from "framer-motion";
import { Play, Clock, FileText, Users, Heart, Brain, User, Baby, Info, CheckCircle } from "lucide-react";
import { useToast } from "../../provider/ToastProvider";

const TestIndexPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleStartTest = () => {
    navigate("/test/start");
  };

  return (
    <>
      <div className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tes Kepribadian Komprehensif</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Tes ini dirancang untuk mengukur berbagai aspek kepribadian Anda melalui 4 kategori utama. Hasil tes akan
              memberikan gambaran menyeluruh tentang karakteristik psikologis Anda.
            </p>
          </motion.div>

          {/* Test Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informasi Tes</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">155</div>
                    <div className="text-gray-600">Total Pertanyaan</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">45-60</div>
                    <div className="text-gray-600">Menit Pengerjaan</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                    <div className="text-gray-600">Kategori Utama</div>
                  </div>
                </div>
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 px-12 py-4 text-lg"
                  onClick={handleStartTest}
                >
                  <Play className="w-6 h-6 mr-3" />
                  Mulai Tes Sekarang
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Categories Overview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4 Kategori yang Akan Diukur</h2>
              <p className="text-lg text-gray-600">
                Tes ini akan menganalisis kepribadian Anda berdasarkan kategori-kategori berikut:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1 - Pemaafan */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Pemaafan</h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Heartland Forgiveness Test</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Mengukur kemampuan dalam memaafkan diri sendiri dan orang lain
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Category 2 - Kesejahteraan Psikologis */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kesejahteraan Psikologis</h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Psychological Well-Being</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Mengevaluasi tingkat kesejahteraan dan kepuasan hidup
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Category 3 - Kecenderungan Kepribadian */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kecenderungan Kepribadian</h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Personality Diagnostic Questionnaire (PDQ)</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Mengidentifikasi pola kepribadian dan karakteristik psikologis
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Category 4 - Kondisi Kehidupan 18 Tahun Awal */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Baby className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kondisi Kehidupan 18 Tahun Awal</h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Adverse Childhood Experience (ACE)</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Menilai pengalaman masa kecil yang mempengaruhi kehidupan
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Petunjuk Pengerjaan
                </h3>
                <div className="grid md:grid-cols-2 gap-8 text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Sebelum Memulai:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Pastikan koneksi internet stabil</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Siapkan waktu 45-60 menit tanpa gangguan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Jawab semua pertanyaan dengan jujur</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Tidak ada jawaban benar atau salah</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Selama Tes:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Maksimal 10 pertanyaan per halaman</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Progress akan tersimpan otomatis</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Ikuti intuisi pertama Anda</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Hasil akan ditampilkan setelah selesai</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TestIndexPage;
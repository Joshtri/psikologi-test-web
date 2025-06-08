"use client"

import { useNavigate } from "react-router-dom"
import { Button, Card } from "flowbite-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Play,
  Clock,
  FileText,
  Users,
  Heart,
  Brain,
  User,
  Leaf,
  Info,
  CheckCircle,
  Sun,
  Moon,
  Globe,
  Sparkles,
} from "lucide-react"
import { useToast } from "../../provider/ToastProvider"

const TestIndexPage = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [darkMode, setDarkMode] = useState(false)

  // Check system preference for dark mode on load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleStartTest = () => {
    navigate("/test/start")
  }

  const categories = [
    {
      icon: Heart,
      title: "Pemaafan",
      subtitle: "Heartland Forgiveness Test",
      description: "Mengukur kemampuan dalam memaafkan diri sendiri dan orang lain dengan pendekatan yang peka budaya",
      bgColor: darkMode ? "bg-red-900/20" : "bg-red-50",
      iconColor: darkMode ? "text-red-300" : "text-red-600",
      borderColor: darkMode ? "border-red-700/30" : "border-red-200",
    },
    {
      icon: Brain,
      title: "Kesejahteraan Psikologis",
      subtitle: "Psychological Well-Being",
      description: "Mengevaluasi tingkat kesejahteraan dan kepuasan hidup berdasarkan nilai-nilai lokal",
      bgColor: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      iconColor: darkMode ? "text-purple-300" : "text-purple-600",
      borderColor: darkMode ? "border-purple-700/30" : "border-purple-200",
    },
    {
      icon: User,
      title: "Kecenderungan Kepribadian",
      subtitle: "Personality Diagnostic Questionnaire (PDQ)",
      description: "Mengidentifikasi pola kepribadian dan karakteristik unik dengan mempertimbangkan konteks budaya",
      bgColor: darkMode ? "bg-amber-900/20" : "bg-amber-50",
      iconColor: darkMode ? "text-amber-300" : "text-amber-600",
      borderColor: darkMode ? "border-amber-700/30" : "border-amber-200",
    },
    {
      icon: Leaf,
      title: "Makna Hidup",
      subtitle: "Adverse Childhood Experience (ACE)",
      description: "Merefleksikan nilai-nilai dan tujuan hidup yang bermakna sesuai dengan kearifan lokal",
      bgColor: darkMode ? "bg-green-900/20" : "bg-green-50",
      iconColor: darkMode ? "text-green-300" : "text-green-600",
      borderColor: darkMode ? "border-green-700/30" : "border-green-200",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-purple-100 text-purple-800"}`}
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

      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-amber-600 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Tes Kepribadian{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                RaiReflect
              </span>
            </h1>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Tes komprehensif yang menggabungkan ilmu psikologi modern dengan kearifan lokal NTT. Temukan pemahaman
              diri yang lebih dalam melalui 4 aspek kepribadian utama yang mencerminkan nilai-nilai budaya dan
              karakteristik psikologis Anda.
            </p>

            {/* Cultural Elements */}
            <div className="flex justify-center items-center gap-8 mt-8 text-sm">
              <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                <Globe className="w-4 h-4 mr-2" />
                <span>Peka Budaya</span>
              </div>
              <div className={`flex items-center ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                <Brain className="w-4 h-4 mr-2" />
                <span>Berbasis Riset</span>
              </div>
              <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                <Heart className="w-4 h-4 mr-2" />
                <span>Kearifan Lokal</span>
              </div>
            </div>
          </motion.div>

          {/* Test Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card
              className={`border-2 overflow-hidden ${
                darkMode
                  ? "border-purple-700/50 bg-gradient-to-r from-purple-900/30 to-amber-900/30"
                  : "border-purple-200 bg-gradient-to-r from-purple-50 to-amber-50"
              }`}
            >
              <div className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    darkMode ? "bg-purple-800" : "bg-gradient-to-br from-purple-600 to-amber-600"
                  }`}
                >
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Informasi Tes RaiReflect
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? "bg-purple-900/30" : "bg-white/70"
                    } backdrop-blur-sm border ${darkMode ? "border-purple-700/30" : "border-purple-200"}`}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        darkMode ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      155
                    </div>
                    <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Pertanyaan Tervalidasi</div>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? "bg-amber-900/30" : "bg-white/70"
                    } backdrop-blur-sm border ${darkMode ? "border-amber-700/30" : "border-amber-200"}`}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        darkMode ? "text-amber-300" : "text-amber-600"
                      }`}
                    >
                      45-60
                    </div>
                    <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Menit Pengerjaan</div>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? "bg-purple-900/30" : "bg-white/70"
                    } backdrop-blur-sm border ${darkMode ? "border-purple-700/30" : "border-purple-200"}`}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        darkMode ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      4
                    </div>
                    <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Aspek Kepribadian</div>
                  </div>
                </div>
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 border-0 px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleStartTest}
                >
                  <Play className="w-6 h-6 mr-3" />
                  Mulai Tes Sekarang
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Categories Overview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                4 Aspek Kepribadian yang Diukur
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                RaiReflect menganalisis kepribadian Anda melalui empat dimensi utama yang mencerminkan kearifan
                psikologi modern dan budaya lokal NTT
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card
                    className={`h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${
                      category.borderColor
                    } ${darkMode ? "bg-gray-800" : "bg-white"}`}
                  >
                    <div className="p-6">
                      <div
                        className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 border ${category.borderColor}`}
                      >
                        <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm mb-3 font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {category.subtitle}
                      </p>
                      <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {category.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="max-w-4xl mx-auto"
          >
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className="p-8">
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-8 text-center flex items-center justify-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Users className={`w-6 h-6 mr-3 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
                  Petunjuk Pengerjaan
                </h3>
                <div className={`grid md:grid-cols-2 gap-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <div>
                    <h4 className={`font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Sebelum Memulai:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Pastikan koneksi internet stabil</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Siapkan waktu 45-60 menit tanpa gangguan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Jawab semua pertanyaan dengan jujur</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Tidak ada jawaban benar atau salah</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Selama Tes:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <FileText
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-purple-400" : "text-purple-500"
                          }`}
                        />
                        <span>Maksimal 10 pertanyaan per halaman</span>
                      </li>
                      <li className="flex items-start">
                        <Clock
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-amber-400" : "text-amber-500"
                          }`}
                        />
                        <span>Progress akan tersimpan otomatis</span>
                      </li>
                      <li className="flex items-start">
                        <Users
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-purple-400" : "text-purple-500"
                          }`}
                        />
                        <span>Ikuti intuisi pertama Anda</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            darkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Hasil akan ditampilkan setelah selesai</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-16"
          >
            <div
              className={`p-8 rounded-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700"
                  : "bg-gradient-to-br from-purple-100 to-amber-100"
              } shadow-xl`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Siap Memulai Perjalanan Refleksi Diri?
              </h3>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Temukan pemahaman diri yang lebih dalam melalui tes kepribadian yang menghormati nilai-nilai budaya dan
                kearifan lokal Anda.
              </p>
              <Button
                size="xl"
                className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 border-0 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleStartTest}
              >
                <Play className="w-5 h-5 mr-2" />
                Mulai Tes RaiReflect
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TestIndexPage

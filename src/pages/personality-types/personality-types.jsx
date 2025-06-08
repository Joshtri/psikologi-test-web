"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "flowbite-react"
import { Heart, Brain, User, Leaf, Sun, Moon, ArrowRight, Globe, BookOpen, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export default function PersonalityTypesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  // Check system preference for dark mode on load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Categories data
  const categories = [
    {
      id: "forgiveness",
      title: "Pemaafan",
      subtitle: "Heartland Forgiveness Scale",
      icon: Heart,
      color: darkMode ? "text-red-300" : "text-red-600",
      bgColor: darkMode ? "bg-red-900/20" : "bg-red-50",
      borderColor: darkMode ? "border-red-700/30" : "border-red-200",
      description:
        "Pemaafan adalah proses melepaskan kemarahan, kebencian, dan keinginan untuk membalas dendam terhadap seseorang yang telah menyakiti kita. Kategori ini mengukur kemampuan Anda dalam memaafkan diri sendiri, orang lain, dan situasi yang terjadi di luar kendali Anda.",
      details: [
        "Pemaafan Diri: Kemampuan untuk menerima kesalahan dan kegagalan pribadi",
        "Pemaafan Orang Lain: Kemampuan untuk melepaskan kemarahan terhadap orang yang menyakiti",
        "Pemaafan Situasi: Kemampuan untuk menerima keadaan negatif yang terjadi di luar kendali",
      ],
      impact:
        "Penelitian menunjukkan bahwa pemaafan berkorelasi positif dengan kesehatan mental yang lebih baik, tingkat stres yang lebih rendah, dan hubungan interpersonal yang lebih sehat.",
    },
    {
      id: "wellbeing",
      title: "Kesejahteraan Psikologis",
      subtitle: "Psychological Well-Being Scale",
      icon: Sparkles,
      color: darkMode ? "text-purple-300" : "text-purple-600",
      bgColor: darkMode ? "bg-purple-900/20" : "bg-purple-50",
      borderColor: darkMode ? "border-purple-700/30" : "border-purple-200",
      description:
        "Kesejahteraan psikologis mencakup berbagai aspek fungsi positif dalam kehidupan seseorang. Kategori ini mengukur enam dimensi kesejahteraan yang mencerminkan potensi manusia untuk berkembang dan menghadapi tantangan kehidupan.",
      details: [
        "Penerimaan Diri: Sikap positif terhadap diri sendiri dan masa lalu",
        "Hubungan Positif: Kemampuan membangun hubungan yang hangat dan saling percaya",
        "Otonomi: Kemampuan untuk mandiri dan menentukan pilihan sendiri",
        "Penguasaan Lingkungan: Kemampuan mengelola kehidupan dan lingkungan secara efektif",
        "Tujuan Hidup: Memiliki arah dan makna dalam hidup",
        "Pertumbuhan Pribadi: Perasaan pengembangan diri yang berkelanjutan",
      ],
      impact:
        "Kesejahteraan psikologis yang tinggi dikaitkan dengan kesehatan fisik yang lebih baik, umur yang lebih panjang, dan kualitas hidup yang lebih tinggi.",
    },
    {
      id: "personality",
      title: "Kepribadian",
      subtitle: "Personality Diagnostic Questionnaire",
      icon: User,
      color: darkMode ? "text-amber-300" : "text-amber-600",
      bgColor: darkMode ? "bg-amber-900/20" : "bg-amber-50",
      borderColor: darkMode ? "border-amber-700/30" : "border-amber-200",
      description:
        "Kepribadian mencakup pola pikir, perasaan, dan perilaku yang relatif stabil dan membedakan satu individu dengan individu lainnya. Kategori ini mengidentifikasi karakteristik kepribadian Anda dan bagaimana hal tersebut mempengaruhi interaksi Anda dengan dunia.",
      details: [
        "Ekstraversi vs Introversi: Orientasi energi ke luar atau ke dalam diri",
        "Neurotisisme vs Stabilitas Emosional: Kecenderungan mengalami emosi negatif",
        "Keterbukaan terhadap Pengalaman: Ketertarikan pada hal-hal baru dan kreativitas",
        "Keramahan: Orientasi prososial dan kepercayaan terhadap orang lain",
        "Kesadaran: Kecenderungan untuk terorganisir dan bertanggung jawab",
      ],
      impact:
        "Memahami kepribadian dapat membantu dalam pengembangan diri, pemilihan karir yang sesuai, dan peningkatan kualitas hubungan interpersonal.",
    },
    {
      id: "lifemeaning",
      title: "Makna Hidup",
      subtitle: "Life Experiences & Meaning",
      icon: Leaf,
      color: darkMode ? "text-green-300" : "text-green-600",
      bgColor: darkMode ? "bg-green-900/20" : "bg-green-50",
      borderColor: darkMode ? "border-green-700/30" : "border-green-200",
      description:
        "Makna hidup berkaitan dengan bagaimana seseorang memahami tujuan dan nilai dalam kehidupannya, serta bagaimana pengalaman masa lalu membentuk pandangan mereka. Kategori ini mengeksplorasi pengalaman hidup Anda dan bagaimana hal tersebut mempengaruhi makna yang Anda temukan.",
      details: [
        "Pengalaman Masa Kecil: Bagaimana pengalaman awal membentuk pandangan hidup",
        "Nilai-nilai Personal: Prinsip dan keyakinan yang membimbing hidup",
        "Tujuan Hidup: Arah dan sasaran jangka panjang",
        "Koherensi: Kemampuan melihat hidup sebagai sesuatu yang bermakna dan dapat dipahami",
        "Pertumbuhan dari Trauma: Kemampuan menemukan makna dari pengalaman sulit",
      ],
      impact:
        "Memiliki makna hidup yang kuat dikaitkan dengan ketahanan yang lebih besar terhadap stres, depresi yang lebih rendah, dan kepuasan hidup yang lebih tinggi.",
    },
  ]

  // Navigation items
  const navItems = [
    { to: "/", label: "Beranda" },
    { to: "/test", label: "Mulai Tes" },
    { to: "/personality-types", label: "Tipe Kepribadian", active: true },
    { to: "/about", label: "Tentang Kami" },
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

      <main className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeIn}>
            <motion.h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
              variants={fadeIn}
            >
              Tipe{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Kepribadian
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              variants={fadeIn}
            >
              Kenali sisi terdalam dirimu melalui 4 kategori refleksi psikologis yang menggabungkan ilmu psikologi
              modern dengan kearifan lokal
            </motion.p>

            <motion.div className="flex justify-center items-center gap-8 text-sm">
              <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                <Globe className="w-4 h-4 mr-2" />
                <span>Peka Budaya</span>
              </div>
              <div className={`flex items-center ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                <Brain className="w-4 h-4 mr-2" />
                <span>Berbasis Riset</span>
              </div>
              <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Validitas Tinggi</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Categories Overview */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeIn}
                className={`rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  activeCategory === category.id
                    ? `ring-2 ${darkMode ? "ring-purple-500" : "ring-purple-400"} shadow-lg transform scale-[1.02]`
                    : ""
                } ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-xl`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="p-6">
                  <div
                    className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-6 border ${category.borderColor}`}
                  >
                    <category.icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{category.subtitle}</p>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {category.description}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      className={`text-sm flex items-center ${
                        darkMode ? "text-purple-300 hover:text-purple-200" : "text-purple-600 hover:text-purple-700"
                      }`}
                    >
                      {activeCategory === category.id ? "Sembunyikan detail" : "Lihat detail"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {activeCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 pb-6 ${darkMode ? "border-t border-gray-700" : "border-t border-gray-200"}`}
                  >
                    <div className="pt-4">
                      <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        Dimensi yang Diukur:
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {category.details.map((detail, index) => (
                          <li
                            key={index}
                            className={`text-sm flex items-start ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                                darkMode ? "bg-purple-400" : "bg-purple-500"
                              }`}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <h4 className={`text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        Dampak:
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{category.impact}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-2xl overflow-hidden shadow-xl ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Mengapa Memahami Tipe Kepribadian Penting?
                  </h2>
                  <div className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <p>
                      Memahami tipe kepribadian Anda dapat memberikan wawasan berharga tentang pola pikir, perasaan, dan
                      perilaku Anda. Ini membantu Anda:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          1
                        </div>
                        <span>
                          <strong className={darkMode ? "text-white" : "text-gray-900"}>
                            Meningkatkan kesadaran diri
                          </strong>{" "}
                          - Mengenali kekuatan dan area pengembangan Anda
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          2
                        </div>
                        <span>
                          <strong className={darkMode ? "text-white" : "text-gray-900"}>Memperbaiki hubungan</strong> -
                          Memahami bagaimana Anda berinteraksi dengan orang lain
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          3
                        </div>
                        <span>
                          <strong className={darkMode ? "text-white" : "text-gray-900"}>
                            Membuat keputusan yang lebih baik
                          </strong>{" "}
                          - Dalam karir, hubungan, dan pengembangan pribadi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          4
                        </div>
                        <span>
                          <strong className={darkMode ? "text-white" : "text-gray-900"}>
                            Meningkatkan kesejahteraan
                          </strong>{" "}
                          - Menjalani hidup yang lebih selaras dengan nilai-nilai dan kebutuhan Anda
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Button
                      className={`px-6 py-2.5 ${
                        darkMode
                          ? "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
                          : "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
                      } border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Mulai Tes Kepribadian
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-2xl -rotate-3 ${
                      darkMode ? "bg-purple-900/30" : "bg-purple-200"
                    }`}
                  ></div>
                  <div
                    className={`absolute inset-0 rounded-2xl rotate-3 ${darkMode ? "bg-amber-900/30" : "bg-amber-200"}`}
                  ></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Personality types illustration"
                    className="relative z-10 rounded-2xl w-full h-auto shadow-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-8 text-center ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Pertanyaan Umum
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "Apakah hasil tes ini bersifat permanen?",
                  answer:
                    "Tidak, kepribadian dan karakteristik psikologis dapat berubah seiring waktu dan pengalaman hidup. Kami menyarankan untuk melakukan tes ulang setiap 6-12 bulan.",
                },
                {
                  question: "Bagaimana keakuratan tes RaiReflect?",
                  answer:
                    "Tes RaiReflect dikembangkan berdasarkan penelitian ilmiah dan telah divalidasi secara psikometrik. Namun, hasilnya sebaiknya dilihat sebagai refleksi, bukan diagnosis absolut.",
                },
                {
                  question: "Apakah tes ini mempertimbangkan konteks budaya?",
                  answer:
                    "Ya, RaiReflect dirancang dengan mempertimbangkan konteks budaya Indonesia, khususnya kearifan lokal NTT, untuk memberikan hasil yang lebih relevan dan bermakna.",
                },
                {
                  question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan tes?",
                  answer:
                    "Tes lengkap membutuhkan waktu sekitar 45-60 menit. Anda dapat menyelesaikannya dalam beberapa sesi jika diperlukan, karena kemajuan Anda akan disimpan.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                  } shadow-md`}
                >
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {faq.question}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center"
          >
            <div
              className={`p-8 md:p-12 rounded-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-purple-900/50 to-amber-900/50"
                  : "bg-gradient-to-br from-purple-100 to-amber-100"
              } shadow-xl`}
            >
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Siap untuk mengenal diri lebih dalam?
              </h2>
              <p className={`text-lg max-w-2xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Mulai perjalanan refleksi diri Anda dengan tes psikologi RaiReflect yang peka budaya dan berbasis riset.
              </p>
              <Button
                size="xl"
                className={`px-8 py-3 text-lg ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white"
                    : "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
                } border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Mulai Tes Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  )
}

"use client"

import { Button, Card } from "flowbite-react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Heart, Moon, Sparkles, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import questionsData from "../../../data/questions.json"
import { useToast } from "../../provider/ToastProvider"

const testSequence = ["ace_scale", ""]

export default function TestStartPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [darkMode, setDarkMode] = useState(false)

  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState({})
  const [allAnswers, setAllAnswers] = useState({})
  const [timeElapsed, setTimeElapsed] = useState(0)

  const currentTestId = testSequence[currentTestIndex]
  const currentTest = questionsData.tests.find((t) => t.id === currentTestId)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  

  

const generateAllQuestions = () => {
  if (!currentTest) return []

  const yesNoTypes = [
    "yes_no",
    "emotional_neglect",
    "physical_neglect",
    "abuse",
    "contact_sexual_abuse",
    "community_violence",
    "collective_violence",
  ]

  return currentTest.questions.map((q) => {
    const type = yesNoTypes.includes(q.type) ? "yesno" : q.type === "text" ? "text" : "likert"

    return {
      id: `${currentTest.id}-${q.id}`,
      text: q.text,
      type,
      scale: currentTest.scale?.max ?? 4,
      category: currentTest.id,
      reverse: q.reverse ?? false,
    }
  })
}

  const allQuestions = generateAllQuestions()
  const questionsPerPage = 10
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage)
  const currentQuestions = allQuestions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const getCurrentPageAnswers = () => {
    return currentQuestions.filter((q) => answers[q.id] !== undefined).length
  }

  const canProceed = () => {
    return getCurrentPageAnswers() === currentQuestions.length
  }

  const handleNext = () => {
    if (!canProceed()) {
      showToast({
        type: "error",
        message: "Mohon jawab semua pertanyaan sebelum melanjutkan!",
        align: "top-right",
        duration: 3000,
      })
      return
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    } else {
      navigate("/test/result", {
        state: {
          answers,
          allQuestions,
          timeElapsed,
        },
      })
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const getTotalProgress = () => {
    const totalAnswered = Object.keys(answers).length
    const totalQuestions = allQuestions.length
    return Math.round((totalAnswered / totalQuestions) * 100)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-purple-50 via-white to-amber-50 text-gray-800"}`}
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
      <div className="absolute inset-0 z-0 opacity-5">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 sticky top-4 z-40 rounded-2xl shadow-xl backdrop-blur-sm border ${
              darkMode ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-purple-200"
            }`}
          >
            <div className="p-6 mt-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      RaiReflect - Tes Pemaafan
                    </h1>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Jawab setiap pertanyaan dengan jujur sesuai kondisi Anda
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      darkMode ? "bg-gray-700 text-gray-300" : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(timeElapsed)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div>
                  <div className={`flex justify-between text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <span>Progress Keseluruhan</span>
                    <span className="font-semibold">{getTotalProgress()}%</span>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-3 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div
                      className="bg-gradient-to-r from-purple-500 to-amber-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getTotalProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Page Indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                      const pageIndex = Math.floor(currentPage / 10) * 10 + i
                      if (pageIndex >= totalPages) return null

                      return (
                        <div
                          key={pageIndex}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            pageIndex === currentPage
                              ? "bg-gradient-to-r from-purple-500 to-amber-500 scale-125"
                              : pageIndex < currentPage
                                ? darkMode
                                  ? "bg-green-400"
                                  : "bg-green-500"
                                : darkMode
                                  ? "bg-gray-600"
                                  : "bg-gray-300"
                          }`}
                        />
                      )
                    })}
                    {totalPages > 10 && (
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>...</span>
                    )}
                  </div>
                  <div className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Halaman {currentPage + 1} dari {totalPages}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Questions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`mb-8 shadow-xl border-2 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-purple-200"
                }`}
              >
                <div className="p-8">
                  <div className="space-y-8">
                    {currentQuestions.map((question, index) => {
                      const qIndex = currentPage * questionsPerPage + index + 1
                      const isAnswered = answers[question.id] !== undefined

                      return (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`border-b pb-8 last:border-b-0 transition-all duration-300 ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          } ${
                            isAnswered
                              ? darkMode
                                ? "bg-purple-900/10 rounded-lg p-4"
                                : "bg-purple-50 rounded-lg p-4"
                              : ""
                          }`}
                        >
                          <div className="flex items-start mb-6">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                                isAnswered
                                  ? "bg-gradient-to-r from-purple-500 to-amber-500 text-white"
                                  : darkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {isAnswered ? <CheckCircle className="w-4 h-4" /> : qIndex}
                            </div>
                            <h3
                              className={`text-lg font-medium leading-relaxed ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {question.text}
                            </h3>
                          </div>

                          {/* Likert Scale */}
                          {question.type === "likert" && (
                            <div className="ml-12">
                              <div
                                className={`flex justify-between text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {question.scale > 1 && <span>Sangat tidak sesuai dengan saya</span>}
                                {question.scale > 3 && <span>Agak tidak sesuai</span>}
                                {question.scale > 5 && <span>Agak sesuai</span>}
                                {question.scale > 7 && <span>Sangat sesuai dengan saya</span>}
                                <span>Sangat Setuju</span>
                              </div>
                              <div className="flex justify-center space-x-3">
                                {Array.from({ length: question.scale }, (_, i) => (
                                  <label key={i} className="flex flex-col items-center cursor-pointer group">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={i + 1}
                                      checked={answers[question.id] === i + 1}
                                      onChange={() => handleAnswer(question.id, i + 1)}
                                      className="w-6 h-6 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                    />
                                    <span
                                      className={`text-sm mt-2 transition-colors ${
                                        answers[question.id] === i + 1
                                          ? darkMode
                                            ? "text-purple-300 font-semibold"
                                            : "text-purple-600 font-semibold"
                                          : darkMode
                                            ? "text-gray-400 group-hover:text-gray-300"
                                            : "text-gray-600 group-hover:text-gray-800"
                                      }`}
                                    >
                                      {i + 1}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Yes/No Questions */}
                          {question.type === "yesno" && (
                            <div className="ml-12 flex space-x-4 justify-center">
                              {(currentTest?.scale?.labels?.YA ? ["YA", "TIDAK"] : ["Ya", "Tidak"]).map((label, idx) => (
                                <Button
                                  key={label}
                                  className={`px-6 py-2 transition-all duration-300 ${
                                    answers[question.id] === idx + 1
                                      ? "bg-gradient-to-r from-purple-600 to-amber-600 text-white"
                                      : darkMode
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  }`}
                                  onClick={() => handleAnswer(question.id, idx + 1)}
                                >
                                  {label}
                                </Button>
                              ))}
                            </div>
                          )}

                          {/* Text Questions */}
                          {question.type === "text" && (
                            <div className="ml-12">
                              <textarea
                                className={`w-full border rounded-lg p-4 transition-colors focus:ring-2 focus:ring-purple-500 ${
                                  darkMode
                                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                }`}
                                rows={3}
                                placeholder="Tuliskan jawaban Anda di sini..."
                                value={answers[question.id] || ""}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                              />
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl shadow-lg ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-purple-200"
            }`}
          >
            <Button
              color="light"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`px-6 py-3 transition-all duration-300 ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Sebelumnya
            </Button>

            <div className="text-center">
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {getCurrentPageAnswers()}/{currentQuestions.length} pertanyaan dijawab
              </div>
              <div className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                Total: {Object.keys(answers).length}/{allQuestions.length}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 transition-all duration-300 ${
                canProceed()
                  ? "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              {currentPage === totalPages - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Selesai
                </>
              ) : (
                <>
                  Selanjutnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Motivational Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-8 text-center p-4 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-purple-50/50"}`}
          >
            <div className="flex items-center justify-center mb-2">
              <Sparkles className={`w-5 h-5 mr-2 ${darkMode ? "text-amber-300" : "text-amber-600"}`} />
              <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Tetap semangat! Setiap jawaban membawa Anda lebih dekat pada pemahaman diri yang mendalam.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

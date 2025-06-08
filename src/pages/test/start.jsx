"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Progress } from "flowbite-react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react"
import Layout from "../../components/Layout"
import { useToast } from "../../provider/ToastProvider"

export default function TestStartPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Mock questions data - mix all categories without showing which category
  const generateAllQuestions = () => {
    const allQuestions = []

    // Generate questions from all 4 categories mixed together
    const categories = [
      { id: 1, count: 18, prefix: "Pemaafan" },
      { id: 2, count: 42, prefix: "Kesejahteraan" },
      { id: 3, count: 85, prefix: "Kepribadian" },
      { id: 4, count: 10, prefix: "Kehidupan" },
    ]

    categories.forEach((category) => {
      for (let i = 1; i <= category.count; i++) {
        allQuestions.push({
          id: category.id * 1000 + i,
          text: `Saya merasa ${category.prefix.toLowerCase()} adalah hal yang penting dalam hidup saya dan mempengaruhi cara saya berinteraksi dengan orang lain.`,
          type: "likert",
          scale: 5,
          category: category.id, // Hidden from user, used for scoring
        })
      }
    })

    // Shuffle questions so categories are mixed
    return allQuestions.sort(() => Math.random() - 0.5)
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
      // Finish test
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
    <>

      <div className=" py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tes Kepribadian</h1>
                <p className="text-gray-600">Jawab setiap pertanyaan dengan jujur sesuai kondisi Anda</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(timeElapsed)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress Keseluruhan</span>
                  <span>{getTotalProgress()}%</span>
                </div>
                <Progress progress={getTotalProgress()} color="blue" />
              </div>
            </div>

            {/* Page Indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const pageIndex = Math.floor(currentPage / 10) * 10 + i
                  if (pageIndex >= totalPages) return null

                  return (
                    <div
                      key={pageIndex}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        pageIndex === currentPage
                          ? "bg-blue-600"
                          : pageIndex < currentPage
                            ? "bg-green-500"
                            : "bg-gray-300"
                      }`}
                    />
                  )
                })}
                {totalPages > 10 && <span className="text-gray-400">...</span>}
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                Halaman {currentPage + 1} dari {totalPages}
              </div>
            </div>
          </div>

          {/* Questions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8">
                <div className="p-6">
                  <div className="space-y-6">
                    {currentQuestions.map((question, index) => (
                      <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="mb-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {currentPage * questionsPerPage + index + 1}. {question.text}
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-3">
                            <span>Sangat Tidak Setuju</span>
                            <span>Sangat Setuju</span>
                          </div>
                          <div className="flex justify-center space-x-4">
                            {Array.from({ length: 5 }, (_, i) => (
                              <label key={i} className="flex flex-col items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={i + 1}
                                  checked={answers[question.id] === i + 1}
                                  onChange={() => handleAnswer(question.id, i + 1)}
                                  className="w-5 h-5 text-blue-600"
                                />
                                <span className="text-sm text-gray-600 mt-1">{i + 1}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button color="light" onClick={handlePrevious} disabled={currentPage === 0} className="px-6 py-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Sebelumnya
            </Button>

            <div className="text-sm text-gray-600">
              {getCurrentPageAnswers()}/{currentQuestions.length} pertanyaan dijawab
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-2 ${
                canProceed() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
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
          </div>
        </div>
      </div>
    </>
  )
}

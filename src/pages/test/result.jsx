"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Card } from "flowbite-react"
import { motion } from "framer-motion"
import { Download, Share2, RefreshCw, Home, Clock, CheckCircle, TrendingUp, BarChart3, Award } from "lucide-react"
import Layout from "../../components/Layout"
import { useToast } from "../../provider/ToastProvider"

export default function TestResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const { answers, testScales, timeElapsed } = location.state || {}
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!answers || !testScales) {
      navigate("/test")
    }
  }, [answers, testScales, navigate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} menit ${secs} detik`
  }

  const calculateResults = () => {
    const results =
      testScales?.map((scale) => {
        const scaleAnswers = scale.questions
          .map((q) => {
            const answer = answers[q.id];
            if (q.reverse && answer !== undefined) {
              return 6 - answer; // Assuming a 1-5 scale, reverse mapping formula
            }
            return answer;
          })
          .filter(Boolean);
        const average = scaleAnswers.reduce((sum, val) => sum + val, 0) / scaleAnswers.length
        const percentage = Math.round((average / 5) * 100) // Assuming 5-point scale

        let interpretation = ""
        if (percentage >= 80) interpretation = "Sangat Tinggi"
        else if (percentage >= 60) interpretation = "Tinggi"
        else if (percentage >= 40) interpretation = "Sedang"
        else if (percentage >= 20) interpretation = "Rendah"
        else interpretation = "Sangat Rendah"

        return {
          ...scale,
          score: average.toFixed(2),
          percentage,
          interpretation,
          answeredQuestions: scaleAnswers.length,
          totalQuestions: scale.questions.length,
        }
      }) || []
    )
  }

  const results = useMemo(() => calculateResults(), [answers, testScales])
  const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0)
  const totalAnswered = results.reduce((sum, r) => sum + r.answeredQuestions, 0)
  const completionRate = Math.round((totalAnswered / totalQuestions) * 100)

  const handleDownload = () => {
    showToast({
      type: "success",
      message: "Hasil tes berhasil diunduh!",
      align: "top-right",
      duration: 3000,
    })
  }

  const handleShare = () => {
    showToast({
      type: "info",
      message: "Link hasil tes telah disalin!",
      align: "top-right",
      duration: 3000,
    })
  }

  const handleRetakeTest = () => {
    navigate("/test")
  }

  if (!answers || !testScales) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Hasil tes tidak ditemukan</h2>
            <Button onClick={() => navigate("/test")}>
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Pilihan Tes
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tes Selesai!</h1>
            <p className="text-xl text-gray-600">
              Terima kasih telah menyelesaikan tes kepribadian. Berikut adalah hasil Anda.
            </p>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <Card>
              <div className="p-6 text-center">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{results.length}</div>
                <div className="text-sm text-gray-600">Tes Diselesaikan</div>
              </div>
            </Card>
            <Card>
              <div className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{totalAnswered}</div>
                <div className="text-sm text-gray-600">Pertanyaan Dijawab</div>
              </div>
            </Card>
            <Card>
              <div className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{completionRate}%</div>
                <div className="text-sm text-gray-600">Tingkat Penyelesaian</div>
              </div>
            </Card>
            <Card>
              <div className="p-6 text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-gray-600">Waktu Pengerjaan</div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="space-y-8 mb-12">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.title}</h3>
                        <p className="text-gray-600">{result.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{result.percentage}%</div>
                        <div className="text-sm text-gray-600">Skor: {result.score}/5.0</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Interpretasi: {result.interpretation}</span>
                        <span>
                          {result.answeredQuestions}/{result.totalQuestions} pertanyaan
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            result.percentage >= 80
                              ? "bg-green-500"
                              : result.percentage >= 60
                                ? "bg-blue-500"
                                : result.percentage >= 40
                                  ? "bg-yellow-500"
                                  : result.percentage >= 20
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Interpretation */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Interpretasi Hasil:</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Berdasarkan hasil tes {result.title}, Anda memiliki tingkat{" "}
                        {result.interpretation.toLowerCase()}
                        dengan skor {result.score} dari skala 5.0. Hasil ini menunjukkan karakteristik kepribadian yang
                        spesifik dalam aspek yang diukur oleh tes ini.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-6 py-3" onClick={handleDownload}>
              <Download className="w-5 h-5 mr-2" />
              Unduh Hasil
            </Button>
            <Button color="light" size="lg" className="px-6 py-3" onClick={handleShare}>
              <Share2 className="w-5 h-5 mr-2" />
              Bagikan Hasil
            </Button>
            <Button color="light" size="lg" className="px-6 py-3" onClick={handleRetakeTest}>
              <RefreshCw className="w-5 h-5 mr-2" />
              Ulangi Tes
            </Button>
            <Button color="light" size="lg" className="px-6 py-3" onClick={() => navigate("/")}>
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

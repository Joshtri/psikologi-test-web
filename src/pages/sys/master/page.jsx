"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Brain, Smile, Shield, ChevronDown, CheckCircle, XCircle } from "lucide-react"
import { Card } from "flowbite-react"

// Import individual JSON files
// import hfsData from "../../data/hfs.json"
// import pdq4Data from "../../data/pdq4.json"
// import pwbData from "../data/pwb.json"
// import aceData from "../data/ace.json"

import hfsData from "../../../../data/questions/hfsQuestion.json"
import pdq4Data from "../../../../data/questions/pdqQuestion.json"
import pwbData from "../../../../data/questions/pwbQuestion.json"
import aceData from "../../../../data/questions/aceQuestion.json"

const assessments = {
  hfs: hfsData,
  pdq4: pdq4Data,
  pwb: pwbData,
  ace: aceData,
}

const tabIcons = {
  hfs: Heart,
  pdq4: Brain,
  pwb: Smile,
  ace: Shield,
}

const subscaleColors = {
  self: "text-purple-600 bg-purple-50",
  others: "text-blue-600 bg-blue-50",
  situation: "text-green-600 bg-green-50",
  Histrionik: "text-pink-600 bg-pink-50",
  Narcissistic: "text-indigo-600 bg-indigo-50",
  Borderline: "text-red-600 bg-red-50",
  Antisocial: "text-orange-600 bg-orange-50",
  Kemandirian: "text-emerald-600 bg-emerald-50",
  "Penguasaan Lingkungan": "text-teal-600 bg-teal-50",
  "Pertumbuhan Pribadi": "text-cyan-600 bg-cyan-50",
  "Relasi Positif": "text-sky-600 bg-sky-50",
  "Tujuan Hidup": "text-violet-600 bg-violet-50",
  "Penerimaan Diri": "text-fuchsia-600 bg-fuchsia-50",
}

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState("hfs")
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const groupQuestionsByCategory = (questions, categoryKey = "subscale") => {
    return questions.reduce((groups, question) => {
      const category = question[categoryKey] || "Other"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(question)
      return groups
    }, {})
  }

  const renderHFSContent = () => {
    const data = assessments.hfs
    const groupedQuestions = groupQuestionsByCategory(data.questions, "subscale")

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Instruksi</h3>
          <p className="text-purple-700">{data.instructions}</p>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(data.scale.labels).map(([key, value]) => (
              <div key={key} className="bg-white p-2 rounded text-center">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {Object.entries(groupedQuestions).map(([subscale, questions]) => (
          <Card key={subscale} className="p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(`hfs-${subscale}`)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${subscaleColors[subscale] || "text-gray-600 bg-gray-50"}`}
                >
                  {subscale.charAt(0).toUpperCase() + subscale.slice(1)}
                </div>
                <span className="text-gray-600">({questions.length} pertanyaan)</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections[`hfs-${subscale}`] ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence>
              {expandedSections[`hfs-${subscale}`] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3"
                >
                  {questions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{question.text}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          {question.label === "favorable" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-xs text-gray-500 capitalize">{question.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    )
  }

  const renderPDQ4Content = () => {
    const data = assessments.pdq4
    const groupedQuestions = groupQuestionsByCategory(data.questions, "label")

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Instruksi</h3>
          <p className="text-blue-700">{data.instructions}</p>
          <div className="mt-3 flex space-x-4 text-sm">
            {Object.entries(data.scale.labels).map(([key, value]) => (
              <div key={key} className="bg-white p-2 rounded">
                <span className="font-medium capitalize">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {Object.entries(groupedQuestions).map(([category, questions]) => {
          if (!category || category === "") return null
          return (
            <Card key={category} className="p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(`pdq4-${category}`)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${subscaleColors[category] || "text-gray-600 bg-gray-50"}`}
                  >
                    {category}
                  </div>
                  <span className="text-gray-600">({questions.length} pertanyaan)</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedSections[`pdq4-${category}`] ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {expandedSections[`pdq4-${category}`] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-3"
                  >
                    {questions.map((question) => (
                      <div key={question.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                          {question.id}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{question.text}</p>
                          {question.isInstruction && (
                            <div className="mt-2">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Instruksi</span>
                            </div>
                          )}
                          {question.parentId && (
                            <div className="mt-2">
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                Sub-pertanyaan dari #{question.parentId}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderPWBContent = () => {
    const data = assessments.pwb
    const groupedQuestions = groupQuestionsByCategory(data.questions, "category")

    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Instruksi</h3>
          <p className="text-green-700">{data.instructions}</p>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(data.scale.labels).map(([key, value]) => (
              <div key={key} className="bg-white p-2 rounded text-center">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {Object.entries(groupedQuestions).map(([category, questions]) => (
          <Card key={category} className="p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(`pwb-${category}`)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${subscaleColors[category] || "text-gray-600 bg-gray-50"}`}
                >
                  {category}
                </div>
                <span className="text-gray-600">({questions.length} pertanyaan)</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections[`pwb-${category}`] ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence>
              {expandedSections[`pwb-${category}`] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3"
                >
                  {questions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{question.text}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          {question.label === "favorable" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-xs text-gray-500 capitalize">{question.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    )
  }

  const renderACEContent = () => {
    const data = assessments.ace

    return (
      <div className="space-y-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Instruksi</h3>
          <p className="text-red-700">{data.instructions}</p>
        </div>

        {data.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(`ace-${sectionIndex}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-50">{section.title}</div>
                <span className="text-gray-600">({section.questions.length} pertanyaan)</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections[`ace-${sectionIndex}`] ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence>
              {expandedSections[`ace-${sectionIndex}`] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-sm text-gray-600 mb-4 italic">{section.instructions}</p>
                  <div className="space-y-3">
                    {section.questions.map((question) => (
                      <div key={question.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                          {question.id}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{question.text}</p>
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                              {question.category}
                            </span>
                          </div>
                          {question.scoring && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Scoring:</div>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(question.scoring).map(([option, score]) => (
                                  <span
                                    key={option}
                                    className={`text-xs px-2 py-1 rounded ${
                                      score === 1 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {option}: {score}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "hfs":
        return renderHFSContent()
      case "pdq4":
        return renderPDQ4Content()
      case "pwb":
        return renderPWBContent()
      case "ace":
        return renderACEContent()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Master Data Assessments</h1>
          <p className="text-gray-600">Kelola dan lihat semua data assessment psikologi</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {Object.entries(assessments).map(([key, assessment]) => {
                const Icon = tabIcons[key]
                const isActive = activeTab === key

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      isActive
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`mr-2 h-5 w-5 ${isActive ? "text-purple-500" : "text-gray-400 group-hover:text-gray-500"}`}
                    />
                    {assessment.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

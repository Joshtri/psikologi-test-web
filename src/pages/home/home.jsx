import { features, stats } from "@/constants/common";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import {
  Brain,
  Globe,
  Heart,
  Play,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import ConsentPage from "./consent";

export default function HomePage() {
   const [showConsent, setShowConsent] = useState(false);

  const handleStartTest = () => setShowConsent(true);

  if (showConsent) return <ConsentPage onBack={() => setShowConsent(false)} />;


  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-amber-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2E3ODJmZiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iNSIvPjxwYXRoIGQ9Ik0xMCAyMEMxNS41MjMgMjAgMjAgMTUuNTIzIDIwIDEwUzE1LjUyMyAwIDEwIDBTMCA0LjQ3NyAwIDEwczQuNDc3IDEwIDEwIDEweiIgc3Ryb2tlPSIjZTlkNWZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-amber-600 rounded-full mb-8 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                RaiReflect
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Refleksi diri yang berakar dari tanah tempatmu berpijak
            </motion.p>

            <motion.p
              className="text-lg mb-12 max-w-4xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Platform tes kepribadian yang menggabungkan ilmu psikologi modern
              dengan kearifan lokal NTT. Temukan pemahaman diri yang lebih dalam
              melalui asesmen yang peka budaya dan bermakna.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="xl"
                className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 border-0 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleStartTest}
              >
                <Play className="w-5 h-5 mr-2" />
                Mulai Tes Sekarang
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center items-center gap-8 mt-12 text-sm text-amber-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>Peka Budaya</span>
              </div>
              <div className="flex items-center text-purple-700">
                <Brain className="w-4 h-4 mr-2" />
                <span>Berbasis Riset</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>Kearifan Lokal</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              4 Aspek Kepribadian yang Diukur
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              RaiReflect menganalisis kepribadian Anda melalui empat dimensi
              utama yang mencerminkan kearifan psikologi modern dan budaya lokal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-amber-50 hover:from-purple-100 hover:to-amber-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto bg-white shadow-md">
                  <feature.icon
                    className={`w-8 h-8 ${
                      i % 2 === 0 ? "text-purple-600" : "text-amber-600"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="rounded-3xl shadow-xl p-8 md:p-12 bg-gradient-to-r from-purple-600 to-amber-600"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Platform Tes Terpercaya
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Dikembangkan dengan standar psikologi internasional dan
                disesuaikan dengan konteks budaya Indonesia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Play, Sparkles, Target, Trophy } from "lucide-react";
import { useState } from "react";
// import { IconCard } from "../components/ui/"
import { StatBlock } from "../../components/ui/StatBlock";
import { useToast } from "../../provider/ToastProvider";

import { IconCard } from "../../components/ui/IconCard";
import ConsentPage from "./consent";

export default function HomePage() {
  const { showToast } = useToast();
  const [showConsent, setShowConsent] = useState(false);

  const handleStartTest = () => setShowConsent(true);
  const handleLearnMore = () =>
    showToast({
      type: "info",
      message: "Fitur panduan akan segera hadir!",
      align: "top-right",
      duration: 3000,
    });

  if (showConsent) return <ConsentPage onBack={() => setShowConsent(false)} />;

  const features = [
    {
      icon: Target,
      title: "Tes Terarah",
      description:
        "Soal-soal yang dirancang khusus untuk mengukur kemampuan Anda",
    },
    {
      icon: Clock,
      title: "Waktu Fleksibel",
      description: "Atur waktu sesuai kenyamanan Anda dengan timer otomatis",
    },
    {
      icon: Trophy,
      title: "Hasil Instan",
      description: "Dapatkan hasil dan analisis performa secara langsung",
    },
  ];

  const stats = [
    { value: "1000+", label: "Soal Tersedia" },
    { value: "95%", label: "Tingkat Kepuasan" },
    { value: "24/7", label: "Akses Tersedia" },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Selamat Datang di{" "}
            <span className="text-blue-600">Platform Tes</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Uji kemampuan Anda dengan berbagai soal yang telah dirancang khusus.
            Dapatkan hasil instan dan tingkatkan performa Anda!
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="xl"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
              onClick={handleStartTest}
            >
              <Play className="w-5 h-5 mr-2" /> Mulai Tes Sekarang
            </Button>
            <Button
              color="light"
              size="xl"
              className="px-8 py-4 text-lg border-2"
              onClick={handleLearnMore}
            >
              <BookOpen className="w-5 h-5 mr-2" /> Pelajari Lebih Lanjut
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="max-w-7xl mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Platform Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan pengalaman tes yang komprehensif dengan
              fitur-fitur terdepan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <IconCard key={i} {...f} delay={0.9 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        {/* Stats Section */}
        {/* Stats */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-4 rounded-3xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <StatBlock key={i} {...s} delay={1.3 + i * 0.1} />
            ))}
          </div>
        </motion.div>

      </div>
    </>
  );
}

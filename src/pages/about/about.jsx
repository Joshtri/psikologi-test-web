"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import { Heart, Brain, User, Sparkles, Sun, Moon, ArrowRight, Globe, Leaf, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./about.css"; // Import custom styles if needed

export default function AboutPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference for dark mode on load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Team members data
  const teamMembers = [
    {
      name: "Dr. Maria Latu",
      role: "Founder & Lead Psychologist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Spesialis psikologi klinis dengan fokus pada kesejahteraan mental berbasis budaya lokal.",
    },
    {
      name: "Petrus Wanggai",
      role: "Cultural Consultant",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ahli budaya NTT yang memastikan tes kami menghormati dan mencerminkan kearifan lokal.",
    },
    {
      name: "Anita Sari",
      role: "Research Lead",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Peneliti psikologi dengan spesialisasi dalam pengembangan alat ukur psikometri.",
    },
    {
      name: "Budi Santoso",
      role: "Tech Developer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pengembang platform digital dengan fokus pada pengalaman pengguna yang inklusif.",
    },
  ];

  // Mission pillars data
  const missionPillars = [
    {
      title: "Pemaafan",
      icon: Heart,
      description: "Memahami dan mengembangkan kemampuan memaafkan diri dan orang lain.",
    },
    {
      title: "Kesejahteraan",
      icon: Sparkles,
      description: "Mengukur dan meningkatkan kesejahteraan psikologis secara holistik.",
    },
    {
      title: "Kepribadian",
      icon: User,
      description: "Mengenali pola kepribadian dan karakteristik unik individu.",
    },
    {
      title: "Makna Hidup",
      icon: Leaf,
      description: "Merefleksikan nilai-nilai dan tujuan hidup yang bermakna.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-purple-100 text-purple-800"}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className={`relative overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-gradient-to-br from-purple-50 via-white to-amber-50"
        }`}
      >
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

        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-32">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
              variants={fadeIn}
            >
              Tentang{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Penelitian Psikologi 2025
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              variants={fadeIn}
            >
              Refleksi diri yang berakar dari tanah tempatmu berpijak
            </motion.p>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-amber-500 mx-auto"
              variants={fadeIn}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent" />
      </section>

      {/* Our Mission Section */}
      <section className={`py-16 md:py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Visi dan Misi
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Penelitian Psikologi 2025 membantu individu merefleksikan pemaafan, kesejahteraan, kepribadian, dan
              nilai-nilai hidup melalui asesmen psikologis yang peka budaya. Kami menggabungkan ilmu psikologi modern
              dengan kearifan lokal untuk menciptakan pengalaman refleksi diri yang bermakna dan relevan.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {missionPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-purple-50 hover:bg-amber-50"
                } transition-colors duration-300`}
                variants={fadeIn}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${
                    darkMode ? "bg-purple-900" : "bg-purple-100"
                  }`}
                >
                  <pillar.icon className={`w-8 h-8 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {pillar.title}
                </h3>
                <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Penelitian Psikologi 2025 Section */}
      <section className={`py-16 md:py-24 ${darkMode ? "bg-gray-800" : "bg-amber-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Mengapa Penelitian Psikologi 2025?
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Penelitian Psikologi 2025 lahir dari kesadaran bahwa alat ukur psikologi perlu mempertimbangkan konteks
                budaya lokal. Kami menggabungkan metodologi psikologi modern dengan kearifan lokal NTT untuk menciptakan
                pengalaman refleksi diri yang lebih bermakna dan relevan.
              </p>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Nama "Rai" diambil dari bahasa Tetun yang berarti "tanah" atau "bumi", melambangkan hubungan kita dengan
                akar budaya dan identitas. Kami percaya bahwa pemahaman diri yang sejati harus mempertimbangkan konteks
                budaya dan nilai-nilai yang membentuk kita.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                  <Globe className="w-5 h-5 mr-2" />
                  <span>Peka Budaya</span>
                </div>
                <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>Berbasis Riset</span>
                </div>
                <div className={`flex items-center ${darkMode ? "text-amber-300" : "text-amber-700"}`}>
                  <Brain className="w-5 h-5 mr-2" />
                  <span>Validitas Tinggi</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div
                className={`absolute inset-0 rounded-2xl -rotate-3 ${darkMode ? "bg-purple-900/30" : "bg-purple-200"}`}
              ></div>
              <div
                className={`absolute inset-0 rounded-2xl rotate-3 ${darkMode ? "bg-amber-900/30" : "bg-amber-200"}`}
              ></div>
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="People reflecting in nature"
                className="relative z-10 rounded-2xl w-full h-auto shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 opacity-70 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className={`py-16 md:py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Tim Kami
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Kami adalah tim multidisiplin yang menggabungkan keahlian dalam psikologi, budaya lokal, penelitian, dan
              teknologi untuk menciptakan platform refleksi diri yang bermakna.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`rounded-xl overflow-hidden ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg transition-transform duration-300 hover:-translate-y-2`}
                variants={fadeIn}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm mb-3 ${darkMode ? "text-purple-300" : "text-purple-600"} font-medium`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-16 md:py-24 ${
          darkMode ? "bg-gradient-to-br from-purple-900 to-amber-900" : "bg-gradient-to-br from-purple-100 to-amber-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Siap mengenal diri lebih dalam?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-10 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              Mulai perjalanan refleksi diri Anda dengan tes psikologi yang peka budaya dan berbasis riset.
            </p>
            <Button
              size="xl"
              onClick={() => navigate("/test")}
              className={`px-8 py-3 text-lg ${
                darkMode
                  ? "bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white"
                  : "bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
              } border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Mulai Tes Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

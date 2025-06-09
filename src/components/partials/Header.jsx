"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Check system preference for dark mode on load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const navItems = [
    { to: "/", label: "Beranda" },
    { to: "/test", label: "Mulai Tes" },
    { to: "/personality-types", label: "Tipe Kepribadian" },
    { to: "/about", label: "Tentang Kami" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 shadow-lg relative overflow-hidden backdrop-blur-md transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-800"
          : "bg-gradient-to-r from-purple-600 via-purple-500 to-amber-600 text-white"
      }`}
    >
      {/* Background decoration */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-gradient-to-r from-purple-900/20 to-amber-900/20"
            : "bg-gradient-to-r from-purple-600/20 to-amber-600/20"
        }`}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-3 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              darkMode ? "bg-gray-800 group-hover:bg-gray-700" : "bg-white/20 group-hover:bg-white/30"
            }`}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">RaiReflect</h1>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-purple-100"}`}>Refleksi Diri Bermakna</p>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Dark Mode Toggle */}
          {/* <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/10 hover:bg-white/20"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button> */}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? darkMode
                      ? "bg-gray-700 text-white font-semibold shadow-lg"
                      : "bg-white/20 text-white font-semibold shadow-lg"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-purple-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-lg ${darkMode ? "bg-purple-800/50" : "bg-white/20"}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden backdrop-blur-sm border-t ${
              darkMode ? "bg-gray-900/90 border-gray-800" : "bg-black/20 border-white/10"
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.to
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? darkMode
                            ? "bg-gray-800 text-white font-semibold"
                            : "bg-white/20 text-white font-semibold"
                          : darkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-800"
                            : "text-purple-100 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

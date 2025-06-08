"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { to: "/", label: "Tes Kepribadian Anda" },
    { to: "/tes", label: "Mulai Tes" },
    { to: "/tipe-kepribadian", label: "Tipe Kepribadian" },
    { to: "/tentang", label: "Tentang Kami" },
  ]

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-3 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Tes Kepribadian</h1>
            <p className="text-xs text-blue-100">Platform Tes Terpercaya</p>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

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
                    ? "bg-white/20 text-white font-semibold shadow-lg"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/20 rounded-lg"
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
            className="md:hidden bg-black/20 backdrop-blur-sm border-t border-white/10"
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
                          ? "bg-white/20 text-white font-semibold"
                          : "text-blue-100 hover:text-white hover:bg-white/10"
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

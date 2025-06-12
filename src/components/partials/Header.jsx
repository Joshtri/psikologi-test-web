"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const handleStartTest = () => setShowConsent(true);

  if (showConsent) return <ConsentPage onBack={() => setShowConsent(false)} />;

  const navItems = [
    { to: "/", label: "Beranda" },
    // { to: "/test", label: "Mulai Tes", onClick: handleStartTest },
  ];

  return (
    <header className="top-0 z-50 shadow-md relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-white via-purple-100 to-amber-100 text-gray-800 transition-colors duration-300">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-amber-100/30" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-10 w-2 h-2 bg-purple-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-20 w-1 h-1 bg-amber-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-3 left-1/4 w-1.5 h-1.5 bg-purple-200/50 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-200/40 group-hover:bg-purple-300 transition-all duration-300">
            <Sparkles className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900">RaiReflect</h1>
            <p className="text-xs text-purple-600">Refleksi Diri Bermakna</p>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={item.onClick}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-purple-200 text-purple-900 font-semibold shadow-md"
                    : "text-purple-700 hover:bg-purple-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-purple-300/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
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
            className="md:hidden border-t border-purple-200 bg-white/80 backdrop-blur-sm"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.to;
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
                          ? "bg-purple-200 text-purple-900 font-semibold"
                          : "text-purple-700 hover:bg-purple-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

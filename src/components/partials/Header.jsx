"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ isRole }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = isRole === "Admin";

  const navItems = [{ to: "/", label: "Beranda" }];

  const adminItems = [
    { to: "/sys/g/dashboard", label: "Dashboard Admin" },
    { to: "/sys/respondents", label: "Data Responden" },
    { to: "/sys/master", label: "Data Master" },
    { to: "/sys/setting", label: "Pengaturan" },
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          {/* General Nav */}
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-purple-200 text-purple-900 font-semibold shadow-md"
                    : "text-purple-700 hover:bg-purple-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Admin Nav Group */}
          {isAdmin && (
            <div className="pl-4 ml-4 border-l border-purple-300 space-x-2 flex items-center">
              <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold">
                Admin Panel
              </span>
              {adminItems.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-3 py-2 rounded-md transition-all duration-300 group ${
                      isActive
                        ? "bg-amber-200 text-amber-900 font-semibold shadow-sm"
                        : "text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-purple-200 bg-white/80 backdrop-blur-sm px-4 py-4"
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg ${
                    pathname === item.to
                      ? "bg-purple-200 text-purple-900 font-semibold"
                      : "text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {isAdmin && (
                <div className="pt-4 border-t border-purple-300">
                  <p className="text-xs font-bold text-purple-600 mb-1 uppercase">
                    Admin Panel
                  </p>
                  {adminItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg ${
                        pathname === item.to
                          ? "bg-amber-200 text-amber-900 font-semibold"
                          : "text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

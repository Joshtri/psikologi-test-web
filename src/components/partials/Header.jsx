"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  Settings,
  Users,
  BarChart3,
  Database,
  Home,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ isRole }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const adminDropdownRef = useRef(null);

  // Handle clicks outside of dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target)
      ) {
        setAdminDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAdmin = isRole === "Admin";

  const navItems = [{ to: "/", label: "Beranda", icon: Home }];

  const adminItems = [
    { to: "/sys/dashboard", label: "Dashboard Admin", icon: BarChart3 },
    { to: "/sys/respondents", label: "Data Responden", icon: Users },
    { to: "/sys/master", label: "Data Master", icon: Database },
    { to: "/sys/respondents-results", label: "Hasil Responden", icon: Database },
  ];

  // Admin Header Design
  if (isAdmin) {
    return (
      <header className="top-0 z-50 shadow-lg relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Admin Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-3 left-16 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"></div>
          <div className="absolute top-5 right-32 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center relative z-10">
          {/* Admin Logo */}
          <Link
            to="/sys/dashboard"
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600/80 group-hover:bg-purple-500 transition-all duration-300 shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RaiReflect Admin</h1>
              <p className="text-xs text-purple-200">Panel Administrasi</p>
            </div>
          </Link>

          {/* Desktop Admin Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* Public Access */}
            <Link
              to="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-purple-200 hover:bg-purple-800/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Lihat Publik</span>
            </Link>

            <div className="w-px h-6 bg-purple-600 mx-2"></div>

            {/* Admin Dropdown */}
            <div className="relative" ref={adminDropdownRef}>
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-purple-100 hover:bg-purple-800/50 hover:text-white transition-all duration-300"
              >
                <Database className="w-4 h-4" />
                <span className="text-sm">Panel Admin</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    adminDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl py-2 z-50 border border-slate-700">
                  {adminItems.map((item) => {
                    const isActive = pathname === item.to;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setAdminDropdownOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                          isActive
                            ? "bg-purple-600 text-white font-semibold"
                            : "text-purple-100 hover:bg-purple-800/50 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-800/50 hover:bg-purple-700 text-purple-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Admin Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-purple-700 bg-slate-900/95 backdrop-blur-sm px-4 py-4"
            >
              <div className="space-y-2">
                {/* Public Access Mobile */}
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-800/50"
                >
                  <Home className="w-5 h-5" />
                  <span>Lihat Publik</span>
                </Link>

                <div className="border-t border-purple-700 my-2"></div>

                <div className="mb-3">
                  <p className="text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider px-4">
                    Panel Admin
                  </p>
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          pathname === item.to
                            ? "bg-purple-600 text-white font-semibold"
                            : "text-purple-100 hover:bg-purple-800/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }

  // Public Header Design (Original)
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
        {/* Public Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-200/40 group-hover:bg-purple-300 transition-all duration-300">
            <Sparkles className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-purple-900">RaiReflect</h1>
            <p className="text-xs text-purple-600">Refleksi Diri Bermakna</p>
          </div>
        </Link>

        {/* Desktop Public Nav */}
        <nav className="hidden md:flex items-center space-x-4">
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
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Public Nav */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

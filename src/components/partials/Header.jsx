import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Tes Kepribadian Anda" },
    { href: "/tes", label: "Mulai Tes" },
    { href: "/tipe-kepribadian", label: "Tipe Kepribadian" },
    { href: "/tentang", label: "Tentang Kami" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white shadow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Tes Kepribadian
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <Menu />
        </button>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  to={item.href}
                  className={`transition-colors duration-200 px-2 py-1 ${
                    isActive ? "text-white font-semibold" : "text-white/80"
                  } hover:text-white`}
                >
                  {item.label}
                </Link>
                {isActive ? (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-white w-full rounded-full"
                    layoutId="navbar-underline"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white rounded-full group-hover:w-full transition-all duration-300" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  to={item.href}
                  className={`block px-2 py-1 ${
                    isActive ? "text-white font-semibold" : "text-white/80"
                  } hover:text-white`}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </motion.header>
  );
}

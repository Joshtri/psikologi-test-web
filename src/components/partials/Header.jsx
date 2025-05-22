import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Tes Kepribadian Anda" },
    { to: "/tes", label: "Mulai Tes" },
    { to: "/tipe-kepribadian", label: "Tipe Kepribadian" },
    { to: "/tentang", label: "Tentang Kami" },
  ];

  return (
    <header className="bg-blue-600 text-white shadow">
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
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors duration-200 px-2 py-1 ${
                  isActive ? "text-white font-semibold" : "text-white/80"
                } hover:text-white`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-2 py-1 ${
                  isActive ? "text-white font-semibold" : "text-white/80"
                } hover:text-white`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

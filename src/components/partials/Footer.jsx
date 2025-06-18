"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function FooterCustom() {
  return (
    <footer className="bg-gradient-to-tr from-purple-50 via-white to-amber-50 text-gray-700 border-t border-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand & Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-purple-800">Penelitian Psikologi 2025</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

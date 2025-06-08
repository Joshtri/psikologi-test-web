import { motion } from "framer-motion"

export function StatBlock({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:scale-[1.03] transition-transform duration-300 ease-out">
        <div className="text-5xl font-bold mb-2">{value}</div>
        <div className="text-lg text-blue-100">{label}</div>
      </div>
    </motion.div>
  )
}

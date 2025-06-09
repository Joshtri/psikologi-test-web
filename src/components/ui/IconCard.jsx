import { motion } from "framer-motion"

export function IconCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
        <Icon className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </motion.div>
  )
}

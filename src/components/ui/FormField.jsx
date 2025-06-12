import { motion } from "framer-motion";

export default function FormField({
  field,
  register,
  errors,
  watch,
  getFieldIcon,
  index,
}) {
  const IconComponent = getFieldIcon(field.name);
  const hasError = errors[field.name] && field.required;
  const isCompleted = watch(field.name);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-md ${
        hasError
          ? "bg-red-50 border-red-200"
          : isCompleted
          ? "bg-purple-50 border-purple-200"
          : field.disabled
          ? "bg-amber-50 border-amber-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              hasError
                ? "bg-red-100 text-red-600"
                : isCompleted
                ? "bg-purple-100 text-purple-600"
                : field.disabled
                ? "bg-amber-100 text-amber-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1">
          <label
            className={`block text-sm font-semibold mb-3 ${
              hasError
                ? "text-red-800"
                : isCompleted
                ? "text-purple-800"
                : field.disabled
                ? "text-amber-800"
                : "text-gray-700"
            }`}
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "select" ? (
            <select
              {...register(field.name, { required: field.required })}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 transition-all duration-200 ${
                hasError
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : isCompleted
                  ? "border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              }`}
              defaultValue=""
            >
              <option value="">Pilih {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              disabled={field.disabled}
              {...register(field.name, { required: field.required })}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 transition-all duration-200 ${
                field.disabled
                  ? "bg-amber-50 border-amber-200 cursor-not-allowed"
                  : hasError
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : isCompleted
                  ? "border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              }`}
              placeholder={
                field.disabled
                  ? "Akan terisi otomatis"
                  : `Masukkan ${field.label.toLowerCase()}`
              }
            />
          )}

          {hasError && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 inline-block font-medium"
            >
              {field.label} wajib diisi
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

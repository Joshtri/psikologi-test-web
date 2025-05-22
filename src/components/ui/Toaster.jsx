import { Toast, ToastToggle } from "flowbite-react";
import { motion as Motion } from "framer-motion";
import { AlertTriangle, Check, Info, Send, X } from "lucide-react";
import { useEffect } from "react";

const toastStyles = {
  success: {
    bg: "bg-green-100 dark:bg-green-800",
    text: "text-green-500 dark:text-green-200",
    icon: Check,
  },
  error: {
    bg: "bg-red-100 dark:bg-red-800",
    text: "text-red-500 dark:text-red-200",
    icon: X,
  },
  warning: {
    bg: "bg-orange-100 dark:bg-orange-700",
    text: "text-orange-500 dark:text-orange-200",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-cyan-100 dark:bg-cyan-800",
    text: "text-cyan-500 dark:text-cyan-200",
    icon: Info,
  },
  telegram: {
    bg: "",
    text: "text-cyan-600 dark:text-cyan-500",
    icon: Send,
  },
};

const positionStyles = {
  "top-left": "fixed top-13 left-4",
  "top-right": "fixed top-13 right-4",
  "bottom-left": "fixed bottom-4 left-4",
  "bottom-right": "fixed bottom-4 right-4",
  center: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export default function Toaster({
  type = "info",
  message,
  showToggle = true,
  customIcon,
  align = "bottom-right",
  className = "",
  onClose,
  duration = 3000, // default auto-close in 3 seconds
}) {
  const { bg, text, icon: DefaultIcon } = toastStyles[type] || toastStyles.info;
  const Icon = customIcon || DefaultIcon;
  const positionClass = positionStyles[align] || positionStyles["bottom-right"];

  // Auto-close effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Motion.div
      initial={{ opacity: 0, x: align.includes("right") ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: align.includes("right") ? 20 : -20 }}
      transition={{ duration: 0.3 }}
      className={positionClass}
    >
      <Toast className={`flex items-center ${className}`}>
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg} ${text} ${
            type === "telegram" ? "bg-transparent" : ""
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={`ml-3 text-sm font-normal ${
            type === "telegram" ? "pl-4" : ""
          }`}
        >
          {message}
        </div>
        {showToggle && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        )}
      </Toast>
    </Motion.div>
  );
}

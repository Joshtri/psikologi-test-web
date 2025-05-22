import React, { createContext, useCallback, useContext, useState } from "react";
import Toaster from "../components/ui/Toaster";
import { AnimatePresence } from "framer-motion";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3000); // default 3s
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="z-50 fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toaster
              key={toast.id}
              {...toast}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

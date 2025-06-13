import { useEffect, useState } from "react";

export default function LeavePagePrompt({
  when,
  message = "Apakah Anda yakin ingin meninggalkan halaman ini? Perubahan belum disimpan akan hilang.",
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [shouldLeave, setShouldLeave] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!when) return;
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handlePopState = () => {
      if (when && !shouldLeave) {
        setShowDialog(true);
        window.history.pushState(null, "", window.location.href); // push ulang supaya tetap stay
      }
    };

    if (when) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [when, message, shouldLeave]);

  const confirmLeave = () => {
    setShowDialog(false);
    setShouldLeave(true);
    window.history.back(); // now allow back
  };

  const cancelLeave = () => {
    setShowDialog(false);
  };

  return (
    showDialog && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center border border-purple-300">
          <h3 className="text-lg font-semibold mb-2 text-purple-800">
            Konfirmasi
          </h3>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmLeave}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Keluar
            </button>
            <button
              onClick={cancelLeave}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    )
  );
}

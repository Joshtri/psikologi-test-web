// components/ui/ActionButtons.jsx
import React, { useState } from "react";

export default function ActionButtons({ onDetail, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    onDelete?.();
  };

  return (
    <div className="flex space-x-2">
      {onDetail && (
        <button
          onClick={onDetail}
          className="text-blue-600 hover:underline text-xs"
        >
          Detail
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-green-600 hover:underline text-xs"
        >
          Edit
        </button>
      )}
      {onDelete && (
        <>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-600 hover:underline text-xs"
          >
            Hapus
          </button>

          {/* Modal konfirmasi */}
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                <p className="text-sm mb-4">
                  Apakah Anda yakin ingin menghapus data ini?
                </p>
                <div className="flex justify-end space-x-2 text-sm">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setShowConfirm(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

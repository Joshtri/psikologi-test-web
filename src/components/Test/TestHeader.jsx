export default function TestHeader({ title, description, progress }) {
  return (
    <>
      {/* Judul dan waktu - tidak sticky */}
      <div className="px-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
      </div>

      {/* Sticky progress bar only */}
      <div className="sticky top-0 z-40 bg-white border-b border-purple-200 shadow px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress Keseluruhan</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-amber-500 h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

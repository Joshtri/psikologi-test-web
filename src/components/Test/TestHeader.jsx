import { Clock, Heart } from "lucide-react";

export default function TestHeader({ title, description, progress, timeElapsed }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mb-8 sticky top-4 z-40 rounded-2xl shadow-xl backdrop-blur-sm border bg-white/95 border-purple-200">
      <div className="p-6 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && <p className="text-gray-600">{description}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center px-3 py-2 rounded-lg bg-purple-100 text-purple-700">
              <Clock className="w-4 h-4 mr-2" />
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2 text-gray-600">
              <span>Progress Keseluruhan</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-amber-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

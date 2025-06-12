import { CheckCircle, Circle } from "lucide-react";

export default function VerticalStepper({ steps, currentStep }) {
  return (
    <>
      {/* Desktop: Slim vertical center right with label */}
      <div className="hidden lg:flex flex-col fixed top-1/2 right-2 -translate-y-1/2 z-40 bg-white rounded-xl shadow border border-purple-200 p-2 gap-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-500 text-white border-purple-500"
                      : isCompleted
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-200 text-gray-400 border-gray-300"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-2.5 h-2.5" />
                )}
              </div>
              <span className="text-[10px] text-center text-gray-600 w-10 leading-tight">
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertikal kecil di kiri bawah */}
      <div className="lg:hidden fixed bottom-2 left-2 z-40 bg-white border shadow-md rounded-xl px-2 py-3 flex flex-col items-center gap-2 max-h-[90vh] overflow-y-auto">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-500 text-white border-purple-500"
                      : isCompleted
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-200 text-gray-400 border-gray-300"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <Circle className="w-2 h-2" />
                )}
              </div>
              <span className="text-[9px] text-center text-gray-600 w-8 leading-tight">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

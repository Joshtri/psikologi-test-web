import { CheckCircle, Circle } from "lucide-react";

export default function VerticalStepper({ steps, currentStep }) {
  return (
    <div className="fixed top-24 right-4 z-50 hidden lg:flex flex-col gap-3 bg-white shadow-xl border border-purple-200 rounded-xl p-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : isCompleted
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
          >
            {isCompleted ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            {step}
          </div>
        );
      })}
    </div>
  );
}

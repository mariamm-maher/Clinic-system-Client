import { User, MapPin, Briefcase, FileText, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function StepIndicator() {
  const location = useLocation();
  // Extract step from URL path (e.g., /doctor-dashboard/staff/create/3 -> 3)
  const pathParts = location.pathname.split('/');
  const stepFromPath = pathParts[pathParts.length - 1];
  console.log("Step from path:", stepFromPath, "Full path:", location.pathname);
  
  // Parse step from URL path directly
  const currentStep = stepFromPath && !isNaN(parseInt(stepFromPath)) ? parseInt(stepFromPath) : 1;
  const displayStep = currentStep >= 1 && currentStep <= 4 ? currentStep : 1;

  const steps = [
    { num: 1, title: "Basic Info", icon: User },
    { num: 2, title: "Personal", icon: MapPin },
    { num: 3, title: "Professional", icon: Briefcase },
    { num: 4, title: "Review", icon: FileText },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = step.num === displayStep;
          const isCompleted = step.num < displayStep;

          return (
            <div key={step.num} className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg transform scale-110"
                      : isCompleted
                      ? "bg-green-600 text-white border-green-600 shadow-md"
                      : "bg-white text-gray-400 border-gray-300 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor: isActive ? '#2563eb' : isCompleted ? '#16a34a' : '#ffffff',
                    color: isActive || isCompleted ? '#ffffff' : '#9ca3af',
                    borderColor: isActive ? '#2563eb' : isCompleted ? '#16a34a' : '#d1d5db'
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : isCompleted
                      ? "text-green-600 font-semibold"
                      : "text-gray-400"
                  }`}
                  style={{
                    color: isActive ? '#2563eb' : isCompleted ? '#16a34a' : '#9ca3af'
                  }}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight
                  className={`w-5 h-5 mx-4 transition-colors duration-300 ${
                    step.num < displayStep ? "text-green-600" : "text-gray-300"
                  }`}
                  style={{
                    color: step.num < displayStep ? '#16a34a' : '#d1d5db'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

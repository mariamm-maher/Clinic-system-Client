import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { TOTAL_STEPS } from "./staffFormStore";

export default function NavigationButtons({
  isLoading,
  onCancel,
  onSubmit,
  prevStepDisabled = false,
  nextStepDisabled = false,
  validateCurrentStep,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract step from URL path (same logic as StepIndicator)
  const pathParts = location.pathname.split('/');
  const stepFromPath = pathParts[pathParts.length - 1];
  const currentStep = stepFromPath && !isNaN(parseInt(stepFromPath)) ? parseInt(stepFromPath) : 1;
  
  // Use current step from URL as single source of truth
  const isLastStep = currentStep === TOTAL_STEPS;
  
  const handlePrev = () => {
    if (currentStep > 1) {
      navigate(`/doctor-dashboard/staff/create/${currentStep - 1}`);
    }
  };

  const handleNext = () => {
    // Validate current step if validation function is provided
    if (validateCurrentStep && !validateCurrentStep()) {
      return; // Don't navigate if validation fails
    }
    
    if (currentStep < TOTAL_STEPS) {
      navigate(`/doctor-dashboard/staff/create/${currentStep + 1}`);
    }
  };

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrev}
        disabled={prevStepDisabled || currentStep === 1}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>

        {!isLastStep ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={nextStepDisabled}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isLoading}
            onClick={onSubmit}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Staff Member
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

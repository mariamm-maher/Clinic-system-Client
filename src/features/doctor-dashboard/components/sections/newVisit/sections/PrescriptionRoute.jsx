import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { PrescriptionStep } from ".";
import { NavigationButtons } from "../navigation";

export default function PrescriptionRoute() {
  const navigate = useNavigate();
  const { validateStep, isLoading, resetForm, submitForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    return validateStep(7);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      try {
        await submitForm();
        // Navigate to success page or back to patients list
        navigate("/doctor-dashboard/patients");
      } catch (error) {
        console.error("Failed to submit visit:", error);
        // Error handling is done in the store
      }
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PrescriptionStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

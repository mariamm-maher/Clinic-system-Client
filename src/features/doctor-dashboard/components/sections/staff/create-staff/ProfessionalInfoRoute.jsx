import { useNavigate } from "react-router-dom";
import { useStaffFormStore } from "./staffFormStore";
import { ProfessionalInfoStep, NavigationButtons } from ".";

export default function ProfessionalInfoRoute() {
  const navigate = useNavigate();
  const { isLoading, resetForm } = useStaffFormStore();

  const validateCurrentStep = () => {
    // No validation required for step 3
    return true;
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/staff");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ProfessionalInfoStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

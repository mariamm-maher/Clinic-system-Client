import { useNavigate } from "react-router-dom";
import { useStaffFormStore } from "./staffFormStore";
import { PersonalInfoStep, NavigationButtons } from ".";

export default function PersonalInfoRoute() {
  const navigate = useNavigate();
  const { validateStep, isLoading, resetForm } = useStaffFormStore();

  const validateCurrentStep = () => {
    return validateStep(2);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/staff");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PersonalInfoStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

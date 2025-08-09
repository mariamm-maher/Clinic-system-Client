import { useStaffFormStore } from "./staffFormStore";
import { BasicInfoStep, NavigationButtons } from ".";
import { useNavigate } from "react-router-dom";

export default function BasicInfoRoute() {
  const navigate = useNavigate();
  const { validateStep, isLoading, resetForm } = useStaffFormStore();

  const validateCurrentStep = () => {
    return validateStep(1);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/staff");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <BasicInfoStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

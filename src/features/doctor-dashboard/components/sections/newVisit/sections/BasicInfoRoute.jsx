import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { BasicInfoStep } from ".";
import { NavigationButtons } from "../navigation";

export default function BasicInfoRoute() {
  const navigate = useNavigate();
  const { validateStep, isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    return validateStep(1);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
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

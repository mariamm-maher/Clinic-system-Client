import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { MainComplaintStep } from ".";
import { NavigationButtons } from "../navigation";

export default function MainComplaintRoute() {
  const navigate = useNavigate();
  const { validateStep, isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    return validateStep(3);
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <MainComplaintStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

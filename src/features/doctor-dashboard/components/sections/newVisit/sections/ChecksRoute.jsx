import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { ChecksStep } from ".";
import { NavigationButtons } from "../navigation";

export default function ChecksRoute() {
  const navigate = useNavigate();
  const { isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    // No validation required for checks step
    return true;
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ChecksStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

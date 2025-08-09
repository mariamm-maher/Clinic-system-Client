import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { PastHistoryStep } from ".";
import { NavigationButtons } from "../navigation";

export default function PastHistoryRoute() {
  const navigate = useNavigate();
  const { isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    // No validation required for past history step
    return true;
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PastHistoryStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

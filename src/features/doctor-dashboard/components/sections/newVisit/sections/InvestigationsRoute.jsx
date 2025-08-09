import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { InvestigationsStep } from ".";
import { NavigationButtons } from "../navigation";

export default function InvestigationsRoute() {
  const navigate = useNavigate();
  const { isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    // No validation required for investigations step
    return true;
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InvestigationsStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

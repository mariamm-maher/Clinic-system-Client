import { useNavigate } from "react-router-dom";
import { useNewVisitStore } from "../store/newVisitStore";
import { ExaminationStep } from ".";
import { NavigationButtons } from "../navigation";

export default function ExaminationRoute() {
  const navigate = useNavigate();
  const { isLoading, resetForm } = useNewVisitStore();

  const validateCurrentStep = () => {
    // No validation required for examination step
    return true;
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/patients");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ExaminationStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        validateCurrentStep={validateCurrentStep}
      />
    </form>
  );
}

import { useNavigate } from "react-router-dom";
import { ReviewStep, NavigationButtons } from ".";
import { useStaffFormStore } from "./staffFormStore";

export default function ReviewRoute() {
  const navigate = useNavigate();
  const { handleSubmit, isLoading, resetForm } = useStaffFormStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    // Call the handleSubmit from the store
    const success = await handleSubmit(e);
    // Navigate after successful submission
    // if (success) {
    //   navigate("/doctor-dashboard/staff");
    // }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/staff");
  };

  return (
    <form onSubmit={onSubmit}>
      <ReviewStep />
      <NavigationButtons
        isLoading={isLoading}
        onCancel={handleCancel}
        onSubmit={onSubmit}
      />
    </form>
  );
}

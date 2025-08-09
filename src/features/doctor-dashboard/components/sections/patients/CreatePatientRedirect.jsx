import { useNavigate } from "react-router-dom";
import CreatePatientContainer from "./create-patient/CreatePatientContainer";

export default function CreatePatientRedirect() {
  const navigate = useNavigate();

  return (
    <CreatePatientContainer
      onCancel={() => navigate("/doctor-dashboard/patients")}
    />
  );
}

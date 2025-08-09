import { useParams } from "react-router-dom";
import PatientDetailsContainer from "./patient-details/PatientDetailsContainer";

export default function PatientDetailRedirect() {
  const { id } = useParams();

  return <PatientDetailsContainer patientId={id} />;
}

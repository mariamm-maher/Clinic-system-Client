import { useOutletContext } from "react-router-dom";
import { ProfessionalInfoView } from "../index";

export default function ProfessionalInfoRoute() {
  const { staffData } = useOutletContext();

  return <ProfessionalInfoView staffData={staffData} />;
}

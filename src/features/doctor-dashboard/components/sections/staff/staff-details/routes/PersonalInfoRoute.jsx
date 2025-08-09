import { useOutletContext } from "react-router-dom";
import { PersonalInfoView } from "../index";

export default function PersonalInfoRoute() {
  const { staffData } = useOutletContext();

  return <PersonalInfoView staffData={staffData} />;
}

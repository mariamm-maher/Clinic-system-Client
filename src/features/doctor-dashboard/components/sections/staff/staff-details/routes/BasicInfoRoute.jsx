import { useOutletContext } from "react-router-dom";
import { BasicInfoView } from "../index";

export default function BasicInfoRoute() {
  const { staffData } = useOutletContext();

  return <BasicInfoView staffData={staffData} />;
}

import { useOutletContext } from "react-router-dom";
import { OverviewView } from "../index";

export default function OverviewRoute() {
  const { staffData } = useOutletContext();

  return <OverviewView staffData={staffData} />;
}

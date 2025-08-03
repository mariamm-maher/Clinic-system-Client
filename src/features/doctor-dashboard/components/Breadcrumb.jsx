import { useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "schedule", label: "Schedule" },
  { id: "appointments", label: "Appointments" },
  { id: "patients", label: "Patients" },
  { id: "staff", label: "Staff" },
  { id: "statistics", label: "Statistics" },
  { id: "settings", label: "Settings" },
];

export default function Breadcrumb() {
  const location = useLocation();

  const getCurrentSection = () => {
    const path = location.pathname;
    const section = path.split("/").pop();
    return (
      navigationItems.find((item) => item.id === section)?.label || "Dashboard"
    );
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Home className="w-4 h-4" />
      <span>Dashboard</span>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">{getCurrentSection()}</span>
    </div>
  );
}

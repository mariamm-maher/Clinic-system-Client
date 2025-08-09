import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "overview", label: "Overview", path: "/doctor-dashboard" },
  { id: "schedule", label: "Schedule", path: "/doctor-dashboard/schedule" },
  {
    id: "appointments",
    label: "Appointments",
    path: "/doctor-dashboard/appointments",
  },
  { id: "patients", label: "Patients", path: "/doctor-dashboard/patients" },
  { id: "staff", label: "Staff", path: "/doctor-dashboard/staff" },
  {
    id: "statistics",
    label: "Statistics",
    path: "/doctor-dashboard/statistics",
  },
  { id: "settings", label: "Settings", path: "/doctor-dashboard/settings" },
];

// Step mapping for create staff workflow
const createStaffSteps = {
  1: "Basic Information",
  2: "Personal Details",
  3: "Professional Info",
  4: "Review & Submit",
};

// Tab mapping for staff details workflow
const staffDetailsTabs = {
  overview: "Overview",
  basic: "Basic Information",
  personal: "Personal Details",
  professional: "Professional Info",
};

export default function Breadcrumb({ className }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items from path segments
  const breadcrumbItems = [];

  // Always start with Dashboard
  breadcrumbItems.push({
    label: "Dashboard",
    path: "/doctor-dashboard",
    isActive: location.pathname === "/doctor-dashboard",
  });
  // Add subsequent path segments
  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    if (segment === "doctor-dashboard") {
      currentPath = "/doctor-dashboard";
      return;
    }

    currentPath += `/${segment}`; // Special handling for create staff steps
    if (pathSegments.includes("create") && pathSegments.includes("staff")) {
      const stepNumber = segment;
      if (createStaffSteps[stepNumber]) {
        const isLast = index === pathSegments.length - 1;
        breadcrumbItems.push({
          label: createStaffSteps[stepNumber],
          path: currentPath,
          isActive: isLast,
        });
        return;
      }
    }

    // Special handling for staff details tabs
    if (pathSegments.includes("staff") && !pathSegments.includes("create")) {
      const tabName = segment;
      if (staffDetailsTabs[tabName]) {
        const isLast = index === pathSegments.length - 1;
        breadcrumbItems.push({
          label: staffDetailsTabs[tabName],
          path: currentPath,
          isActive: isLast,
        });
        return;
      }
    }

    // Find the matching navigation item or create a default one
    const navItem = navigationItems.find(
      (item) => item.path === currentPath || item.id === segment
    );

    const isLast = index === pathSegments.length - 1;

    // Special labels for common paths
    let label = navItem?.label;
    if (!label) {
      switch (segment) {
        case "create":
          label = "Create New";
          break;
        case "edit":
          label = "Edit";
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
    }

    breadcrumbItems.push({
      label,
      path: currentPath,
      isActive: isLast,
    });
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm mb-6", className)}
    >
      <Home className="h-4 w-4 text-gray-400" />

      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}

          {item.isActive ? (
            <span className="font-medium text-gray-900 truncate">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 truncate hover:underline"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  UserCog,
  BarChart3,
  Settings,
} from "lucide-react";

// Import smaller components
import SidebarHeader from "./sidebar/SidebarHeader";
import NavigationMenu from "./sidebar/NavigationMenu";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard/overview",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    path: "/dashboard/schedule",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Clock,
    path: "/dashboard/appointments",
  },
  {
    id: "patients",
    label: "Patients",
    icon: Users,
    path: "/dashboard/patients",
  },
  {
    id: "staff",
    label: "Staff",
    icon: UserCog,
    path: "/dashboard/staff",
  },
  {
    id: "statistics",
    label: "Statistics",
    icon: BarChart3,
    path: "/dashboard/statistics",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active section from URL
  const getCurrentSection = () => {
    const path = location.pathname;
    const segments = path.split("/");
    // Get the section after 'dashboard'
    const sectionIndex = segments.indexOf("dashboard") + 1;
    return segments[sectionIndex] || "overview";
  };

  const activeSection = getCurrentSection();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <TooltipProvider>
      {" "}
      <motion.aside
        className={cn(
          "bg-white/95 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-lg",
          "fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen",
          isCollapsed ? "w-20" : "w-72",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
        animate={{
          width: isCollapsed ? 80 : 288,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Clean background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" />

        <div className="relative z-10 flex flex-col h-full">
          <SidebarHeader
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          <NavigationMenu
            navigationItems={navigationItems}
            activeSection={activeSection}
            isCollapsed={isCollapsed}
            handleNavigation={handleNavigation}
          />
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

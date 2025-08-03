import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence mode="wait">
        {/* Mobile backdrop overlay */}

        <motion.aside
          key={isCollapsed ? "collapsed" : "expanded"}
          className={cn(
            "relative flex flex-col shadow-2xl overflow-hidden",
            "fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen",
            "transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-72",
            isMobileMenuOpen
              ? "translate-x-0 "
              : "-translate-x-full lg:translate-x-0"
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            width: isCollapsed ? 80 : 384,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            minWidth: isCollapsed ? "100px" : "300px",
            maxWidth: isCollapsed ? "100px" : "300px",
          }}
        >
          {/* Enhanced background with multiple layers */}

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />{" "}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/70 border-r border-blue-100/50" />{" "}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Content with higher z-index */}
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
      </AnimatePresence>
    </TooltipProvider>
  );
}

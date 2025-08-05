import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  UserCog,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Menu,
  LogOut,
  Bell,
  Star,
} from "lucide-react";
import { LogoutButton } from "@/features/auth";
import SidebarHeader from "./sidebar/SidebarHeader";
import NavigationMenu from "./sidebar/NavigationMenu";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Dashboard summary",
    icon: LayoutDashboard,
    path: "/doctor-dashboard",
    badge: null,
  },
  {
    id: "schedule",
    label: "Schedule",
    subtitle: "Your calendar",
    icon: Calendar,
    path: "/doctor-dashboard/schedule",
    badge: null,
  },
  {
    id: "appointments",
    label: "Appointments",
    subtitle: "Patient bookings",
    icon: Clock,
    path: "/doctor-dashboard/appointments",
    badge: "3",
  },
  {
    id: "patients",
    label: "Patients",
    subtitle: "Patient records",
    icon: Users,
    path: "/doctor-dashboard/patients",
    badge: null,
  },
  {
    id: "staff",
    label: "Staff",
    subtitle: "Team management",
    icon: UserCog,
    path: "/doctor-dashboard/staff",
    badge: null,
  },
  {
    id: "statistics",
    label: "Statistics",
    subtitle: "Analytics & reports",
    icon: BarChart3,
    path: "/doctor-dashboard/statistics",
    badge: null,
  },
  {
    id: "settings",
    label: "Settings",
    subtitle: "Preferences",
    icon: Settings,
    path: "/doctor-dashboard/settings",
    badge: null,
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

    // Handle exact dashboard root path
    if (path === "/doctor-dashboard" || path === "/doctor-dashboard/") {
      return "overview";
    }

    const segments = path.split("/").filter(Boolean);

    // Find the section after 'doctor-dashboard'
    const dashboardIndex = segments.findIndex(
      (segment) => segment === "doctor-dashboard"
    );
    if (dashboardIndex !== -1 && dashboardIndex + 1 < segments.length) {
      return segments[dashboardIndex + 1];
    }

    // Default to overview if no specific section found
    return "overview";
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
        {/* Mobile backdrop overlay */}{" "}
        <motion.aside
          key={isCollapsed ? "collapsed" : "expanded"}
          className={cn(
            "relative flex flex-col shadow-2xl overflow-hidden",
            "fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen",
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
            height: "100vh",
            maxHeight: "100vh",
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
          </div>{" "}
          {/* Content with higher z-index */}
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <SidebarHeader
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />{" "}
            <div className="flex-1 min-h-0">
              <NavigationMenu
                navigationItems={navigationItems}
                activeSection={activeSection}
                isCollapsed={isCollapsed}
                handleNavigation={handleNavigation}
              />
            </div>{" "}
            {/* Logout Button at the bottom */}
            <div className="p-4 border-t border-blue-100/30 flex-shrink-0">
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full h-12 p-0 text-gray-600 hover:text-red-600 hover:bg-red-50",
                        "rounded-2xl border border-transparent hover:border-red-200/50",
                        "transition-all duration-300 hover:shadow-md",
                        "flex items-center justify-center"
                      )}
                      onClick={() => {
                        // Add logout logic here or use LogoutButton's onClick
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Sign Out</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <LogoutButton
                  variant="ghost"
                  size="default"
                  className={cn(
                    "w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50",
                    "rounded-2xl p-4 h-auto min-h-[3rem] border border-transparent",
                    "hover:border-red-200/50 transition-all duration-300 hover:shadow-md",
                    "group relative overflow-hidden"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 group-hover:bg-red-50 transition-all duration-300">
                      <LogOut className="w-5 h-5 transition-all duration-300" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">Sign Out</span>
                      <span className="text-xs text-gray-500 group-hover:text-red-500 transition-colors duration-300">
                        End session
                      </span>
                    </div>
                  </div>
                </LogoutButton>
              )}
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </TooltipProvider>
  );
}

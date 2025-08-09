import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    badge: null,
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
  return (
    <TooltipProvider>
      {/* Mobile backdrop overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.aside
          key={isCollapsed ? "collapsed" : "expanded"}
          className={cn(
            "relative flex flex-col shadow-2xl",
            "fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0",
            "h-screen max-h-screen lg:h-screen lg:max-h-screen",
            "transition-all duration-300 ease-in-out",
            "overflow-hidden", // Prevent default scrolling, we'll handle it internally
            // Enhanced mobile responsiveness
            "touch-pan-y", // Allow vertical touch scrolling
            "overscroll-contain", // Prevent scroll chaining
            isMobileMenuOpen
              ? "translate-x-0 "
              : "-translate-x-full lg:translate-x-0"
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            width: isCollapsed && !isMobileMenuOpen ? 80 : 300,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            minWidth: isCollapsed && !isMobileMenuOpen ? "90px" : "260px",
            maxWidth: isCollapsed && !isMobileMenuOpen ? "90px" : "260px",
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
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0">
              <SidebarHeader
                isCollapsed={isCollapsed && !isMobileMenuOpen}
                setIsCollapsed={setIsCollapsed}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>{" "}
            {/* Scrollable Navigation Area */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth
                          scrollbar-thin scrollbar-thumb-blue-200/50 scrollbar-track-transparent 
                          hover:scrollbar-thumb-blue-300/50 touch-pan-y overscroll-contain
                          supports-[overflow:overlay]:overflow-overlay"
            >
              {" "}
              <div className="h-full">
                <NavigationMenu
                  navigationItems={navigationItems}
                  isCollapsed={isCollapsed && !isMobileMenuOpen}
                />
              </div>
            </div>{" "}
            {/* Footer - Fixed at bottom */}
            <div className="flex-shrink-0 p-3 sm:p-4 border-t border-blue-100/30">
              {isCollapsed && !isMobileMenuOpen ? (
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
                  size="sm"
                  className={cn(
                    "w-full justify-start text-gray-600 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50",
                    "rounded-xl p-2 h-auto min-h-[2.5rem] border border-transparent",
                    "hover:border-red-200/50 transition-all duration-300 hover:shadow-md",
                    "group relative overflow-hidden"
                  )}
                >
                  {" "}
                  {/* Background glow effect for hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/0 to-red-400/0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  {/* Icon container - matching navigation items */}
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-red-50 group-hover:shadow-sm transition-all duration-300 relative">
                    <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-all duration-300" />
                  </div>
                  {/* Text content - matching navigation items */}
                  <div className="flex-1 flex items-center justify-between ml-2 overflow-hidden">
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="font-medium text-sm text-gray-900 group-hover:text-red-600 transition-colors duration-300 truncate">
                        Sign Out
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-red-500 font-normal truncate transition-colors duration-300">
                        End session
                      </span>
                    </div>

                    {/* Arrow indicator - matching navigation items */}
                    <div className="transition-all duration-300 opacity-0 group-hover:opacity-60">
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
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

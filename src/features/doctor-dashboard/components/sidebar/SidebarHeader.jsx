import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { clinicConfig } from "@/lib/config";
import {
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  Crown,
} from "lucide-react";

export default function SidebarHeader({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  return (
    <motion.div
      className="p-2.5 sm:p-3 border-b border-gray-200/50 flex-shrink-0 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {" "}
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
      <div className="relative z-10 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          animate={{
            opacity: isCollapsed ? 0 : 1,
            x: isCollapsed ? -20 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {!isCollapsed && (
            <>
              {" "}
              {/* Simple logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Stethoscope className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
              {/* Simple clinic info */}
              <div className="flex-1">
                <h2 className="font-bold text-base bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {clinicConfig.name}
                </h2>
              </div>
            </>
          )}{" "}
        </motion.div>

        {/* Desktop collapse button and Mobile menu button */}
        <div className="flex items-center space-x-2">
          {" "}
          {/* Mobile menu button - visible only on mobile */}{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden h-10 w-10 p-0 rounded-xl transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
              "border border-transparent hover:border-blue-200/50",
              "shadow-sm hover:shadow-md",
              "items-center justify-center shrink-0",
              isMobileMenuOpen ? "mr-5" : "mr-0"
            )}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center "
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
              ) : (
                <Menu className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
              )}
            </motion.div>
          </Button>
          {/* Desktop collapse button - visible only on desktop */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "hidden lg:flex h-10 w-10 p-0 rounded-xl transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
              "border border-transparent hover:border-blue-200/50",
              "shadow-sm hover:shadow-md",
              "items-center justify-center shrink-0",
              isCollapsed ? "mr-5" : "mr-0"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

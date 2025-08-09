import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function NavigationItem({ item, isCollapsed, index }) {
  const location = useLocation();
  const IconComponent = item.icon;

  // Check if current route matches this item's path
  const isActive =
    location.pathname === item.path ||
    (item.path !== "/doctor-dashboard" &&
      location.pathname.startsWith(item.path));

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };
  return (
    <motion.div variants={itemVariants} className="w-full overflow-hidden">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            className={cn(
              "w-full justify-start relative group transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-purple-50/60",
              "hover:border-blue-200/30 border border-transparent",
              "rounded-xl p-2.5 h-auto min-h-[2.5rem]",
              "overflow-hidden flex items-center",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              isActive && [
                "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600",
                "text-white shadow-md shadow-blue-500/20",
                "border-blue-300/40",
                "hover:shadow-lg hover:shadow-blue-500/25",
              ],
              isCollapsed && "justify-center px-2"
            )}
          >
            {" "}
            {/* Background glow effect for active item */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-400/15 to-indigo-400/15 rounded-xl blur-md opacity-40" />
            )}
            {/* Icon container */}{" "}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-lg transition-all duration-300",
                "w-8 h-8 flex-shrink-0",
                isActive
                  ? "bg-white/20 shadow-sm backdrop-blur-sm"
                  : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm"
              )}
            >
              {" "}
              <IconComponent
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  isActive
                    ? "text-white drop-shadow-sm"
                    : "text-gray-600 group-hover:text-blue-600"
                )}
              />{" "}
              {/* Simple active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-white/10 rounded-lg opacity-25" />
              )}
            </div>{" "}
            {/* Text content */}
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between ml-2.5 overflow-hidden">
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span
                    className={cn(
                      "font-semibold text-sm transition-colors duration-300 truncate",
                      isActive
                        ? "text-white drop-shadow-sm"
                        : "text-gray-900 group-hover:text-gray-900"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Subtitle - always show if available */}
                  {item.subtitle && (
                    <span
                      className={cn(
                        "text-xs font-medium truncate transition-colors duration-300",
                        isActive
                          ? "text-white/80"
                          : "text-gray-500 group-hover:text-gray-600"
                      )}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {/* Arrow indicator */}{" "}
                  <div
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "opacity-70"
                        : "opacity-0 group-hover:opacity-50"
                    )}
                  >
                    {" "}
                    <ChevronRight
                      className={cn(
                        "w-3.5 h-3.5 transition-colors duration-300",
                        isActive
                          ? "text-white/70"
                          : "text-gray-400 group-hover:text-blue-500"
                      )}
                    />
                  </div>
                </div>
              </div>
            )}{" "}
            {/* Hover effect overlay */}{" "}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-indigo-400/0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              whileHover={{ opacity: 0.05 }}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="text-center">
            <p className="font-medium">{item.label}</p>
            {item.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}

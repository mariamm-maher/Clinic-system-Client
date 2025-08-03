import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function NavigationItem({
  item,
  isActive,
  isCollapsed,
  onClick,
  index,
}) {
  const IconComponent = item.icon;

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
          <Button
            variant="ghost"
            onClick={onClick}
            className={cn(
              "w-full justify-start relative group transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
              "hover:border-blue-200/50 border border-transparent",
              "rounded-2xl p-4 h-auto min-h-[3.5rem]",
              "overflow-hidden",
              isActive && [
                "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600",
                "text-white shadow-lg shadow-blue-500/25",
                "border-blue-300/50",
                "hover:shadow-xl hover:shadow-blue-500/30",
              ],
              isCollapsed && "justify-center px-2"
            )}
          >
            {" "}
            {/* Background glow effect for active item */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-2xl blur-lg opacity-50" />
            )}{" "}
            {/* Icon container */}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl transition-all duration-300",
                "w-10 h-10 flex-shrink-0",
                isActive
                  ? "bg-white/20 shadow-lg backdrop-blur-sm"
                  : "bg-gray-100 group-hover:bg-white group-hover:shadow-md"
              )}
            >
              <IconComponent
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive
                    ? "text-white drop-shadow-sm"
                    : "text-gray-600 group-hover:text-blue-600"
                )}
              />

              {/* Simple active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-30" />
              )}
            </div>{" "}
            {/* Text content */}
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between ml-3 overflow-hidden">
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

                  {/* Subtitle for active item */}
                  {isActive && (
                    <span className="text-xs text-white/80 font-medium truncate">
                      Active Section
                    </span>
                  )}
                </div>{" "}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {/* Arrow indicator */}
                  <div
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-colors duration-300",
                        isActive
                          ? "text-white/80"
                          : "text-gray-400 group-hover:text-blue-500"
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-indigo-400/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              whileHover={{ opacity: 0.1 }}
            />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </motion.div>
  );
}

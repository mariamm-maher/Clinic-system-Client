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
  Star,
  Crown,
} from "lucide-react";

export default function SidebarHeader({ isCollapsed, setIsCollapsed }) {
  return (
    <motion.div
      className="p-6 border-b border-gray-200/50 flex-shrink-0 relative overflow-hidden"
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
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white drop-shadow-lg" />
                </div>

                {/* Simple status indicator */}
              </div>{" "}
              {/* Simple clinic info */}
              <div className="flex-1">
                <h2 className="font-bold text-lg bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {clinicConfig.name}
                </h2>
              </div>
            </>
          )}
        </motion.div>{" "}
        {/* Simple collapse button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-12 w-12 p-0 rounded-2xl transition-all duration-300",
            "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
            "border border-transparent hover:border-blue-200/50",
            "shadow-md hover:shadow-lg"
          )}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
            )}
          </motion.div>
        </Button>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { clinicConfig } from "@/lib/config";
import {
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SidebarHeader({ isCollapsed, setIsCollapsed }) {
  return (
    <motion.div 
      className="p-6 border-b border-gray-200/50 flex-shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          animate={{ 
            opacity: isCollapsed ? 0 : 1,
            x: isCollapsed ? -20 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          {!isCollapsed && (
            <>
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Stethoscope className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >                <h2 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {clinicConfig.name}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Dr.Ehab Dashboard
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-11 w-11 p-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-200 group"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import NavigationItem from "./NavigationItem";

export default function NavigationMenu({
  navigationItems,
  activeSection,
  isCollapsed,
  handleNavigation,
}) {
  return (
    <motion.nav
      className="flex-1 p-4 space-y-3 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <motion.div
        className="space-y-2"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {navigationItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
              onClick={() => handleNavigation(item.path)}
              index={index}
            />
          );
        })}
      </motion.div>

      {/* Separator and secondary actions */}
      <motion.div
        className="pt-4 mt-6 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {!isCollapsed && (
          <motion.div
            className="px-2 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-xs font-semibold text-blue-900 mb-1">
              Quick Stats
            </div>
            <div className="flex justify-between text-xs text-blue-700">
              <span>Today's Patients</span>
              <motion.span
                className="font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                12
              </motion.span>
            </div>
            <div className="flex justify-between text-xs text-blue-700">
              <span>Pending</span>
              <motion.span
                className="font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                3
              </motion.span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}

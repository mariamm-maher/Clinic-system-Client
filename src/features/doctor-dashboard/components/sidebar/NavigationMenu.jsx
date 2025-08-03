import { motion } from "framer-motion";
import NavigationItem from "./NavigationItem";

export default function NavigationMenu({
  navigationItems,
  activeSection,
  isCollapsed,
  handleNavigation,
}) {
  return (
    <nav className="flex-1 p-4 space-y-3 overflow-y-auto overflow-x-hidden">
      <div className="space-y-2 w-full">
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
      </div>
    </nav>
  );
}

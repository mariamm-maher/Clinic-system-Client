import NavigationItem from "./NavigationItem";

export default function NavigationMenu({ navigationItems, isCollapsed }) {
  return (
    <nav
      className="flex-1 min-h-0 p-3 sm:p-4 space-y-2 sm:space-y-3 overflow-y-auto overflow-x-hidden 
                   scrollbar-thin scrollbar-thumb-blue-200/50 scrollbar-track-transparent 
                   hover:scrollbar-thumb-blue-300/50 touch-scrolling scroll-smooth
                   supports-overlay-scroll"
    >
      <div className="space-y-1.5 sm:space-y-2 w-full">
        {navigationItems.map((item, index) => {
          return (
            <NavigationItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              index={index}
            />
          );
        })}
      </div>
    </nav>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Clock,
  UserCheck,
  Sparkles,
  Activity,
  TrendingUp,
  CheckCircle,
  Timer,
  Star,
  Zap,
} from "lucide-react";

export default function NavigationTabs({ activeTab, onTabChange }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Staggered animation entrance
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const tabs = [
    {
      id: "queue",
      label: "Queue Management",
      icon: Users,
      description: "Manage patient waiting queue",
      color: "green",
      count: 12,
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      glowColor: "shadow-green-500/30",
      hoverGlow: "hover:shadow-green-500/50",
      bgPattern: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      borderGlow: "border-green-200/50",
      stats: {
        waiting: 8,
        inProgress: 3,
        urgent: 1,
      },
    },
    {
      id: "appointments",
      label: "Appointment Management",
      icon: Calendar,
      description: "Schedule and manage appointments",
      color: "blue",
      count: 8,
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      glowColor: "shadow-blue-500/30",
      hoverGlow: "hover:shadow-blue-500/50",
      bgPattern: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
      borderGlow: "border-blue-200/50",
      stats: {
        confirmed: 5,
        pending: 2,
        completed: 1,
      },
    },
  ];
  const getTabStyles = (tab, isActive, isHovered) => {
    const baseStyles = `
      relative flex-1 flex flex-col items-center justify-center p-8 rounded-2xl 
      transition-all duration-500 ease-out transform cursor-pointer
      backdrop-blur-sm border border-opacity-20
      ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
    `;

    if (isActive) {
      // Use specific gradients for each tab to avoid CSS issues
      const activeGradient =
        tab.id === "queue"
          ? "from-emerald-500 via-green-500 to-teal-600"
          : "from-blue-500 via-indigo-500 to-purple-600";

      return `${baseStyles} 
        bg-gradient-to-br ${activeGradient} text-white 
        shadow-2xl ${tab.glowColor} 
        scale-105 rotate-1 
        border-white/30`;
    } else if (isHovered) {
      const hoverTextColor =
        tab.id === "queue" ? "text-green-800" : "text-blue-800";
      return `${baseStyles} 
        ${tab.bgPattern} ${hoverTextColor} 
        shadow-xl ${tab.hoverGlow} 
        scale-[1.02] 
        border-2 ${tab.borderGlow}
        hover:shadow-2xl`;
    } else {
      return `${baseStyles} 
        bg-white/80 hover:bg-white/90 text-gray-700 
        border-2 border-gray-200/50 hover:border-gray-300/50 
        shadow-lg hover:shadow-xl 
        hover:scale-[1.01] hover:-translate-y-1`;
    }
  };

  const getIconStyles = (isActive, isHovered) => {
    return `w-12 h-12 mb-4 transition-all duration-500 ${
      isActive
        ? "scale-125 drop-shadow-lg animate-pulse"
        : isHovered
        ? "scale-110"
        : "group-hover:scale-105"
    }`;
  };

  const getBadgeStyles = (tab, isActive, isHovered) => {
    if (isActive) {
      return "bg-white/25 text-white border-white/40 shadow-lg backdrop-blur-sm";
    } else if (isHovered) {
      if (tab.color === "green") {
        return "bg-green-500/20 text-green-800 border-green-400/50 shadow-md";
      } else {
        return "bg-blue-500/20 text-blue-800 border-blue-400/50 shadow-md";
      }
    } else {
      if (tab.color === "green") {
        return "bg-green-100 text-green-700 border-green-200";
      } else {
        return "bg-blue-100 text-blue-700 border-blue-200";
      }
    }
  };

  const getFloatingElements = (tab, isActive) => {
    if (!isActive) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sparkles */}
        <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white/60 animate-pulse" />
        <Star
          className="absolute top-4 left-2 w-3 h-3 text-white/40 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
        <Zap
          className="absolute bottom-3 right-4 w-3 h-3 text-white/50 animate-ping"
          style={{ animationDelay: "1s" }}
        />

        {/* Activity indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
      </div>
    );
  };
  return (
    <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b border-gray-200/50 overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-green-100/20 animate-pulse"></div>
      <div
        className="absolute top-0 left-1/4 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-0 right-1/4 w-40 h-40 bg-green-300/10 rounded-full blur-3xl animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      ></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Enhanced Tab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            const IconComponent = tab.icon;

            return (
              <div
                key={tab.id}
                className={`group relative ${
                  isVisible ? "animate-in slide-in-from-bottom-4" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Button
                  onClick={() => onTabChange(tab.id)}
                  className={getTabStyles(tab, isActive, isHovered)}
                  variant="ghost"
                  asChild
                >
                  <div className="relative w-full h-full min-h-[280px]">
                    {/* Floating decorative elements */}
                    {getFloatingElements(tab, isActive)}
                    {/* Main content */}
                    <div className="flex flex-col items-center w-full z-10 relative">
                      {/* Icon with enhanced styling */}
                      <div
                        className={`relative mb-6 ${
                          isActive ? "animate-pulse" : ""
                        }`}
                      >
                        <IconComponent
                          className={getIconStyles(isActive, isHovered)}
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-lg scale-150"></div>
                        )}
                      </div>
                      {/* Title */}
                      <h3
                        className={`text-2xl font-bold mb-3 text-center leading-tight ${
                          isActive ? "drop-shadow-sm" : ""
                        }`}
                      >
                        {tab.label}
                      </h3>{" "}
                      {/* Description */}
                      <p
                        className={`text-base mb-6 text-center max-w-xs leading-relaxed ${
                          isActive
                            ? "text-white/95 drop-shadow-sm"
                            : isHovered
                            ? tab.id === "queue"
                              ? "text-green-700"
                              : "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        {tab.description}
                      </p>
                      {/* Enhanced Badge Section */}
                      <div className="flex flex-col items-center space-y-3">
                        <Badge
                          className={`${getBadgeStyles(
                            tab,
                            isActive,
                            isHovered
                          )} text-lg px-4 py-2 font-semibold`}
                        >
                          {tab.count} {tab.id === "queue" ? "waiting" : "today"}
                        </Badge>

                        {/* Statistics Mini Cards */}
                        <div className="flex items-center space-x-2">
                          {Object.entries(tab.stats).map(
                            ([key, value], statIndex) => (
                              <div
                                key={key}
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : isHovered
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-gray-50 text-gray-600"
                                }`}
                                style={{
                                  animationDelay: `${statIndex * 100}ms`,
                                }}
                              >
                                {value} {key}
                              </div>
                            )
                          )}
                        </div>

                        {/* Active indicator with enhanced animation */}
                        {isActive && (
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-sm text-white/95 font-medium tracking-wide">
                              Active
                            </span>
                          </div>
                        )}

                        {/* Hover effect indicator */}
                        {isHovered && !isActive && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Activity className="w-3 h-3 animate-pulse" />
                            <span className="text-xs font-medium">
                              Click to activate
                            </span>
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    {/* Corner accent */}
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 rounded-full ${
                        isActive
                          ? "bg-white/20 animate-spin"
                          : isHovered
                          ? tab.id === "queue"
                            ? "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 opacity-20"
                            : "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-20"
                          : "bg-gray-100 opacity-50"
                      }`}
                      style={{ animationDuration: "8s" }}
                    >
                      <div className="absolute inset-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-20 right-16 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-10 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
      </div>
    </div>
  );
}

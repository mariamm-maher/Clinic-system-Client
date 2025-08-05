import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  color = "blue",
  badge,
  className,
  index = 0,
}) {
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      icon: "bg-gradient-to-br from-blue-500 to-indigo-600",
      text: "text-blue-700",
      trend: {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-50",
      },
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      icon: "bg-gradient-to-br from-green-500 to-emerald-600",
      text: "text-green-700",
      trend: {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-50",
      },
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-violet-50",
      icon: "bg-gradient-to-br from-purple-500 to-violet-600",
      text: "text-purple-700",
      trend: {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-50",
      },
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50",
      icon: "bg-gradient-to-br from-orange-500 to-amber-600",
      text: "text-orange-700",
      trend: {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-50",
      },
    },
    red: {
      bg: "bg-gradient-to-br from-red-50 to-pink-50",
      icon: "bg-gradient-to-br from-red-500 to-pink-600",
      text: "text-red-700",
      trend: {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-50",
      },
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="w-full"
    >
      <Card
        className={cn(
          "border-0 shadow-lg hover:shadow-xl transition-all duration-300",
          colors.bg,
          className
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl shadow-lg", colors.icon)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
                {badge && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {badge}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-end justify-between">
            <div>
              <p className={cn("text-3xl font-bold mb-1", colors.text)}>
                {value}
              </p>
              {trend && (
                <div
                  className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    colors.trend[trendType]
                  )}
                >
                  {trend}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

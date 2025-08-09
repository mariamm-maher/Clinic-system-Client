import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PatientStatusCard({ patientStatus }) {
  const getIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Patient Status Overview</CardTitle>
            <p className="text-sm text-gray-600">Current patient distribution</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patientStatus.map((status) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status.color === "blue"
                      ? "bg-blue-500"
                      : status.color === "green"
                      ? "bg-green-500"
                      : status.color === "yellow"
                      ? "bg-yellow-500"
                      : status.color === "red"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
                <span className="text-sm font-medium text-gray-900">
                  {status.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{status.count}</span>
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1 ${getTrendColor(
                    status.trend
                  )}`}
                >
                  {getIcon(status.trend)}
                  {status.percentage}%
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

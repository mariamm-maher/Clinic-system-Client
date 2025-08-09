import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function NotificationsCard({ notifications }) {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getVariant = (type) => {
    switch (type) {
      case "success":
        return "default";
      case "warning":
        return "destructive";
      case "info":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <p className="text-sm text-gray-600">System alerts & updates</p>
            </div>
          </div>
          <Badge variant="destructive">
            {notifications.filter((n) => n.type === "warning").length} urgent
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {getIcon(notification.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-gray-900">
                    {notification.title}
                  </h4>
                  <Badge variant={getVariant(notification.type)} className="text-xs">
                    {notification.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {notification.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

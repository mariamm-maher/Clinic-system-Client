import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CalendarPlus, 
  FileText, 
  UserPlus, 
  MessageSquare, 
  Settings, 
  BarChart3 
} from "lucide-react";

export default function QuickActionsCard({ onAction }) {
  const actions = [
    { id: "schedule", label: "New Appointment", icon: CalendarPlus },
    { id: "report", label: "Generate Report", icon: FileText },
    { id: "patient", label: "Add Patient", icon: UserPlus },
    { id: "message", label: "Send Message", icon: MessageSquare },
    { id: "stats", label: "View Statistics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <p className="text-sm text-gray-600">Common tasks</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <motion.div
              key={action.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto py-3 flex flex-col items-center justify-center gap-2"
                onClick={() => onAction(action.id)}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

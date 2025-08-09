import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ChevronRight } from "lucide-react";

export default function UpcomingAppointmentsCard({ appointments }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <p className="text-sm text-gray-600">Today's schedule</p>
            </div>
          </div>
          <Badge variant="secondary">
            {appointments.length} scheduled
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`rounded-lg p-3 border-l-4 ${
                appointment.priority === "urgent"
                  ? "border-red-500 bg-red-50"
                  : appointment.priority === "high"
                  ? "border-orange-500 bg-orange-50"
                  : "border-blue-500 bg-blue-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={appointment.avatar} />
                    <AvatarFallback>
                      {appointment.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">
                      {appointment.patient}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {appointment.time} • {appointment.type}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-600">
                  {appointment.condition}
                </span>
                <Badge
                  variant={
                    appointment.priority === "urgent"
                      ? "destructive"
                      : appointment.priority === "high"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {appointment.priority}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

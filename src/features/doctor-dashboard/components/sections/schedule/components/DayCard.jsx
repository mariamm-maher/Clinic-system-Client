import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScheduleStore } from "../store/scheduleStore";
import TimeSlotItem from "./TimeSlotItem";

export default function DayCard({ day, onAddSlot, onEditSlot }) {
  const { getScheduleByDay, deleteTimeSlot } = useScheduleStore();
  const daySlots = getScheduleByDay(day.value);

  const handleDeleteSlot = (id) => {
    deleteTimeSlot(id);
  };

  const getStatusIcon = (isAvailable) => {
    return isAvailable ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusBadge = (isAvailable) => {
    return (
      <Badge
        variant={isAvailable ? "default" : "destructive"}
        className={`text-xs ${
          isAvailable
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-red-100 text-red-800 hover:bg-red-200"
        }`}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="h-full"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              {day.label}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {daySlots.length} slots
              </Badge>
              <Button
                size="sm"
                onClick={() => onAddSlot(day.value)}
                className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-3 min-h-[200px]">
          <AnimatePresence mode="wait">
            {daySlots.length > 0 ? (
              daySlots.map((slot) => (
                <TimeSlotItem
                  key={slot.id}
                  slot={slot}
                  onEdit={() => onEditSlot(slot)}
                  onDelete={() => handleDeleteSlot(slot.id)}
                  getStatusIcon={getStatusIcon}
                  getStatusBadge={getStatusBadge}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No time slots scheduled</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddSlot(day.value)}
                  className="mt-2 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add First Slot
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

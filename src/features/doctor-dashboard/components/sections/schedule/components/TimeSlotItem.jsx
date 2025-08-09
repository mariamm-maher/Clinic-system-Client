import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function TimeSlotItem({ slot, onEdit, onDelete, getStatusIcon, getStatusBadge }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-gray-800">
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
        {getStatusIcon(slot.isAvailable)}
      </div>

      <div className="flex items-center justify-between">
        {getStatusBadge(slot.isAvailable)}

        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="h-8 w-8 p-0 hover:bg-blue-100"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {slot.notes && (
        <p className="text-xs text-gray-600 mt-2 italic">
          {slot.notes}
        </p>
      )}
    </motion.div>
  );
}

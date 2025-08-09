import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import { DAYS_OF_WEEK } from "./store/scheduleStore";
import { DayCard, TimeSlotDialog, ScheduleSummary } from "./components";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

export default function ModernScheduleSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [preselectedDay, setPreselectedDay] = useState(null);
  
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  const handleAddSlot = (dayValue = null) => {
    setEditingSlot(null);
    setPreselectedDay(dayValue);
    setIsDialogOpen(true);
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setPreselectedDay(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSlot(null);
    setPreselectedDay(null);
  };

  return (
    <div className="p-6 space-y-6">
      <ModernBreadcrumb />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Weekly Schedule
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your availability and working hours
          </p>
        </div>

        {/* Schedule Summary */}
        <ScheduleSummary />
        <Button
          onClick={() => handleAddSlot()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Time Slot
        </Button>
      </motion.div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {DAYS_OF_WEEK.map((day, index) => (
          <motion.div
            key={day.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DayCard
              day={day}
              onAddSlot={handleAddSlot}
              onEditSlot={handleEditSlot}
            />
          </motion.div>
        ))}
      </div>

      {/* Time Slot Dialog */}
      <TimeSlotDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingSlot={editingSlot}
        preselectedDay={preselectedDay}
      />
    </div>
  );
}

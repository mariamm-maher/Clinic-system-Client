import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw } from "lucide-react";
import { useScheduleStore } from "../store/scheduleStore";
import { TIME_SLOTS, DAYS_OF_WEEK } from "../store/scheduleStore";

export default function TimeSlotDialog({ 
  isOpen, 
  onClose, 
  editingSlot = null, 
  preselectedDay = null 
}) {
  const { addTimeSlot, updateTimeSlot } = useScheduleStore();
  
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [notes, setNotes] = useState("");

  // Initialize form when dialog opens or editing slot changes
  useEffect(() => {
    if (editingSlot) {
      setSelectedDay(editingSlot.day);
      setStartTime(editingSlot.startTime);
      setEndTime(editingSlot.endTime);
      setIsAvailable(editingSlot.isAvailable);
      setNotes(editingSlot.notes || "");
    } else if (preselectedDay) {
      setSelectedDay(preselectedDay);
      setStartTime("");
      setEndTime("");
      setIsAvailable(true);
      setNotes("");
    } else {
      resetForm();
    }
  }, [editingSlot, preselectedDay, isOpen]);

  const resetForm = () => {
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
    setIsAvailable(true);
    setNotes("");
  };

  const handleSave = () => {
    if (!selectedDay || !startTime || !endTime) return;

    const timeSlotData = {
      day: selectedDay,
      startTime,
      endTime,
      isAvailable,
      notes,
    };

    if (editingSlot) {
      updateTimeSlot(editingSlot.id, timeSlotData);
    } else {
      addTimeSlot(timeSlotData);
    }

    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            {editingSlot ? "Edit Time Slot" : "Add New Time Slot"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Day Selection */}
          <div className="space-y-2">
            <Label htmlFor="day">Day of Week</Label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Availability Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability">Available for appointments</Label>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this time slot..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetForm}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedDay || !startTime || !endTime}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {editingSlot ? "Update" : "Save"} Slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

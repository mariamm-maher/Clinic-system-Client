import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Save,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModernBreadcrumb from "../../ModernBreadcrumb";

export default function ModernScheduleSection() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [notes, setNotes] = useState("");

  // Days of the week
  const daysOfWeek = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Mock schedule data
  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      day: "monday",
      startTime: "08:00",
      endTime: "12:00",
      isAvailable: true,
      notes: "Morning clinic",
    },
    {
      id: 2,
      day: "monday",
      startTime: "14:00",
      endTime: "18:00",
      isAvailable: true,
      notes: "Afternoon clinic",
    },
    {
      id: 3,
      day: "tuesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      notes: "Full day clinic",
    },
    {
      id: 4,
      day: "wednesday",
      startTime: "08:00",
      endTime: "12:00",
      isAvailable: false,
      notes: "Conference day - unavailable",
    },
    {
      id: 5,
      day: "thursday",
      startTime: "08:00",
      endTime: "16:00",
      isAvailable: true,
      notes: "Surgery day",
    },
    {
      id: 6,
      day: "friday",
      startTime: "08:00",
      endTime: "14:00",
      isAvailable: true,
      notes: "Half day clinic",
    },
  ]);

  const handleSaveSlot = () => {
    if (!selectedDay || !startTime || !endTime) return;

    const newSlot = {
      id: editingSlot ? editingSlot.id : Date.now(),
      day: selectedDay,
      startTime,
      endTime,
      isAvailable,
      notes,
    };

    if (editingSlot) {
      setScheduleData(
        scheduleData.map((slot) =>
          slot.id === editingSlot.id ? newSlot : slot
        )
      );
    } else {
      setScheduleData([...scheduleData, newSlot]);
    }

    resetForm();
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setSelectedDay(slot.day);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setIsAvailable(slot.isAvailable);
    setNotes(slot.notes);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteSlot = (id) => {
    setScheduleData(scheduleData.filter((slot) => slot.id !== id));
  };

  const resetForm = () => {
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
    setIsAvailable(true);
    setNotes("");
    setEditingSlot(null);
    setIsCreateDialogOpen(false);
  };

  const getScheduleByDay = (day) => {
    return scheduleData.filter((slot) => slot.day === day);
  };

  const getStatusIcon = (isAvailable) => {
    return isAvailable ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (isAvailable) => {
    return (
      <Badge
        variant={isAvailable ? "default" : "destructive"}
        className="text-xs"
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
    );
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

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Time Slot
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSlot ? "Edit Time Slot" : "Add New Time Slot"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="availability"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
                <Label htmlFor="availability">Available for appointments</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this time slot..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveSlot}>
                <Save className="h-4 w-4 mr-2" />
                {editingSlot ? "Update" : "Save"} Slot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {daysOfWeek.map((day, index) => {
          const daySchedule = getScheduleByDay(day.value);

          return (
            <motion.div
              key={day.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                      {day.label}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {daySchedule.length} slot
                      {daySchedule.length !== 1 ? "s" : ""}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <AnimatePresence>
                    {daySchedule.length > 0 ? (
                      daySchedule.map((slot) => (
                        <motion.div
                          key={slot.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="font-medium text-sm">
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
                                onClick={() => handleEditSlot(slot)}
                                className="h-8 w-8 p-0 hover:bg-blue-100"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteSlot(slot.id)}
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
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-gray-500"
                      >
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No time slots scheduled</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Schedule Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Weekly Schedule Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {scheduleData.length}
                </div>
                <div className="text-sm text-gray-600">Total Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scheduleData.filter((slot) => slot.isAvailable).length}
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {scheduleData.filter((slot) => !slot.isAvailable).length}
                </div>
                <div className="text-sm text-gray-600">Unavailable</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(scheduleData.map((slot) => slot.day)).size}
                </div>
                <div className="text-sm text-gray-600">Active Days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

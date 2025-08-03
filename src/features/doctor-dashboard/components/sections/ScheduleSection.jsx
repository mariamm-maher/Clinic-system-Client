import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Breadcrumb from "../Breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react";

export default function ScheduleSection() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

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

  // Time slots
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  // Current schedule state
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      day: "monday",
      dayLabel: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    },
    {
      id: 2,
      day: "tuesday",
      dayLabel: "Tuesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    },
    {
      id: 3,
      day: "wednesday",
      dayLabel: "Wednesday",
      startTime: "10:00",
      endTime: "16:00",
      isAvailable: true,
    },
    {
      id: 4,
      day: "thursday",
      dayLabel: "Thursday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    },
    {
      id: 5,
      day: "friday",
      dayLabel: "Friday",
      startTime: "09:00",
      endTime: "15:00",
      isAvailable: true,
    },
    {
      id: 6,
      day: "saturday",
      dayLabel: "Saturday",
      startTime: "00:00",
      endTime: "00:00",
      isAvailable: false,
    },
    {
      id: 7,
      day: "sunday",
      dayLabel: "Sunday",
      startTime: "00:00",
      endTime: "00:00",
      isAvailable: false,
    },
  ]);

  // Handle creating new schedule
  const handleCreateSchedule = () => {
    if (!selectedDay || !startTime || !endTime) {
      alert("Please fill in all required fields");
      return;
    }

    const dayLabel = daysOfWeek.find((d) => d.value === selectedDay)?.label;
    const existingScheduleIndex = schedule.findIndex(
      (s) => s.day === selectedDay
    );

    const newScheduleItem = {
      id:
        existingScheduleIndex !== -1
          ? schedule[existingScheduleIndex].id
          : Date.now(),
      day: selectedDay,
      dayLabel,
      startTime: isAvailable ? startTime : "00:00",
      endTime: isAvailable ? endTime : "00:00",
      isAvailable,
    };

    if (existingScheduleIndex !== -1) {
      // Update existing schedule
      const updatedSchedule = [...schedule];
      updatedSchedule[existingScheduleIndex] = newScheduleItem;
      setSchedule(updatedSchedule);
    } else {
      // Add new schedule
      setSchedule([...schedule, newScheduleItem]);
    }

    // Reset form
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
    setIsAvailable(true);
    setIsCreateDialogOpen(false);
  };

  // Handle dropping all schedules
  const handleDropSchedule = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all scheduled days? This action cannot be undone."
      )
    ) {
      setSchedule([]);
    }
  };

  // Handle editing schedule
  const handleEditSchedule = (scheduleItem) => {
    setSelectedDay(scheduleItem.day);
    setStartTime(scheduleItem.startTime);
    setEndTime(scheduleItem.endTime);
    setIsAvailable(scheduleItem.isAvailable);
    setIsCreateDialogOpen(true);
  };

  // Handle deleting single schedule
  const handleDeleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setSchedule(schedule.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <CalendarIcon className="h-7 w-7 text-blue-600" />
            <span>Schedule Management</span>
          </h2>
          <p className="text-gray-600 ml-9">
            Create and manage your weekly availability schedule
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            onClick={handleDropSchedule}
            disabled={schedule.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Drop Schedule
          </Button>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>Create/Edit Schedule</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Day Selection */}
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

                {/* Availability Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Available on this day
                    </Label>
                    <p className="text-xs text-gray-600">
                      Toggle off to mark as not available
                    </p>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                  />
                </div>

                {/* Time Selection - only show if available */}
                {isAvailable && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Start Time */}
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
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

                      {/* End Time */}
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
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
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSchedule}>
                    {schedule.find((s) => s.day === selectedDay)
                      ? "Update"
                      : "Create"}{" "}
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Schedule Overview */}
      <div className="grid gap-4">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Weekly Schedule</CardTitle>
                  <p className="text-sm text-gray-600">
                    {schedule.filter((s) => s.isAvailable).length} available
                    days, {schedule.filter((s) => !s.isAvailable).length}{" "}
                    unavailable days
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-sm">
                {schedule.length} days configured
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {schedule.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Schedule Created
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first schedule to define your availability
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {schedule.map((scheduleItem) => (
                  <div
                    key={scheduleItem.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                      scheduleItem.isAvailable
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md"
                        : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          scheduleItem.isAvailable
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {scheduleItem.isAvailable ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <XCircle className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {scheduleItem.dayLabel}
                        </h4>
                        {scheduleItem.isAvailable ? (
                          <p className="text-gray-600">
                            {scheduleItem.startTime} - {scheduleItem.endTime}
                          </p>
                        ) : (
                          <p className="text-red-600 font-medium">
                            Not Available
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          scheduleItem.isAvailable ? "default" : "destructive"
                        }
                        className="text-xs"
                      >
                        {scheduleItem.isAvailable ? "Available" : "Closed"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSchedule(scheduleItem)}
                        className="hover:bg-blue-100 text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSchedule(scheduleItem.id)}
                        className="hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Schedule Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Days</p>
                <p className="text-2xl font-bold text-green-600">
                  {schedule.filter((s) => s.isAvailable).length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closed Days</p>
                <p className="text-2xl font-bold text-red-600">
                  {schedule.filter((s) => !s.isAvailable).length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Configured</p>
                <p className="text-2xl font-bold text-blue-600">
                  {schedule.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";
// import ScheduleSummary from "../sections/schedule/components/ScheduleSummary";
import TodayMetricsCard from "./components/TodayMetricsCard";
import UpcomingAppointmentsCard from "./components/UpcomingAppointmentsCard";
import NotificationsCard from "./components/NotificationsCard";
import PatientStatusCard from "./components/PatientStatusCard";
import QuickActionsCard from "./components/QuickActionsCard";

export default function OverviewSection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock data for today's metrics
  const todayMetrics = {
    totalPatients: 124,
    completedToday: 8,
    upcomingAppointments: 3,
    avgWaitTime: 12,
    pendingReports: 5,
  };

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "9:00 AM",
      type: "Follow-up",
      condition: "Hypertension",
      priority: "normal",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      time: "10:30 AM",
      type: "Consultation",
      condition: "Diabetes Type 2",
      priority: "high",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      patient: "Michael Brown",
      time: "2:15 PM",
      type: "Emergency",
      condition: "Severe Allergic Reaction",
      priority: "urgent",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: "New Lab Results",
      message: "Patient John Smith's blood test results are ready for review.",
      time: "2 minutes ago",
      type: "info",
    },
    {
      id: 2,
      title: "Appointment Reminder",
      message: "You have an appointment with Sarah Johnson in 30 minutes.",
      time: "15 minutes ago",
      type: "warning",
    },
    {
      id: 3,
      title: "System Update",
      message: "The clinic management system will be updated tonight at 12 AM.",
      time: "1 hour ago",
      type: "success",
    },
  ];

  // Mock data for patient status
  const patientStatus = [
    {
      id: 1,
      label: "In Clinic",
      count: 24,
      percentage: 19.4,
      trend: "up",
      color: "green",
    },
    {
      id: 2,
      label: "Waiting",
      count: 8,
      percentage: 6.5,
      trend: "down",
      color: "yellow",
    },
    {
      id: 3,
      label: "Consultation",
      count: 15,
      percentage: 12.1,
      trend: "up",
      color: "blue",
    },
    {
      id: 4,
      label: "Checkout",
      count: 5,
      percentage: 4.0,
      trend: "neutral",
      color: "red",
    },
  ];

  // Handle quick actions
  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Implement action handlers here
  };

  return (
    <div className="space-y-6">
      {/* Header with greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, Dr. Maher
          </h1>
          <p className="text-gray-600 mt-1">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm py-1">
            <Clock className="h-3 w-3 mr-1" />
            Clinic hours: 8:00 AM - 5:00 PM
          </Badge>
        </div>
      </motion.div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Today's metrics and schedule summary */}
        <div className="lg:col-span-2 space-y-6">
          <TodayMetricsCard todayMetrics={todayMetrics} />
          {/* Schedule summary */}
          {/* <ScheduleSummary className="border-0 shadow-lg" /> */}
        </div>

        {/* Right column - Quick actions */}
        <div className="space-y-6">
          <QuickActionsCard onAction={handleQuickAction} />
        </div>
      </div>

      {/* Second row - Appointments, notifications, and patient status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming appointments */}
        <UpcomingAppointmentsCard appointments={upcomingAppointments} />

        {/* Notifications */}
        <NotificationsCard notifications={notifications} />

        {/* Patient status overview */}
        <PatientStatusCard patientStatus={patientStatus} />
      </div>
    </div>
  );
}

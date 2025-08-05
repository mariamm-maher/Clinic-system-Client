import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  Clock,
  Activity,
  AlertTriangle,
  TrendingUp,
  Heart,
  Stethoscope,
  FileText,
  Bell,
  Star,
  Timer,
  MessageSquare,
  Eye,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import StatCard from "./StatCard";

export default function OverviewSection() {
  // Real-time current time state
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Today's medical metrics
  const todayMetrics = {
    totalPatients: 247,
    activeAppointments: 12,
    completedToday: 18,
    pendingReports: 7,
    emergencyAlerts: 2,
    upcomingAppointments: 8,
    newMessages: 5,
    criticalPatients: 3,
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Total Patients",
      value: todayMetrics.totalPatients,
      icon: Users,
      trend: "+12 this week",
      trendType: "up",
      color: "blue",
      badge: "Active",
    },
    {
      title: "Appointments Today",
      value: `${todayMetrics.completedToday}/${
        todayMetrics.completedToday + todayMetrics.upcomingAppointments
      }`,
      icon: Calendar,
      trend: "3 remaining",
      trendType: "neutral",
      color: "green",
    },
    {
      title: "Emergency Alerts",
      value: todayMetrics.emergencyAlerts,
      icon: AlertTriangle,
      trend: "Requires attention",
      trendType: "down",
      color: "red",
      badge: "Critical",
    },
    {
      title: "Reports Pending",
      value: todayMetrics.pendingReports,
      icon: FileText,
      trend: "2 urgent",
      trendType: "neutral",
      color: "orange",
    },
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:30 AM",
      type: "Checkup",
      status: "confirmed",
      avatar: "/api/placeholder/40/40",
      condition: "Routine",
      priority: "normal",
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:15 AM",
      type: "Follow-up",
      status: "confirmed",
      avatar: "/api/placeholder/40/40",
      condition: "Hypertension",
      priority: "high",
    },
    {
      id: 3,
      patient: "Emma Davis",
      time: "11:00 AM",
      type: "Consultation",
      status: "pending",
      avatar: "/api/placeholder/40/40",
      condition: "Chest Pain",
      priority: "urgent",
    },
  ];

  // Recent notifications
  const notifications = [
    {
      id: 1,
      type: "lab",
      title: "Lab Results Ready",
      message: "Blood work for John Smith is complete",
      time: "5 min ago",
      priority: "high",
    },
    {
      id: 2,
      type: "appointment",
      title: "New Appointment",
      message: "Lisa Williams booked for 2:00 PM",
      time: "15 min ago",
      priority: "normal",
    },
    {
      id: 3,
      type: "prescription",
      title: "Prescription Refill",
      message: "Robert Brown needs medication renewal",
      time: "1 hour ago",
      priority: "normal",
    },
  ];

  // Quick actions
  const quickActions = [
    { label: "New Patient", icon: Users, color: "blue" },
    { label: "Schedule", icon: Calendar, color: "green" },
    { label: "Reports", icon: FileText, color: "purple" },
    { label: "Messages", icon: MessageSquare, color: "orange" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <ModernBreadcrumb />

      {/* Greeting & Date/Time Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, Dr. Ehab! 👨‍⚕️
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to make a difference in your patients' lives today
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-blue-200">
              {currentTime.toLocaleDateString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendType={card.trendType}
            color={card.color}
            badge={card.badge}
            index={index}
          />
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Today's Appointments
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Manage your schedule
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarImage src={appointment.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {appointment.patient}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {appointment.type} • {appointment.condition}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Timer className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-2">
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {appointment.status}
                      </Badge>
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

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <p className="text-sm text-gray-600">Common daily tasks</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 w-full hover:shadow-md transition-all duration-200"
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-xs font-medium">
                          {action.label}
                        </span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Notifications & Alerts */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <p className="text-sm text-gray-600">Recent updates</p>
                  </div>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  {notifications.filter((n) => n.priority === "high").length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-lg p-3 border-l-4 ${
                      notification.priority === "high"
                        ? "border-red-500 bg-red-50"
                        : "border-blue-500 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Status Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Patient Status</CardTitle>
                  <p className="text-sm text-gray-600">Health overview</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Critical Patients
                  </span>
                  <Badge variant="destructive">
                    {todayMetrics.criticalPatients}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stable Patients</span>
                  <Badge variant="outline">
                    {todayMetrics.totalPatients - todayMetrics.criticalPatients}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Messages</span>
                  <Badge variant="secondary">{todayMetrics.newMessages}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Breadcrumb from "../Breadcrumb";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Bell,
  AlertTriangle,
  FileText,
  Activity,
  Stethoscope,
  Phone,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Heart,
  Shield,
  Star,
  ChevronRight,
  PlayCircle,
  UserCheck,
  Clipboard,
  BarChart3,
  DollarSign,
  Plus,
  User,
  Thermometer,
  Eye,
  FlaskConical,
  Ambulance,
  Pill,
  BrainCircuit,
  Target,
  Timer,
  Zap,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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
    activePatients: 247,
    pendingLabReports: 12,
    emergencyAlerts: 1,
    completedAppointments: 18,
    upcomingAppointments: 8,
    newMessages: 5,
    prescriptionsToReview: 7,
    criticalPatients: 3,
  };

  // Quick summary cards with medical-specific data
  const summaryCards = [
    {
      title: "Active Patients",
      value: todayMetrics.activePatients,
      icon: Users,
      color: "blue",
      trend: "+12",
      trendDirection: "up",
    },
    {
      title: "Lab Reports",
      value: todayMetrics.pendingLabReports,
      icon: FlaskConical,
      color: "purple",
      trend: "3 urgent",
      trendDirection: "neutral",
    },
    {
      title: "Emergency Alerts",
      value: todayMetrics.emergencyAlerts,
      icon: Ambulance,
      color: "red",
      trend: "Immediate",
      trendDirection: "critical",
    },
    {
      title: "Appointments",
      value: `${todayMetrics.completedAppointments}/${
        todayMetrics.completedAppointments + todayMetrics.upcomingAppointments
      }`,
      icon: Calendar,
      color: "green",
      trend: "69% done",
      trendDirection: "up",
    },
  ];

  // Next appointments with patient details
  const upcomingAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:30 AM",
      type: "Annual Checkup",
      status: "confirmed",
      priority: "normal",
      avatar: "/api/placeholder/40/40",
      duration: "30 min",
      condition: "Routine Check",
      lastVisit: "6 months ago",
      vitals: { bp: "120/80", temp: "98.6°F" },
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:15 AM",
      type: "Follow-up",
      status: "confirmed",
      priority: "high",
      avatar: "/api/placeholder/40/40",
      duration: "45 min",
      condition: "Hypertension",
      lastVisit: "2 weeks ago",
      vitals: { bp: "140/90", temp: "99.1°F" },
    },
    {
      id: 3,
      patient: "Emma Davis",
      time: "11:00 AM",
      type: "Consultation",
      status: "pending",
      priority: "urgent",
      avatar: "/api/placeholder/40/40",
      duration: "60 min",
      condition: "Chest Pain",
      lastVisit: "First visit",
      vitals: { bp: "Unknown", temp: "Unknown" },
    },
    {
      id: 4,
      patient: "Robert Wilson",
      time: "02:30 PM",
      type: "Lab Review",
      status: "confirmed",
      priority: "normal",
      avatar: "/api/placeholder/40/40",
      duration: "20 min",
      condition: "Diabetes",
      lastVisit: "1 month ago",
      vitals: { bp: "118/75", glucose: "145 mg/dL" },
    },
  ];

  // VIP/Priority patients
  const vipPatients = [
    {
      name: "Dr. William Foster",
      condition: "Hypertension",
      lastVisit: "2 days ago",
      status: "stable",
      nextAppointment: "Next week",
      priority: "VIP",
    },
    {
      name: "Margaret Thompson",
      condition: "Type 2 Diabetes",
      lastVisit: "1 week ago",
      status: "monitoring",
      nextAppointment: "Tomorrow",
      priority: "High",
    },
    {
      name: "James Anderson",
      condition: "Cardiac Arrhythmia",
      lastVisit: "3 days ago",
      status: "critical",
      nextAppointment: "Today 3:00 PM",
      priority: "Critical",
    },
  ];

  // Recent notifications and alerts
  const notifications = [
    {
      id: 1,
      type: "lab",
      title: "Critical Lab Results",
      message: "John Smith's blood work shows elevated levels",
      time: "5 minutes ago",
      priority: "critical",
      actionRequired: true,
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Lisa Williams confirmed her 2:00 PM appointment",
      time: "15 minutes ago",
      priority: "normal",
      actionRequired: false,
    },
    {
      id: 3,
      type: "prescription",
      title: "Prescription Refill",
      message: "Robert Brown requested medication renewal",
      time: "1 hour ago",
      priority: "normal",
      actionRequired: true,
    },
    {
      id: 4,
      type: "emergency",
      title: "Emergency Contact",
      message: "Patient family called regarding Emma Davis",
      time: "2 hours ago",
      priority: "high",
      actionRequired: true,
    },
  ];

  // Health trends and statistics
  const healthTrends = [
    {
      metric: "Patient Satisfaction",
      value: 96.8,
      change: "+2.3%",
      trend: "up",
    },
    {
      metric: "Appointment Efficiency",
      value: 94.2,
      change: "+1.8%",
      trend: "up",
    },
    {
      metric: "Treatment Success Rate",
      value: 92.5,
      change: "-0.5%",
      trend: "down",
    },
    { metric: "Patient Retention", value: 89.7, change: "+4.1%", trend: "up" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "urgent":
        return "bg-orange-500";
      case "high":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "monitoring":
        return "text-yellow-600 bg-yellow-50";
      case "stable":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Greeting & Date/Time Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
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
            <div className="text-blue-100">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const IconComponent = card.icon;
          const colorClasses = {
            blue: "from-blue-500 to-blue-600 text-blue-600",
            purple: "from-purple-500 to-purple-600 text-purple-600",
            red: "from-red-500 to-red-600 text-red-600",
            green: "from-green-500 to-green-600 text-green-600",
          };

          return (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`h-14 w-14 bg-gradient-to-br ${
                      colorClasses[card.color].split(" ")[0]
                    } ${
                      colorClasses[card.color].split(" ")[1]
                    } rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  {card.trendDirection === "critical" && (
                    <Badge variant="destructive" className="animate-pulse">
                      URGENT
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p
                    className={`text-3xl font-bold ${
                      colorClasses[card.color].split(" ")[2]
                    } mb-2`}
                  >
                    {card.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    {card.trendDirection === "up" && (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    )}
                    {card.trendDirection === "down" && (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        card.trendDirection === "up"
                          ? "text-green-600"
                          : card.trendDirection === "down"
                          ? "text-red-600"
                          : card.trendDirection === "critical"
                          ? "text-red-600 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {card.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Next Appointments Section */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Next Appointments</CardTitle>
                    <p className="text-sm text-gray-600">
                      Today's schedule overview
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-4 border border-gray-200/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                              {appointment.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-4 w-4 ${getPriorityColor(
                              appointment.priority
                            )} rounded-full border-2 border-white`}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">
                              {appointment.patient}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {appointment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {appointment.condition}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Timer className="h-3 w-3" />
                              <span>{appointment.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Activity className="h-3 w-3" />
                              <span>{appointment.lastVisit}</span>
                            </span>
                            {appointment.vitals.bp && (
                              <span className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{appointment.vitals.bp}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          {appointment.time}
                        </div>
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
                        <div className="mt-2 flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* VIP Patients */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Priority Patients</CardTitle>
                  <p className="text-sm text-gray-600">
                    Require special attention
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vipPatients.map((patient, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {patient.name}
                      </h4>
                      <Badge
                        className={`text-xs ${
                          patient.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : patient.priority === "VIP"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {patient.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {patient.condition}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {patient.nextAppointment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Alerts & Notifications
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {notifications.filter((n) => n.actionRequired).length}{" "}
                      require action
                    </p>
                  </div>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  {
                    notifications.filter((n) => n.priority === "critical")
                      .length
                  }
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg p-3 border-l-4 ${
                      notification.priority === "critical"
                        ? "border-red-500 bg-red-50"
                        : notification.priority === "high"
                        ? "border-orange-500 bg-orange-50"
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
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {notification.actionRequired && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-xs"
                            >
                              Action Required
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics and Health Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Practice Performance</CardTitle>
                <p className="text-sm text-gray-600">Key metrics and trends</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthTrends.map((trend, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-green-50/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {trend.metric}
                    </span>
                    <div className="flex items-center space-x-1">
                      {trend.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-semibold ${
                          trend.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {trend.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={trend.value} className="flex-1 h-2" />
                    <span className="text-lg font-bold text-gray-900">
                      {trend.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <p className="text-sm text-gray-600">Common daily tasks</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Plus, label: "New Appointment", color: "blue" },
                { icon: User, label: "Add Patient", color: "green" },
                { icon: FileText, label: "Medical Records", color: "purple" },
                { icon: FlaskConical, label: "Lab Results", color: "orange" },
                { icon: Pill, label: "Prescriptions", color: "pink" },
                { icon: BarChart3, label: "Reports", color: "indigo" },
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col space-y-2 hover:shadow-md transition-all duration-200 border-2 hover:border-blue-200"
                  >
                    <IconComponent className="h-6 w-6 text-gray-600" />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

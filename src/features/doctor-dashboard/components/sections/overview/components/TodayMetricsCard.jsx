import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, FileText, Timer } from "lucide-react";
import StatCard from "../StatCard";

export default function TodayMetricsCard({ todayMetrics }) {
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
      title: "Average Wait Time",
      value: `${todayMetrics.avgWaitTime} min`,
      icon: Timer,
      trend: "-2 min from yesterday",
      trendType: "down",
      color: "purple",
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

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Today's Metrics</CardTitle>
            <p className="text-sm text-gray-600">Key performance indicators</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statsCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

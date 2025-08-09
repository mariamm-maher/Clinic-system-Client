import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

export default function StatisticsSection() {
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });
  
  const monthlyStats = {
    totalPatients: 284,
    newPatients: 42,
    totalAppointments: 378,
    cancelledAppointments: 23,
    revenue: 45850,
    avgRating: 4.8,
    occupancyRate: 87,
  };

  const departmentStats = [
    { name: "Cardiology", patients: 78, revenue: 18500, avgWaitTime: 15 },
    { name: "Emergency", patients: 156, revenue: 12750, avgWaitTime: 8 },
    { name: "General Medicine", patients: 245, revenue: 9800, avgWaitTime: 12 },
    { name: "Pediatrics", patients: 89, revenue: 4800, avgWaitTime: 10 },
  ];

  const weeklyData = [
    { day: "Mon", appointments: 45, revenue: 6200 },
    { day: "Tue", appointments: 52, revenue: 7100 },
    { day: "Wed", appointments: 38, revenue: 5300 },
    { day: "Thu", appointments: 47, revenue: 6800 },
    { day: "Fri", appointments: 41, revenue: 5950 },
    { day: "Sat", appointments: 28, revenue: 3900 },
    { day: "Sun", appointments: 15, revenue: 2100 },
  ];

  const patientSatisfaction = [
    { category: "Overall Experience", rating: 4.8, responses: 234 },
    { category: "Wait Time", rating: 4.2, responses: 234 },
    { category: "Staff Friendliness", rating: 4.9, responses: 234 },
    { category: "Cleanliness", rating: 4.7, responses: 234 },
    { category: "Facility Quality", rating: 4.6, responses: 234 },
  ];

  const topConditions = [
    { condition: "Hypertension", patients: 45, percentage: 15.8 },
    { condition: "Diabetes Type 2", patients: 38, percentage: 13.4 },
    { condition: "Common Cold", patients: 32, percentage: 11.3 },
    { condition: "Anxiety", patients: 28, percentage: 9.9 },
    { condition: "Back Pain", patients: 25, percentage: 8.8 },
  ];

  const getMaxValue = (data, key) => Math.max(...data.map((item) => item[key]));
  return (
    <div className="p-6 space-y-6">
      <ModernBreadcrumb />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Analytics & Statistics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive clinic performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>{" "}
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">
                  {monthlyStats.totalPatients}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↗ +12% vs last month
                </p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${monthlyStats.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↗ +8% vs last month
                </p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {monthlyStats.occupancyRate}%
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↗ +5% vs last month
                </p>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Patient Satisfaction</p>
                <p className="text-2xl font-bold text-amber-600">
                  {monthlyStats.avgRating}/5.0
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↗ +0.2 vs last month
                </p>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="conditions">Top Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Weekly Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Appointments: {day.appointments}</span>
                        <span>Revenue: ${day.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (day.appointments /
                                getMaxValue(weeklyData, "appointments")) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Appointments</span>
                      <span>{monthlyStats.totalAppointments}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed</span>
                      <span>
                        {monthlyStats.totalAppointments -
                          monthlyStats.cancelledAppointments}
                      </span>
                    </div>
                    <Progress
                      value={
                        ((monthlyStats.totalAppointments -
                          monthlyStats.cancelledAppointments) /
                          monthlyStats.totalAppointments) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cancelled</span>
                      <span>{monthlyStats.cancelledAppointments}</span>
                    </div>
                    <Progress
                      value={
                        (monthlyStats.cancelledAppointments /
                          monthlyStats.totalAppointments) *
                        100
                      }
                      className="h-2 bg-red-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Patients</span>
                      <span>{monthlyStats.totalPatients}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>New Patients</span>
                      <span>{monthlyStats.newPatients}</span>
                    </div>
                    <Progress
                      value={
                        (monthlyStats.newPatients /
                          monthlyStats.totalPatients) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Returning Patients</span>
                      <span>
                        {monthlyStats.totalPatients - monthlyStats.newPatients}
                      </span>
                    </div>
                    <Progress
                      value={
                        ((monthlyStats.totalPatients -
                          monthlyStats.newPatients) /
                          monthlyStats.totalPatients) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departmentStats.map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{dept.name}</span>
                    <Badge variant="secondary">{dept.patients} patients</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Revenue</span>
                        <span className="font-semibold">
                          ${dept.revenue.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dept.revenue /
                            getMaxValue(departmentStats, "revenue")) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Wait Time</span>
                        <span className="font-semibold">
                          {dept.avgWaitTime} min
                        </span>
                      </div>
                      <Progress
                        value={100 - (dept.avgWaitTime / 30) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {dept.patients}
                        </p>
                        <p className="text-xs text-gray-500">Patients</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          ${Math.round(dept.revenue / dept.patients)}
                        </p>
                        <p className="text-xs text-gray-500">Avg Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {dept.avgWaitTime}m
                        </p>
                        <p className="text-xs text-gray-500">Wait Time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Satisfaction Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patientSatisfaction.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">
                          {item.rating}/5.0
                        </span>
                        <span className="text-xs text-gray-500">
                          ({item.responses} responses)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-green-500 h-3 rounded-full"
                        style={{ width: `${(item.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Poor</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {monthlyStats.avgRating}
                  </div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(monthlyStats.avgRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    234
                  </div>
                  <div className="text-sm text-gray-600">Total Responses</div>
                  <div className="text-xs text-green-600 mt-2">
                    ↗ +18% vs last month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    94%
                  </div>
                  <div className="text-sm text-gray-600">Recommend Rate</div>
                  <div className="text-xs text-green-600 mt-2">
                    ↗ +3% vs last month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Common Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topConditions.map((condition, index) => (
                  <div
                    key={condition.condition}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">
                          {condition.condition}
                        </span>
                        <span className="text-sm text-gray-600">
                          {condition.patients} patients ({condition.percentage}
                          %)
                        </span>
                      </div>
                      <Progress value={condition.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Condition Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Chronic Conditions</span>
                    <Badge variant="secondary">83 patients</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Acute Conditions</span>
                    <Badge variant="secondary">67 patients</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Preventive Care</span>
                    <Badge variant="secondary">134 patients</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Group Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>0-18 years</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>19-35 years</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                      <span className="text-sm">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>36-55 years</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>56+ years</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "22%" }}
                        ></div>
                      </div>
                      <span className="text-sm">22%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

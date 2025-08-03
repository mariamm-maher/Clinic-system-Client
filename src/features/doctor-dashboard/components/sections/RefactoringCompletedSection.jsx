import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Layout,
  Navigation,
  Smartphone,
  Code,
  Settings,
  ArrowRight,
  Star,
} from "lucide-react";
import Breadcrumb from "../Breadcrumb";

export default function RefactoringCompletedSection() {
  const achievements = [
    {
      icon: Layout,
      title: "Separated Sidebar Component",
      description:
        "Created independent, reusable Sidebar component with sticky positioning",
      status: "completed",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Navigation,
      title: "Nested Route Implementation",
      description:
        "Implemented React Router nested routes for dashboard sections",
      status: "completed",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Smartphone,
      title: "Mobile-Responsive Design",
      description:
        "Mobile-friendly sidebar with overlay and touch interactions",
      status: "completed",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Code,
      title: "Modern Architecture",
      description:
        "Clean separation of concerns with modular component structure",
      status: "completed",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const features = [
    "✅ Sticky sidebar navigation that remains fixed during content scrolling",
    "✅ Independent scrolling areas for optimal content consumption",
    "✅ Collapsible sidebar to maximize content space",
    "✅ Mobile-responsive with overlay navigation",
    "✅ Nested routing with React Router for clean URL structure",
    "✅ Breadcrumb navigation for better user orientation",
    "✅ Modern Lucide React icons throughout the interface",
    "✅ Smooth animations and transitions",
    "✅ Tooltips for collapsed sidebar items",
    "✅ Comprehensive error handling and type safety",
  ];

  const routes = [
    {
      path: "/dashboard/overview",
      description: "Main dashboard overview with statistics",
    },
    {
      path: "/dashboard/schedule",
      description: "Doctor's schedule management",
    },
    {
      path: "/dashboard/appointments",
      description: "Patient appointment management",
    },
    {
      path: "/dashboard/appointments/:id",
      description: "Individual appointment details",
    },
    {
      path: "/dashboard/patients",
      description: "Patient records and management",
    },
    { path: "/dashboard/staff", description: "Staff management interface" },
    { path: "/dashboard/statistics", description: "Analytics and reporting" },
    { path: "/dashboard/settings", description: "System configuration" },
    {
      path: "/dashboard/layout-demo",
      description: "Layout demonstration and testing",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🎉 Refactoring Completed!
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Successfully separated the sidebar component and implemented sticky
            navigation with nested routing for the doctor dashboard.
          </p>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm mb-3">
                  {achievement.description}
                </p>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {achievement.status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Accomplished */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span>Features Accomplished</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✅</span>
                <span className="text-gray-700 text-sm">
                  {feature.slice(2)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Structure */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-6 w-6 text-blue-600" />
            <span>Implemented Route Structure</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routes.map((route, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <code className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {route.path}
                  </code>
                  <p className="text-gray-600 text-sm mt-1">
                    {route.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Structure */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-purple-600" />
            <span>Component Architecture</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`doctor-dashboard/
├── components/
│   ├── DashboardLayout.jsx      # Main layout container
│   ├── Sidebar.jsx             # Separated sticky sidebar
│   ├── Breadcrumb.jsx          # Navigation breadcrumbs
│   └── sections/
│       ├── OverviewSection.jsx
│       ├── ScheduleSection.jsx
│       ├── AppointmentSection.jsx
│       ├── AppointmentDetailsSection.jsx
│       ├── PatientsSection.jsx
│       ├── StaffSection.jsx
│       ├── StatisticsSection.jsx
│       ├── SettingsSection.jsx
│       └── LayoutDemoSection.jsx`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-indigo-600" />
            <span>Usage Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Navigation</h4>
            <p className="text-gray-600 text-sm">
              Use the sidebar navigation to switch between different dashboard
              sections. The sidebar remains sticky and accessible at all times.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Collapsing Sidebar
            </h4>
            <p className="text-gray-600 text-sm">
              Click the chevron button in the sidebar header to collapse/expand
              the navigation. Collapsed items show tooltips on hover.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Mobile Usage</h4>
            <p className="text-gray-600 text-sm">
              On mobile devices, use the hamburger menu in the top header to
              access navigation. The sidebar appears as an overlay.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Adding New Routes
            </h4>
            <p className="text-gray-600 text-sm">
              To add new dashboard sections: create the component, add it to
              App.jsx routes, and include it in the Sidebar navigation items.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">
          Implementation Successful! 🚀
        </h3>
        <p className="text-green-100 max-w-2xl mx-auto">
          The doctor dashboard has been successfully refactored with a
          separated, sticky sidebar component and nested routing structure. The
          layout is now more maintainable, responsive, and user-friendly.
        </p>
      </div>
    </div>
  );
}

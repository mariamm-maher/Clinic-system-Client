import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Layout, Navigation, Scroll } from "lucide-react";
import Breadcrumb from "../Breadcrumb";

export default function LayoutDemoSection() {
  const benefits = [
    {
      icon: Navigation,
      title: "Sticky Sidebar Navigation",
      description:
        "Navigation remains accessible at all times, even when scrolling through long content",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Scroll,
      title: "Independent Scrolling",
      description:
        "Main content area scrolls independently from the sidebar for better content consumption",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Layout,
      title: "Responsive Design",
      description:
        "Layout adapts perfectly to different screen sizes with mobile-friendly navigation",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Layout Demo</h2>
        <p className="text-gray-600">
          Demonstration of the new sticky sidebar layout with independent
          scrolling areas
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Implementation Details */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Implementation Highlights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Sidebar Component
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Separated
                  </Badge>
                  <span>Independent sidebar component</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Sticky
                  </Badge>
                  <span>Fixed position with full height</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Responsive
                  </Badge>
                  <span>Mobile-friendly with overlay</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Collapsible
                  </Badge>
                  <span>Can be collapsed to save space</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Main Content Area
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Scrollable
                  </Badge>
                  <span>Independent scrolling behavior</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Nested Routes
                  </Badge>
                  <span>React Router nested routing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Sticky Header
                  </Badge>
                  <span>Header remains visible while scrolling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Flexible
                  </Badge>
                  <span>Adapts to content length</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Scrollable Content */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Scrollable Content Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This section contains extended content to demonstrate the scrolling
            behavior. Notice how the sidebar navigation remains fixed while this
            content area scrolls independently.
          </p>

          {/* Generate demo content */}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-4 rounded-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  Demo Content Block {i + 1}
                </h4>
                <Badge variant="outline" className="text-xs">
                  Item {i + 1}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                This is demonstration content block number {i + 1}. As you
                scroll through this content, observe how the sidebar navigation
                remains perfectly positioned and accessible. This layout pattern
                is commonly used in modern dashboard applications for optimal
                user experience.
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Demo
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Block {i + 1}
                </Badge>
                {i % 3 === 0 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 text-green-800"
                  >
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-2">🎉 End of Demo Content</h4>
            <p className="text-blue-100">
              You've reached the end of the demo content! Notice how the sidebar
              remained perfectly positioned throughout your scrolling journey.
              This demonstrates the effectiveness of the new sticky layout.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

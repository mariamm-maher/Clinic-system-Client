import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, User, Stethoscope } from "lucide-react";

export default function PatientDetailsNavigation({ activeView, onViewChange }) {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Heart,
      description: "General information and status",
    },
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
      description: "Contact and personal details",
    },
    {
      id: "medical",
      label: "Medical Info",
      icon: Stethoscope,
      description: "Medical history and records",
    },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-red-100 shadow-lg">
      <CardContent className="p-2">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-3 px-4 py-3 h-auto text-left transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md"
                    : "hover:bg-red-50 hover:text-red-700"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-red-100" : "text-slate-500"
                    }`}
                  >
                    {item.description}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

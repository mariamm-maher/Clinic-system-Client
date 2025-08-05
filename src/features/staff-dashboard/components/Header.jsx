import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LanguageToggle from "@/components/common/LanguageToggle";
import { LogoutButton } from "@/features/auth";
import {
  Building2,
  Bell,
  Settings,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
                  {t("logo.clinicName")}
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Staff Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Date & Time */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-xl border border-blue-100">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(currentTime)}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(currentTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            <Separator orientation="vertical" className="h-8" />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>{" "}
            </Button>

            <Separator orientation="vertical" className="h-8" />

            {/* Logout Button */}
            <LogoutButton variant="ghost" size="sm" />

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  ST
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-gray-600">Front Desk Staff</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Date/Time - Show on smaller screens */}
        <div className="md:hidden mt-4 flex justify-center">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 rounded-xl border border-blue-100">
            <Calendar className="w-4 h-4 text-blue-600" />
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(currentTime)}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1 justify-center">
                <Clock className="w-3 h-3" />
                {formatTime(currentTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

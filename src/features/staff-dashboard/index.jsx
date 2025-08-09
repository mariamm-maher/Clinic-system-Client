import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";
import QueueManagement from "./components/QueueManagement";
import AppointmentManagement from "./components/AppointmentManagement";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

export default function StaffDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("queue");
  
  // Scroll to top when tab changes
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });
  
  // Also scroll to top when activeTab state changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "queue" && <QueueManagement />}
          {activeTab === "appointments" && <AppointmentManagement />}
        </div>
      </main>
    </div>
  );
}

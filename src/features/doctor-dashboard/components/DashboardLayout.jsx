import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <div className="flex h-screen">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Top Header - Mobile Only */}
            <header className="lg:hidden bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="h-9 w-9 p-0"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <h1 className="font-semibold text-gray-900">ClinicCare</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Search className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content Area - Scrollable independently */}
            <main className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

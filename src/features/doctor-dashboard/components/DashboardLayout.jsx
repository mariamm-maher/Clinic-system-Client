import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Menu, Bell, Plus } from "lucide-react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <TooltipProvider>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex min-h-screen">
        {/* Sticky Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}{" "}
        {/* Main Content Area - Scrollable */}
        <div
          className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-300"
          )}
        >
          {/* Top Header - Mobile Only */}
          <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>{" "}
          {/* Main Content Area - Scrollable independently */}
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

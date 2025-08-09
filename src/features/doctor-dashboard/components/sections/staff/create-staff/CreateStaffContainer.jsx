import React, { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import ModernBreadcrumb from "../../../ModernBreadcrumb";
import { StepIndicator } from "./index";
import { useStaffFormStore } from "./staffFormStore";

export default function CreateStaffContainer() {
  const navigate = useNavigate();

  // Use zustand store for form state (no step management)
  const { resetForm, isLoading } = useStaffFormStore();

  // Navigation
  const handleCancel = () => {
    resetForm();
    navigate("/doctor-dashboard/staff");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-lg">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-lg font-medium text-slate-700">
              Creating staff member...
            </span>
          </div>
        </div>
      )}

      <ModernBreadcrumb />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              className="p-2 hover:bg-blue-100 disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Add New Staff Member
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Create a comprehensive staff profile with all necessary details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator />

      <div className="max-w-6xl mx-auto">
        {/* Outlet will render the step-specific component */}
        <Outlet />
      </div>
    </div>
  );
}

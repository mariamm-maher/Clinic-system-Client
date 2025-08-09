import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNewVisitStore } from "./store/newVisitStore";
import { TabNavigation } from "./navigation";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";
import { 
  BasicInfoStep, 
  PastHistoryStep, 
  MainComplaintStep, 
  ChecksStep, 
  ExaminationStep, 
  InvestigationsStep, 
  PrescriptionStep 
} from "./sections";

export default function NewVisitContainer() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, resetForm, submitForm } = useNewVisitStore();

  // Get current tab from URL
  const pathParts = location.pathname.split('/');
  const currentTab = pathParts[pathParts.length - 1] === 'new-visit' ? 'basic-info' : pathParts[pathParts.length - 1];
  
  // Scroll to top when tab changes
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  useEffect(() => {
    // Initialize form for this patient if needed
    // This could load patient data or set patient ID
  }, [patientId]);

  const handleBack = () => {
    navigate(`/doctor-dashboard/patients/${patientId}`);
  };

  const handleCancel = () => {
    resetForm();
    navigate(`/doctor-dashboard/patients/${patientId}`);
  };

  const handleSave = async () => {
    try {
      await submitForm();
      navigate(`/doctor-dashboard/patients/${patientId}`);
    } catch (error) {
      console.error("Failed to save visit:", error);
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'basic-info':
        return <BasicInfoStep />;
      case 'past-history':
        return <PastHistoryStep />;
      case 'main-complaint':
        return <MainComplaintStep />;
      case 'checks':
        return <ChecksStep />;
      case 'examination':
        return <ExaminationStep />;
      case 'investigations':
        return <InvestigationsStep />;
      case 'prescription':
        return <PrescriptionStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-slate-700 font-medium">Saving visit...</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-0 h-auto font-normal hover:text-blue-600"
          >
            Patients
          </Button>
          <span>/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-0 h-auto font-normal hover:text-blue-600"
          >
            Patient {patientId}
          </Button>
          <span>/</span>
          <span className="text-slate-900 font-medium">New Visit</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">New Visit</h1>
                <p className="text-slate-600">Create a comprehensive patient visit record</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Visit'
              )}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation currentTab={currentTab} patientId={patientId} />

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

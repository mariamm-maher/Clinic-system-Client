import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useLanguageInitialization } from "./hooks/useLanguageInitialization";
import { useAuthStore } from "@/stores";
import Home from "./features/home/home.jsx";
import NotFound from "./components/common/NotFound.jsx";
import DashboardLayout from "./features/doctor-dashboard/components/DashboardLayout.jsx";
import StaffDashboard from "./features/staff-dashboard/index.jsx";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/QueryProvider";
import {
  OverviewSection,
  ScheduleSection,
  AppointmentSection,
  AppointmentDetailsSection,
  PatientsSection,
  PatientProfile,
  NewVisit,
  StaffSection,
  StatisticsSection,
  SettingsSection,
  LayoutDemoSection,
  RefactoringCompletedSection,
} from "./features/doctor-dashboard/components/sections";

// Import auth components from index file
import {
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  ProtectedRoute,
  LoginCallback,
} from "./features/auth";

// Import patient components
import { PatientProfile as StandalonePatientProfile } from "./features/patient";

function App() {
  // Initialize language and RTL support
  useLanguageInitialization();

  // Initialize authentication state from localStorage
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // This runs once when the app loads
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Patient Profile - Protected Patient Route */}
          <Route
            path="/patient-profile"
            element={
              <ProtectedRoute roles="patient">
                <StandalonePatientProfile />
              </ProtectedRoute>
            }
          />

          {/* Doctor Dashboard - Protected Doctor Route */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute roles="doctor">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewSection />} />
            <Route path="schedule" element={<ScheduleSection />} />
            <Route path="appointments" element={<AppointmentSection />} />
            <Route
              path="appointments/:id"
              element={<AppointmentDetailsSection />}
            />
            <Route path="patients" element={<PatientsSection />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route
              path="patients/:patientId/new-visit"
              element={<NewVisit />}
            />
            <Route
              path="staff"
              element={
                <ProtectedRoute roles="doctor">
                  <StaffSection />
                </ProtectedRoute>
              }
            />
            <Route path="statistics" element={<StatisticsSection />} />
            <Route path="settings" element={<SettingsSection />} />
            <Route path="layout-demo" element={<LayoutDemoSection />} />
            <Route
              path="refactoring-completed"
              element={<RefactoringCompletedSection />}
            />
          </Route>

          {/* Staff Dashboard - Protected Staff/Doctor Route */}
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute roles={["staff", "doctor"]}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </Router>
    </QueryProvider>
  );
}

export default App;

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
  ModernOverviewSection,
  ScheduleSection,
  AppointmentsSection,
  // AppointmentDetailsSection,
  PatientsSection,
  PatientProfile,
  NewVisit,
  StaffSection,
  StatisticsSection,
  SettingsSection,
  LayoutDemoSection,
  RefactoringCompletedSection,
} from "./features/doctor-dashboard/components/sections";

// Import individual staff management components
import {
  StaffOverview,
  CreateStaff,
  StaffDetail,
} from "./features/doctor-dashboard/components/sections/staff";

// Import create staff route components
import {
  CreateStaffContainer,
  BasicInfoRoute,
  PersonalInfoRoute,
  ProfessionalInfoRoute,
  ReviewRoute,
} from "./features/doctor-dashboard/components/sections/staff/create-staff";

// Import new visit route components
import {
  NewVisitContainer,
  BasicInfoRoute as NewVisitBasicInfoRoute,
  PastHistoryRoute,
  MainComplaintRoute,
  ChecksRoute,
  ExaminationRoute,
  InvestigationsRoute,
  PrescriptionRoute,
} from "./features/doctor-dashboard/components/sections/newVisit";

// Import staff details route components
import {
  StaffDetailsContainer,
  OverviewRoute,
  BasicInfoRoute as StaffBasicInfoRoute,
  PersonalInfoRoute as StaffPersonalInfoRoute,
  ProfessionalInfoRoute as StaffProfessionalInfoRoute,
} from "./features/doctor-dashboard/components/sections/staff/staff-details";

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
            <Route index element={<ModernOverviewSection />} />
            <Route path="schedule" element={<ScheduleSection />} />
            <Route path="appointments" element={<AppointmentsSection />} />
            {/* <Route
              path="appointments/:id"
              element={<AppointmentDetailsSection />}
            /> */}
            <Route path="patients" element={<PatientsSection />} />
            <Route path="patients/:id" element={<PatientProfile />} />

            {/* New visit with tab-based navigation */}
            <Route
              path="patients/:patientId/new-visit"
              element={
                <ProtectedRoute roles="doctor">
                  <NewVisitContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="patients/:patientId/new-visit/:tab"
              element={
                <ProtectedRoute roles="doctor">
                  <NewVisitContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="staff"
              element={
                <ProtectedRoute roles="doctor">
                  <StaffOverview />
                </ProtectedRoute>
              }
            />
            {/* Nested routes for create staff workflow */}
            <Route
              path="staff/create"
              element={
                <ProtectedRoute roles="doctor">
                  <CreateStaffContainer />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="1" replace />} />
              <Route path="1" element={<BasicInfoRoute />} />
              <Route path="2" element={<PersonalInfoRoute />} />
              <Route path="3" element={<ProfessionalInfoRoute />} />
              <Route path="4" element={<ReviewRoute />} />
            </Route>
            {/* Nested routes for staff details workflow */}
            <Route
              path="staff/:id"
              element={
                <ProtectedRoute roles="doctor">
                  <StaffDetailsContainer />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewRoute />} />
              <Route path="basic" element={<StaffBasicInfoRoute />} />
              <Route path="personal" element={<StaffPersonalInfoRoute />} />
              <Route
                path="professional"
                element={<StaffProfessionalInfoRoute />}
              />
            </Route>

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

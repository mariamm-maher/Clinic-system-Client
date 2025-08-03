import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useLanguageInitialization } from "./hooks/useLanguageInitialization";
import Home from "./features/home/index.jsx";
import { AuthProvider, ProtectedRoute } from "./features/auth";
import DashboardLayout from "./features/doctor-dashboard/components/DashboardLayout.jsx";
import StaffDashboard from "./features/staff-dashboard/index.jsx";
import { Toaster } from "@/components/ui/sonner";

// Import dashboard sections for nested routes
import OverviewSection from "./features/doctor-dashboard/components/sections/OverviewSection";
import ScheduleSection from "./features/doctor-dashboard/components/sections/ScheduleSection";
import AppointmentSection from "./features/doctor-dashboard/components/sections/AppointmentSection";
import AppointmentDetailsSection from "./features/doctor-dashboard/components/sections/AppointmentDetailsSection";
import PatientsSection from "./features/doctor-dashboard/components/sections/PatientsSection";
import PatientProfile from "./features/doctor-dashboard/components/sections/PatientProfile";
import NewVisit from "./features/doctor-dashboard/components/sections/NewVisit";
import StaffSection from "./features/doctor-dashboard/components/sections/StaffSection";
import StatisticsSection from "./features/doctor-dashboard/components/sections/StatisticsSection";
import SettingsSection from "./features/doctor-dashboard/components/sections/SettingsSection";
import LayoutDemoSection from "./features/doctor-dashboard/components/sections/LayoutDemoSection";
import RefactoringCompletedSection from "./features/doctor-dashboard/components/sections/RefactoringCompletedSection";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import ResetPassword from "./features/auth/components/ResetPassword";

function App() {
  // Initialize language and RTL support
  useLanguageInitialization();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard Routes with Nested Routes */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute requiredRoles={["admin", "doctor", "staff"]}>
              <DashboardLayout />
              // </ProtectedRoute>
            }
          >
            {/* Nested Dashboard Routes */}
            <Route
              index
              element={<Navigate to="/dashboard/overview" replace />}
            />
            <Route path="overview" element={<OverviewSection />} />
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
            <Route path="staff" element={<StaffSection />} />
            <Route path="statistics" element={<StatisticsSection />} />
            <Route path="settings" element={<SettingsSection />} />
            <Route path="layout-demo" element={<LayoutDemoSection />} />
            <Route
              path="refactoring-completed"
              element={<RefactoringCompletedSection />}
            />
          </Route>

          {/* Staff Dashboard Route */}
          <Route
            path="/staff-dashboard"
            element={
              // <ProtectedRoute requiredRoles={["admin", "staff"]}>
              <StaffDashboard />
              // </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;

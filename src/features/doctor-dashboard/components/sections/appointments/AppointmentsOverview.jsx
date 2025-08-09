import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Plus,
  Stethoscope,
  Users,
  AlertTriangle,
  UserCheck,
  Activity,
  Clock,
  ArrowRight,
} from "lucide-react";
// import Breadcrumb from "../Breadcrumb";
import AppointmentsTable from "./AppointmentsTable";

// Mock data for appointments and queue
const mockAppointments = [
  // ...fill with appointment objects similar to patients...
];

export default function AppointmentsOverview() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments] = useState(mockAppointments);

  // Filtering logic (adapt as needed)
  const filteredAppointments = appointments.filter((appt) => {
    // ...filter logic based on searchTerm and statusFilter...
    return true;
  });

  // Handler stubs
  const handleViewAppointment = (id) =>
    navigate(`/doctor-dashboard/appointments/${id}`);
  const handleEditAppointment = (id) =>
    navigate(`/doctor-dashboard/appointments/${id}/edit`);
  const handleCreateAppointment = () =>
    navigate("/doctor-dashboard/appointments/create");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      {/* <Breadcrumb /> */}
      {/* Header, stats, and actions (similar to PatientsOverview) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* ...header and stats UI... */}
        <Button
          onClick={handleCreateAppointment}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Appointment
        </Button>
      </motion.div>
      {/* Appointments Table/Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl overflow-hidden m-3">
          <AppointmentsTable
            appointments={filteredAppointments}
            onViewAppointment={handleViewAppointment}
            onEditAppointment={handleEditAppointment}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            totalAppointmentCount={appointments.length}
          />
        </Card>
      </motion.div>
    </div>
  );
}

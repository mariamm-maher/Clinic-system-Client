import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Heart, AlertTriangle, Activity, UserCheck } from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import PatientsTable from "./PatientsTable";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

// Mock data - replace with actual API calls
const mockPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    condition: "Hypertension",
    status: "stable",
    avatar: null,
    priority: "normal",
    insurance: "Blue Cross",
    bloodType: "O+",
    mrn: "MRN001234",
    emergencyContact: "+1 (555) 987-6543",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 42,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-25",
    condition: "Diabetes Type 2",
    status: "monitoring",
    avatar: null,
    priority: "high",
    insurance: "Aetna",
    bloodType: "A+",
    mrn: "MRN001235",
    emergencyContact: "+1 (555) 876-5432",
  },
  {
    id: 3,
    name: "Emma Davis",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    email: "emma.davis@email.com",
    lastVisit: "2024-01-12",
    nextAppointment: "Today",
    condition: "Chest Pain Investigation",
    status: "critical",
    avatar: null,
    priority: "urgent",
    insurance: "Medicare",
    bloodType: "B-",
    mrn: "MRN001236",
    emergencyContact: "+1 (555) 765-4321",
  },
  {
    id: 4,
    name: "Robert Wilson",
    age: 56,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "robert.wilson@email.com",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-30",
    condition: "Regular Checkup",
    status: "stable",
    avatar: null,
    priority: "normal",
    insurance: "United Healthcare",
    bloodType: "AB+",
    mrn: "MRN001237",
    emergencyContact: "+1 (555) 654-3210",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    age: 45,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "lisa.martinez@email.com",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-28",
    condition: "Asthma Follow-up",
    status: "monitoring",
    avatar: null,
    priority: "high",
    insurance: "Cigna",
    bloodType: "O-",
    mrn: "MRN001238",
    emergencyContact: "+1 (555) 543-2109",
  },
];

export default function PatientsOverview() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients] = useState(mockPatients);
  
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewPatient = (patientId) => {
    navigate(`/doctor-dashboard/patients/${patientId}`);
  };

  const handleEditPatient = (patientId) => {
    navigate(`/doctor-dashboard/patients/${patientId}/edit`);
  };

  const handleCreatePatient = () => {
    navigate("/doctor-dashboard/patients/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <ModernBreadcrumb />

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Title Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 rounded-full blur opacity-25"></div>
              <div className="relative bg-white p-4 rounded-full shadow-lg">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-red-700 to-rose-700 bg-clip-text text-transparent">
                Patient Management
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Comprehensive patient care and health records
              </p>
            </div>
          </div>

          {/* Stats and Action Section */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2">
              {/* Total Patients */}
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <Heart className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Total
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {patients.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Critical */}
              <div className="bg-white/80 backdrop-blur-sm border border-red-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-md">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Critical
                    </p>
                    <p className="text-lg font-bold text-red-600">
                      {patients.filter((p) => p.status === "critical").length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monitoring */}
              <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-100 rounded-md">
                    <Activity className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Monitoring
                    </p>
                    <p className="text-lg font-bold text-yellow-600">
                      {patients.filter((p) => p.status === "monitoring").length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stable */}
              <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <UserCheck className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Stable
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {patients.filter((p) => p.status === "stable").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Patient Button */}
            <Button
              onClick={handleCreatePatient}
              className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 hover:from-red-700 hover:via-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 h-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="font-medium">Add Patient</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Patients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl overflow-hidden m-3">
          <PatientsTable
            patients={filteredPatients}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            totalPatientCount={patients.length}
          />
        </Card>
      </motion.div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ModernBreadcrumb from "../../../ModernBreadcrumb";
import PatientDetailsNavigation from "./PatientDetailsNavigation";
import OverviewView from "./OverviewView";
import PersonalInfoView from "./PersonalInfoView";
import MedicalInfoView from "./MedicalInfoView";

// Mock patient data - replace with actual API call
const mockPatient = {
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
  address: "123 Main St, City, State 12345",
  dateOfBirth: "1990-05-15",
  allergies: ["Penicillin", "Shellfish"],
  medications: ["Lisinopril 10mg", "Aspirin 81mg"],
  medicalHistory: ["Hypertension", "Seasonal Allergies"],
  emergencyContactName: "John Johnson (Husband)",
};

export default function PatientDetailsContainer({ patientId }) {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchPatient = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        setTimeout(() => {
          setPatient(mockPatient);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching patient:", error);
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleEdit = () => {
    navigate(`/doctor-dashboard/patients/${patientId}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/50 p-6">
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Patient not found
          </h3>
          <p className="text-gray-500">
            The patient you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <OverviewView patient={patient} />;
      case "personal":
        return <PersonalInfoView patient={patient} />;
      case "medical":
        return <MedicalInfoView patient={patient} />;
      default:
        return <OverviewView patient={patient} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/50 p-6">
      <ModernBreadcrumb />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/doctor-dashboard/patients")}
              className="h-12 w-12 p-0 hover:bg-red-100 hover:text-red-600"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 rounded-full blur opacity-25"></div>
              <div className="relative bg-white p-4 rounded-full shadow-lg">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-red-700 to-rose-700 bg-clip-text text-transparent">
                {patient.name}
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                MRN: {patient.mrn} • {patient.age} years old • {patient.gender}
              </p>
            </div>
          </div>

          <Button
            onClick={handleEdit}
            className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 hover:from-red-700 hover:via-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 h-auto"
          >
            <Edit className="w-5 h-5 mr-2" />
            <span className="font-medium">Edit Patient</span>
          </Button>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <PatientDetailsNavigation
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
          {renderView()}
        </Card>
      </motion.div>
    </div>
  );
}

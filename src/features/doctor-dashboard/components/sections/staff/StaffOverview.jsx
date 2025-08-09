import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Users, Clock, UserCheck } from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import StaffTable from "./StaffTable";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

// Mock data - replace with actual API calls
const mockStaff = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Cardiologist",
    department: "Cardiology",
    email: "sarah.mitchell@clinic.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    shift: "morning",
    experience: "12 years",
    startDate: "2020-03-15",
    currentPatients: 45,
    rating: 4.9,
    avatar: null,
  },
  {
    id: 2,
    name: "Jennifer Rodriguez",
    role: "Head Nurse",
    department: "Nursing",
    email: "jennifer.rodriguez@clinic.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    shift: "morning",
    experience: "8 years",
    startDate: "2018-06-01",
    currentPatients: 12,
    rating: 4.8,
    avatar: null,
  },
  {
    id: 3,
    name: "Dr. Michael Thompson",
    role: "Emergency Physician",
    department: "Emergency",
    email: "michael.thompson@clinic.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    shift: "night",
    experience: "15 years",
    startDate: "2016-09-10",
    currentPatients: 0,
    rating: 4.7,
    avatar: null,
  },
  {
    id: 4,
    name: "Lisa Chen",
    role: "Medical Assistant",
    department: "Administration",
    email: "lisa.chen@clinic.com",
    phone: "+1 (555) 321-0987",
    status: "active",
    shift: "morning",
    experience: "5 years",
    startDate: "2021-01-20",
    currentPatients: 8,
    rating: 4.6,
    avatar: null,
  },
  {
    id: 5,
    name: "Dr. Robert Kim",
    role: "Radiologist",
    department: "Radiology",
    email: "robert.kim@clinic.com",
    phone: "+1 (555) 654-3210",
    status: "on-leave",
    shift: "night",
    experience: "10 years",
    startDate: "2019-04-05",
    currentPatients: 0,
    rating: 4.8,
    avatar: null,
  },
];

export default function StaffOverview() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [staff] = useState(mockStaff);
  
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift = shiftFilter === "all" || member.shift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const handleViewStaff = (staffId) => {
    navigate(`/doctor-dashboard/staff/${staffId}`);
  };

  const handleEditStaff = (staffId) => {
    navigate(`/doctor-dashboard/staff/${staffId}/edit`);
  };

  const handleCreateStaff = () => {
    navigate("/doctor-dashboard/staff/create");
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-25"></div>
              <div className="relative bg-white p-4 rounded-full shadow-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Staff Management
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Manage your clinic team with precision and care
              </p>
            </div>
          </div>

          {/* Stats and Action Section */}
          <div className="flex items-center gap-4">            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              {/* Total Staff */}
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <Users className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Total Staff
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {staff.length}
                    </p>
                  </div>
                </div>
              </div>
              {/* Active Today */}
              <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <UserCheck className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Active
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {staff.filter((s) => s.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>
              {/* Deactivated */}
              <div className="bg-white/80 backdrop-blur-sm border border-red-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-md">
                    <Clock className="h-3 w-3 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Deactivated
                    </p>
                    <p className="text-lg font-bold text-red-600">
                      {staff.filter((s) => s.status === "on-leave").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Add Staff Button */}
            <Button
              onClick={handleCreateStaff}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 h-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="font-medium">Add Staff Member</span>
            </Button>{" "}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Staff Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl overflow-hidden m-3">
          <StaffTable
            staff={filteredStaff}
            onViewStaff={handleViewStaff}
            onEditStaff={handleEditStaff}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            shiftFilter={shiftFilter}
            setShiftFilter={setShiftFilter}
            totalStaffCount={staff.length}
          />
        </Card>
      </motion.div>
    </div>
  );
}

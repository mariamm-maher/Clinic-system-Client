import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  User,
  FileText,
  Briefcase,
  BarChart3,
  Edit,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ModernBreadcrumb from "../../../ModernBreadcrumb";
import { StaffDetailsNavigation } from "./index";

// Mock data - replace with actual API calls
const mockStaffData = {
  1: {
    id: 1,
    // Basic Info
    name: "Dr. Sarah Mitchell",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@clinic.com",
    phone: "+1 (555) 123-4567",
    password: "********",
    avatar: null,

    // Personal Info
    personalInfo: {
      phone: "+1 (555) 123-4567",
      age: "34",
      gender: "female",
      dateOfBirth: "1990-05-15",
      nationality: "American",
      address: {
        street: "123 Medical Center Drive",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      emergencyContact: {
        name: "John Mitchell",
        phone: "+1 (555) 987-6543",
        relationship: "spouse",
      },
    },
    identification: {
      nationalID: "123456789",
      nationalIDPhoto: {
        front: null,
        back: null,
      },
    },

    // Professional Info
    professional: {
      department: "Cardiology",
      position: "Doctor",
      employeeId: "EMP001",
      hireDate: "2020-03-15",
      licenseNumber: "MD12345",
      licenseExpiry: "2025-12-31",
      experience: {
        years: "12",
      },
      qualifications: [
        {
          degree: "Doctor of Medicine",
          institution: "Harvard Medical School",
          year: "2012",
          certificatePhoto: null,
        },
        {
          degree: "Bachelor of Science in Biology",
          institution: "Stanford University",
          year: "2008",
          certificatePhoto: null,
        },
      ],
      specializations: ["Interventional Cardiology", "Heart Failure"],
      shift: "Morning (8:00 AM - 4:00 PM)",
      supervisor: "Dr. Johnson",
      salary: "$180,000",
    },

    // Additional Info
    status: "active",
    currentPatients: 45,
    rating: 4.9,
    notes:
      "Excellent cardiologist with extensive experience in interventional procedures.",
    certifications: [
      {
        name: "Board Certified Cardiologist",
        issuer: "American Board of Internal Medicine",
        expiry: "2025-06-30",
      },
      {
        name: "Advanced Cardiac Life Support",
        issuer: "American Heart Association",
        expiry: "2024-08-15",
      },
    ],
  },
  // Add more mock staff members here...
};

export default function StaffDetailsContainer() {
  const { id, tab = "overview" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const tabs = [
    { id: "overview", title: "Overview", icon: BarChart3 },
    { id: "basic", title: "Basic Info", icon: User },
    { id: "personal", title: "Personal Info", icon: FileText },
    { id: "professional", title: "Professional Info", icon: Briefcase },
  ];

  const currentTab =
    tabs.find((t) => location.pathname.includes(t.id)) || tabs[0];

  useEffect(() => {
    fetchStaffDetails();
  }, [id]);

  const fetchStaffDetails = async () => {
    try {
      setLoading(true);
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const staff = mockStaffData[id];
      if (!staff) {
        setError("Staff member not found");
        return;
      }

      setStaffData(staff);
    } catch (err) {
      setError("Failed to fetch staff details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/doctor-dashboard/staff");
  };

  const handleEdit = () => {
    navigate(`/doctor-dashboard/staff/${id}/edit`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call to delete staff
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would make the actual API call to delete staff
      console.log("Deleting staff member:", id);

      // Navigate back to staff overview
      navigate("/doctor-dashboard/staff");
    } catch (error) {
      console.error("Error deleting staff member:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "on-leave":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 font-medium">
              Loading staff details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <div className="flex space-x-4 justify-center">
              <Button onClick={fetchStaffDetails} variant="outline">
                Try Again
              </Button>
              <Button onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Staff
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <ModernBreadcrumb />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-blue-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-25"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {staffData.firstName?.[0]}
                  {staffData.lastName?.[0]}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  {staffData.firstName} {staffData.lastName}
                </h1>
                <p className="text-slate-600 mt-1 text-lg">
                  {staffData.professional.position} •{" "}
                  {staffData.professional.department} Department
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      staffData.status
                    )}`}
                  >
                    {staffData.status.charAt(0).toUpperCase() +
                      staffData.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Employee ID: {staffData.professional.employeeId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleEdit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {staffData.firstName}{" "}
                    {staffData.lastName}? This action cannot be undone and will
                    permanently remove all staff data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Staff"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StaffDetailsNavigation
            tabs={tabs}
            currentTab={currentTab.id}
            staffId={id}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl"
        >
          <Outlet context={{ staffData, setStaffData }} />
        </motion.div>
      </div>
    </div>
  );
}

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
import { useStaffStore } from "../../../../stores/staffStore";

export default function StaffDetailsContainer() {
  const { id, tab = "overview" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [staffData, setStaffData] = useState(null);

  // Use Zustand store instead of local state
  const {
    isLoading: loading,
    error,
    fetchStaffById,
    clearError,
  } = useStaffStore();

  const tabs = [
    { id: "overview", title: "Overview", icon: BarChart3 },
    { id: "basic", title: "Basic Info", icon: User },
    { id: "personal", title: "Personal Info", icon: FileText },
  ];

  const currentTab =
    tabs.find((t) => location.pathname.includes(t.id)) || tabs[0];

  useEffect(() => {
    if (id) {
      fetchStaffById(id)
        .then((data) => {
          console.log("Staff data fetched:", data);
          setStaffData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch staff details:", err);
        });
    }
  }, [id]);

  const handleRetry = () => {
    clearError();
    if (id) {
      fetchStaffById(id)
        .then((data) => {
          setStaffData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch staff details:", err);
        });
    }
  };

  const handleBack = () => {
    navigate("/doctor-dashboard/staff");
  };

  const handleEdit = () => {
    navigate(`/doctor-dashboard/staff/${id}/edit`);
  };

  const handleDelete = async () => {
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
              <Button onClick={handleRetry} variant="outline">
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

  // Show loading if no staff data yet
  if (!staffData) {
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
                {staffData.user?.avatar ? (
                  <img
                    src={staffData.user.avatar}
                    alt={staffData.user.name}
                    className="relative w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {staffData.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  {staffData.user?.name || 'Unknown Staff'}
                </h1>
                <p className="text-slate-600 mt-1 text-lg">
                  {staffData.user?.role || 'Unknown Role'}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      staffData.isActive ? 'active' : 'inactive'
                    )}`}
                  >
                    {staffData.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Employee ID: {staffData._id || 'N/A'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {staffData.user?.email || 'No email'}
                  </span>
                  {staffData.personalInfo?.phone && (
                    <span className="text-sm text-gray-500">
                      {staffData.personalInfo.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">

            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {staffData.user?.name}? This action cannot be undone and will
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
          <Outlet context={{ staffData }} />
        </motion.div>
      </div>
    </div>
  );
}

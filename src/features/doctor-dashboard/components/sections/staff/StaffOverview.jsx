import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Users, Clock, UserCheck, AlertTriangle, UserX, UserCheck2 } from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";
import CompactSearchFilter from "./CompactSearchFilter";
import StaffTable from "./StaffTable";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";
import { useStaffStore } from "@/features/doctor-dashboard/stores/staffStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function StaffOverview() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { staff, isLoading, error, fetchStaff, toggleStaffStatus } = useStaffStore();

  useEffect(() => {
    fetchStaff();
  }, []);
  
  // Scroll to top when this section is accessed
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });

  const filteredStaff = staff.filter((member) => {
    const nameMatch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "all" || member.status === statusFilter;
    return nameMatch && statusMatch;
  });

  const handleViewStaff = (staffId) => {
    navigate(`/doctor-dashboard/staff/${staffId}`);
  };



  const handleToggleStatus = async (staffId, currentStatus) => {
    await toggleStaffStatus(staffId, currentStatus);
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
                      {staff.filter((s) => s.status === "inactive").length}
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
          <CompactSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            filterOptions={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            filterLabel="Status"
            filteredCount={filteredStaff.length}
            totalCount={staff.length}
          />
          {isLoading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <AlertTriangle className="mx-auto h-12 w-12" />
              <h3 className="mt-2 text-lg font-medium">An Error Occurred</h3>
              <p className="mt-1 text-sm text-red-500">{error}</p>
            </div>
          ) : (
            <StaffTable
              staff={filteredStaff}
              onViewStaff={handleViewStaff}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </Card>
      </motion.div>
    </div>
  );
}

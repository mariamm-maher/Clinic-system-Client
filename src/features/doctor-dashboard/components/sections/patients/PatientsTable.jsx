import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  Heart,
  AlertTriangle,
  Activity,
} from "lucide-react";
import CompactSearchFilter from "./CompactSearchFilter";

export default function PatientsTable({
  patients,
  onViewPatient,
  onEditPatient,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  totalPatientCount,
}) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-3 w-3" />;
      case "monitoring":
        return <Activity className="h-3 w-3" />;
      case "stable":
        return <Heart className="h-3 w-3" />;
      default:
        return <Heart className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "monitoring":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "stable":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "normal":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Compact Search Filter Header */}
      <CompactSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredCount={patients.length}
        totalCount={totalPatientCount}
        statuses={["critical", "monitoring", "stable"]}
      />

      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-semibold text-slate-700 py-4">
              Patient
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Medical Info
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Status
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Next Visit
            </TableHead>
            <TableHead className="text-right font-semibold text-slate-700"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="border-slate-100 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-pink-50/30 cursor-pointer transition-all duration-200 group"
              onClick={() => onViewPatient(patient.id)}
            >
              <TableCell className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-600 text-white font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 ${getPriorityColor(
                        patient.priority
                      )} rounded-full border-2 border-white`}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-red-700 transition-colors">
                      {patient.name}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      MRN: {patient.mrn} • {patient.age}y • {patient.gender}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {patient.phone}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-slate-700">
                    {patient.condition}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    Blood Type: {patient.bloodType}
                  </div>
                  <div className="text-xs text-slate-500">
                    Insurance: {patient.insurance}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  className={`${getStatusColor(
                    patient.status
                  )} font-medium px-3 py-1 flex items-center gap-2 w-fit`}
                  variant="outline"
                >
                  {getStatusIcon(patient.status)}
                  {patient.status.charAt(0).toUpperCase() +
                    patient.status.slice(1)}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {patient.nextAppointment}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Last: {patient.lastVisit}
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPatient(patient.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPatient(patient.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-pink-100 hover:text-pink-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {patients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            No patients found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search criteria or add a new patient.
          </p>
        </div>
      )}
    </div>
  );
}

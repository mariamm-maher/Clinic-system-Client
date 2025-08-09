import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Activity,
  Clock,
  Shield,
} from "lucide-react";

export default function OverviewView({ patient }) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      case "monitoring":
        return <Activity className="h-4 w-4" />;
      case "stable":
        return <Heart className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
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
    <>
      <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <Heart className="h-6 w-6 text-red-600" />
          Patient Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl p-6 border border-red-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-600 text-white text-xl font-bold">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-2 -right-2 h-6 w-6 ${getPriorityColor(
                      patient.priority
                    )} rounded-full border-3 border-white shadow-md`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {patient.name}
                  </h3>
                  <p className="text-slate-600">{patient.age} years old</p>
                  <Badge
                    className={`mt-2 ${getStatusColor(
                      patient.status
                    )} flex items-center gap-1`}
                    variant="outline"
                  >
                    {getStatusIcon(patient.status)}
                    {patient.status.charAt(0).toUpperCase() +
                      patient.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <Shield className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">MRN: {patient.mrn}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Summary */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Condition */}
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 border border-blue-100 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Current Condition
                </h4>
                <p className="text-lg font-medium text-slate-700 mb-2">
                  {patient.condition}
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>
                    Blood Type:{" "}
                    <span className="font-medium">{patient.bloodType}</span>
                  </div>
                  <div>
                    Insurance:{" "}
                    <span className="font-medium">{patient.insurance}</span>
                  </div>
                </div>
              </div>

              {/* Appointments */}
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl p-6 border border-green-100 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Appointments
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">Next Appointment</p>
                    <p className="font-medium text-slate-700">
                      {patient.nextAppointment}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Last Visit</p>
                    <p className="font-medium text-slate-700">
                      {patient.lastVisit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-xl p-6 border border-orange-100 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-orange-600" />
                  Emergency Contact
                </h4>
                <div className="space-y-2">
                  <p className="font-medium text-slate-700">
                    {patient.emergencyContactName}
                  </p>
                  <p className="text-sm text-slate-600">
                    {patient.emergencyContact}
                  </p>
                </div>
              </div>

              {/* Quick Medical Info */}
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl p-6 border border-purple-100 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  Quick Medical Info
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-500">Allergies</p>
                    <p className="font-medium text-slate-700">
                      {patient.allergies?.length > 0
                        ? patient.allergies.join(", ")
                        : "None reported"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Current Medications</p>
                    <p className="font-medium text-slate-700">
                      {patient.medications?.length > 0
                        ? patient.medications.length
                        : 0}{" "}
                      active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}

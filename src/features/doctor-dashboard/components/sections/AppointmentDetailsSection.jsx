import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

export default function AppointmentDetailsSection() {
  const navigate = useNavigate();

  const appointment = {
    id: 1,
    patient: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      age: 34,
      gender: "Female",
    },
    date: "2024-01-15",
    time: "09:30 AM",
    duration: 30,
    type: "Consultation",
    status: "confirmed",
    notes: "Annual check-up, patient reports feeling healthy",
    insurance: "Blue Cross",
    copay: 25,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/appointments")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Appointments</span>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Appointment Details
            </h2>
            <p className="text-gray-600">
              View and manage appointment information
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.patient.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Age
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.patient.age} years
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.patient.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.patient.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>Appointment Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.date}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Time
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.time}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Duration
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.duration} minutes
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Type
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.type}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Notes
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                  {appointment.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                {appointment.status}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Visit
              </Button>
              <Button variant="outline" className="w-full">
                Edit Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700"
              >
                Cancel Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

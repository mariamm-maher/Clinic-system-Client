import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Breadcrumb from "../Breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Calendar,
  Clock,
  Users,
  Phone,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  FileText,
  Heart,
  Activity,
  Stethoscope,
  ClipboardList,
  Timer,
  UserCheck,
  Bell,
  ArrowRight,
  Pause,
  RotateCcw,
  MessageSquare,
  FlaskConical,
  Pill,
  Plus,
} from "lucide-react";

export default function AppointmentSection() {
  const navigate = useNavigate();
  const [currentPatient, setCurrentPatient] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  // Real-time queue data (would come from WebSocket or API in real app)
  const [queueData, setQueueData] = useState({
    currentPosition: 1,
    totalInQueue: 4,
    averageWaitTime: 15,
    estimatedCompletion: "11:45 AM",
  });

  // Current patient data (simulated - would be real-time)
  const currentPatientData = {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    appointmentType: "Annual Checkup",
    appointmentTime: "09:30 AM",
    estimatedDuration: 30,
    insurance: "Blue Cross Blue Shield",
    allergies: ["Penicillin", "Shellfish"],
    currentMedications: ["Lisinopril 10mg", "Metformin 500mg"],
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "145 lbs",
      height: "5'6\"",
    },
    medicalHistory: [
      "Hypertension (2019)",
      "Type 2 Diabetes (2020)",
      "Annual Physical (2023)",
    ],
    todaysNotes: "Patient reports feeling well. No new symptoms or concerns.",
    riskLevel: "low",
    lastVisit: "March 15, 2024",
    priority: "normal",
  };

  // Waiting queue (simulated real-time data)
  const [waitingQueue] = useState([
    {
      id: 2,
      name: "Michael Chen",
      appointmentTime: "10:15 AM",
      type: "Follow-up",
      waitTime: 45,
      priority: "high",
      status: "waiting",
    },
    {
      id: 3,
      name: "Emma Davis",
      appointmentTime: "11:00 AM",
      type: "Consultation",
      waitTime: 30,
      priority: "urgent",
      status: "checked-in",
    },
    {
      id: 4,
      name: "Robert Wilson",
      appointmentTime: "11:30 AM",
      type: "Lab Review",
      waitTime: 15,
      priority: "normal",
      status: "waiting",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      appointmentTime: "02:30 PM",
      type: "Surgery Consult",
      waitTime: 5,
      priority: "high",
      status: "waiting",
    },
  ]);

  // Session management
  const startSession = (patient) => {
    setCurrentPatient(patient);
    setSessionStartTime(new Date());
  };

  const callNextPatient = () => {
    if (waitingQueue.length > 0) {
      const nextPatient = waitingQueue[0];
      startSession(nextPatient);
      setQueueData((prev) => ({
        ...prev,
        currentPosition: prev.currentPosition + 1,
        totalInQueue: prev.totalInQueue - 1,
      }));
    }
  };

  const completeAppointment = () => {
    setCurrentPatient(null);
    setSessionStartTime(null);
    // In real app, this would update the backend
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "normal":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatSessionTime = () => {
    if (!sessionStartTime) return "00:00";
    const now = new Date();
    const diff = Math.floor((now - sessionStartTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Header with Queue Status */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <Stethoscope className="h-7 w-7 text-blue-600" />
            <span>Patient Queue</span>
          </h2>
          <p className="text-gray-600 ml-10">
            Manage current patient and waiting queue
          </p>
        </div>

        {/* Real-time Queue Stats */}
        <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {queueData.totalInQueue}
            </div>
            <div className="text-xs text-gray-600">In Queue</div>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {queueData.averageWaitTime}m
            </div>
            <div className="text-xs text-gray-600">Avg Wait</div>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">
              {queueData.estimatedCompletion}
            </div>
            <div className="text-xs text-gray-600">Est. Complete</div>
          </div>
        </div>
      </div>

      {/* Current Patient Session */}
      {currentPatient ? (
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-green-800">
                    Current Patient
                  </CardTitle>
                  <p className="text-sm text-green-600">Session in progress</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {formatSessionTime()}
                </div>
                <div className="text-sm text-green-600">Session Time</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage src="/api/placeholder/64/64" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-lg font-bold">
                      {currentPatientData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentPatientData.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Age:</span>
                        <span className="ml-1 font-semibold">
                          {currentPatientData.age}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-1 font-semibold">
                          {currentPatientData.appointmentType}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-1 font-semibold">
                          {currentPatientData.appointmentTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-1 font-semibold">
                          {currentPatientData.estimatedDuration}m
                        </span>
                      </div>
                    </div>

                    {/* Quick Vital Signs */}
                    <div className="mt-4 p-3 bg-white/70 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-red-500" />
                        Vital Signs
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">BP:</span>
                          <span className="ml-1 font-semibold">
                            {currentPatientData.vitalSigns.bloodPressure}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">HR:</span>
                          <span className="ml-1 font-semibold">
                            {currentPatientData.vitalSigns.heartRate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Temp:</span>
                          <span className="ml-1 font-semibold">
                            {currentPatientData.vitalSigns.temperature}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Weight:</span>
                          <span className="ml-1 font-semibold">
                            {currentPatientData.vitalSigns.weight}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Height:</span>
                          <span className="ml-1 font-semibold">
                            {currentPatientData.vitalSigns.height}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Alerts */}
                    {currentPatientData.allergies.length > 0 && (
                      <Alert className="mt-3 border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          <strong>Allergies:</strong>{" "}
                          {currentPatientData.allergies.join(", ")}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>{" "}
              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50"
                  onClick={() =>
                    navigate(`/dashboard/patients/${currentPatientData.id}`)
                  }
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() =>
                    navigate(
                      `/dashboard/patients/${currentPatientData.id}/new-visit`
                    )
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Visit
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
                  onClick={() =>
                    navigate(`/dashboard/appointments/${currentPatientData.id}`)
                  }
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Session Notes
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 hover:bg-orange-50"
                >
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Order Labs
                </Button>
                <Separator />
                {/* Session Control Buttons */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Appointment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Complete Appointment?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Mark this appointment as completed and move to the next
                        patient in queue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={completeAppointment}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="outline"
                  className="w-full border-yellow-200 hover:bg-yellow-50"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Session
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 hover:bg-orange-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* No Current Patient - Call Next */
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready for Next Patient
            </h3>
            <p className="text-gray-600 mb-6">
              No patient currently in session
            </p>
            {waitingQueue.length > 0 ? (
              <Button
                onClick={callNextPatient}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-3"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Call Next Patient
              </Button>
            ) : (
              <p className="text-gray-500">No patients in queue</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Waiting Queue */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Waiting Queue</CardTitle>
                <p className="text-sm text-gray-600">
                  {waitingQueue.length} patients waiting
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              Next:{" "}
              {waitingQueue.length > 0
                ? waitingQueue[0].appointmentTime
                : "None"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {waitingQueue.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Patients in Queue
              </h3>
              <p className="text-gray-500">
                All appointments completed for now
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingQueue.map((patient, index) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md"
                      : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0
                              ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                              : "bg-gradient-to-br from-gray-400 to-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {patient.name}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{patient.appointmentTime}</span>
                          <span>•</span>
                          <span>{patient.type}</span>
                          <span>•</span>
                          <span>Waiting {patient.waitTime}m</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getPriorityColor(patient.priority)}>
                        {patient.priority}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getStatusColor(patient.status)}
                      >
                        {patient.status}
                      </Badge>
                      {index === 0 && (
                        <Button
                          size="sm"
                          onClick={callNextPatient}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Plus,
  UserCheck,
  Stethoscope,
  Timer,
  Activity,
  Pause,
  RotateCcw,
  ClipboardList,
  FlaskConical,
} from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";

export default function AppointmentSection() {
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

  // Waiting queue
  const [waitingQueue] = useState([
    {
      id: 2,
      name: "Michael Chen",
      appointmentTime: "10:15 AM",
      type: "Follow-up",
      estimatedDuration: 45,
      priority: "high",
      status: "waiting",
    },
    {
      id: 3,
      name: "Emma Davis",
      appointmentTime: "11:00 AM",
      type: "Consultation",
      estimatedDuration: 60,
      priority: "urgent",
      status: "waiting",
    },
    {
      id: 4,
      name: "Robert Wilson",
      appointmentTime: "02:30 PM",
      type: "Lab Review",
      estimatedDuration: 20,
      priority: "normal",
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
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "normal":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSessionDuration = () => {
    if (!sessionStartTime) return "00:00";
    const now = new Date();
    const diff = now - sessionStartTime;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <ModernBreadcrumb />

      {/* Header with Queue Status */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
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
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Timer className="h-4 w-4" />
                    <span>Session Duration: {getSessionDuration()}</span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-green-700 border-green-300"
              >
                In Session
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 border border-green-200">
                  <div className="flex items-start space-x-4 mb-6">
                    <Avatar className="h-16 w-16 border-4 border-green-200 shadow-lg">
                      <AvatarImage src="/api/placeholder/64/64" />
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold text-lg">
                        {currentPatientData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {currentPatientData.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Age:</span>{" "}
                          {currentPatientData.age}
                        </div>
                        <div>
                          <span className="font-medium">Gender:</span>{" "}
                          {currentPatientData.gender}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>{" "}
                          {currentPatientData.appointmentType}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>{" "}
                          {currentPatientData.appointmentTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vital Signs */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-blue-600" />
                      Vital Signs
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {currentPatientData.vitalSigns.bloodPressure}
                        </div>
                        <div className="text-gray-600">BP</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {currentPatientData.vitalSigns.heartRate}
                        </div>
                        <div className="text-gray-600">HR</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {currentPatientData.vitalSigns.temperature}
                        </div>
                        <div className="text-gray-600">Temp</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {currentPatientData.vitalSigns.weight}
                        </div>
                        <div className="text-gray-600">Weight</div>
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {currentPatientData.allergies.length > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Allergies:</strong>{" "}
                        {currentPatientData.allergies.join(", ")}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50"
                  onClick={() =>
                    window.open(
                      `/doctor-dashboard/patients/${currentPatientData.id}`,
                      "_blank"
                    )
                  }
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() =>
                    window.open(
                      `/doctor-dashboard/patients/${currentPatientData.id}/new-visit`,
                      "_blank"
                    )
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Visit
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
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
                size="lg"
              >
                <ChevronRight className="h-5 w-5 mr-2" />
                Call Next Patient
              </Button>
            ) : (
              <div className="text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No patients in queue</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Waiting Queue */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
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
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-orange-50/50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-gray-900">
                        #{index + 1}
                      </div>
                      <div className="text-xs text-gray-500">Queue</div>
                    </div>
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src="/api/placeholder/48/48" />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {patient.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{patient.type}</span>
                        <span>•</span>
                        <span>{patient.appointmentTime}</span>
                        <span>•</span>
                        <span>{patient.estimatedDuration}min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`text-xs ${getPriorityColor(
                        patient.priority
                      )}`}
                    >
                      {patient.priority}
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
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

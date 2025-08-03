import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Breadcrumb from "../Breadcrumb";
import {
  ArrowLeft,
  Edit,
  Phone,
  MapPin,
  Calendar,
  User,
  Heart,
  Activity,
  FileText,
  Clock,
  Stethoscope,
  AlertTriangle,
  Pill,
  TestTube,
  Users,
  Briefcase,
  Home,
  Baby,
  Coffee,
  Plus,
  Download,
  Upload,
} from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock patient data based on the schema
  useEffect(() => {
    // Simulate API call
    const fetchPatient = async () => {
      setLoading(true);
      // Mock data matching the schema
      const mockPatient = {
        _id: id,
        generalInfo: {
          name: "Sarah Johnson",
          age: 34,
          dateOfBirth: "1989-05-15",
          gender: "female",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Anytown, AT 12345",
        },
        personalInfo: {
          occupation: "Software Engineer",
          maritalStatus: "married",
          children: 2,
          habits: ["Non-smoker", "Social drinker", "Regular exercise"],
          other: "Vegetarian diet, works from home",
        },
        medicalInfo: {
          bloodType: "O+",
          allergies: ["Penicillin", "Shellfish"],
          currentMedications: ["Lisinopril 10mg", "Metformin 500mg"],
          chronicConditions: ["Hypertension", "Type 2 Diabetes"],
          emergencyContact: {
            name: "John Johnson",
            relationship: "Husband",
            phone: "+1 (555) 123-4568",
          },
        },
        visits: [
          {
            id: 1,
            date: "2024-01-10",
            type: "Regular Checkup",
            doctor: "Dr. Smith",
            diagnosis: "Routine examination",
            notes: "Patient in good health, blood pressure slightly elevated",
            vitals: {
              bloodPressure: "130/85",
              heartRate: "72 bpm",
              temperature: "98.6°F",
              weight: "150 lbs",
            },
          },
          {
            id: 2,
            date: "2023-12-15",
            type: "Follow-up",
            doctor: "Dr. Smith",
            diagnosis: "Diabetes management",
            notes: "Blood sugar levels improved with current medication",
            vitals: {
              bloodPressure: "125/80",
              heartRate: "68 bpm",
              temperature: "98.4°F",
              weight: "152 lbs",
            },
          },
          {
            id: 3,
            date: "2023-11-20",
            type: "Lab Review",
            doctor: "Dr. Smith",
            diagnosis: "Routine lab work",
            notes: "HbA1c levels within target range",
            vitals: {
              bloodPressure: "128/82",
              heartRate: "70 bpm",
              temperature: "98.5°F",
              weight: "151 lbs",
            },
          },
        ],
        labResults: [
          {
            date: "2024-01-10",
            test: "HbA1c",
            value: "7.2%",
            range: "< 7.0%",
            status: "elevated",
          },
          {
            date: "2024-01-10",
            test: "Total Cholesterol",
            value: "195 mg/dL",
            range: "< 200 mg/dL",
            status: "normal",
          },
          {
            date: "2024-01-10",
            test: "Blood Pressure",
            value: "130/85",
            range: "< 120/80",
            status: "elevated",
          },
        ],
        createdAt: "2020-03-15",
      };

      setTimeout(() => {
        setPatient(mockPatient);
        setLoading(false);
      }, 500);
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Breadcrumb />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="space-y-6">
        <Breadcrumb />
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Patient Not Found
            </h3>
            <p className="text-gray-500 mb-4">
              The patient you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/dashboard/patients")}>
              Back to Patients
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            onClick={() => navigate("/dashboard/patients")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Profile
            </h1>
            <p className="text-gray-600">Complete medical information</p>
          </div>
        </div>{" "}
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => navigate(`/dashboard/patients/${id}/new-visit`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Visit
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Patient Header Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="/api/placeholder/96/96" />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-bold">
                {patient.generalInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {patient.generalInfo.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Age:</span>
                  <span className="font-semibold">
                    {patient.generalInfo.age}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">DOB:</span>
                  <span className="font-semibold">
                    {new Date(
                      patient.generalInfo.dateOfBirth
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold">
                    {patient.generalInfo.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold capitalize">
                    {patient.generalInfo.gender}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  {patient.generalInfo.address}
                </span>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                Patient ID: {patient._id}
              </Badge>
              <p className="text-sm text-gray-600">
                Patient since {new Date(patient.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          {/* Quick Alerts */}
          {patient.medicalInfo.allergies.length > 0 && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Allergies:</strong>{" "}
                {patient.medicalInfo.allergies.join(", ")}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Medical Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Blood Type
                  </h4>
                  <Badge variant="outline">
                    {patient.medicalInfo.bloodType}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Chronic Conditions
                  </h4>
                  <div className="space-y-1">
                    {patient.medicalInfo.chronicConditions.map(
                      (condition, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {condition}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Current Medications
                  </h4>
                  <div className="space-y-2">
                    {patient.medicalInfo.currentMedications.map(
                      (med, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <Pill className="h-3 w-3 text-blue-500" />
                          <span>{med}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span>Recent Vitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.visits.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-3">
                      Last visit:{" "}
                      {new Date(patient.visits[0].date).toLocaleDateString()}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">
                          Blood Pressure
                        </div>
                        <div className="font-semibold">
                          {patient.visits[0].vitals.bloodPressure}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">Heart Rate</div>
                        <div className="font-semibold">
                          {patient.visits[0].vitals.heartRate}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">Temperature</div>
                        <div className="font-semibold">
                          {patient.visits[0].vitals.temperature}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">Weight</div>
                        <div className="font-semibold">
                          {patient.visits[0].vitals.weight}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5 text-purple-500" />
                  <span>Recent Lab Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patient.labResults.slice(0, 3).map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium text-sm">{result.test}</div>
                        <div className="text-xs text-gray-600">
                          {result.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">
                          {result.value}
                        </div>
                        <Badge
                          variant={
                            result.status === "normal"
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Occupation:</span>
                    <span className="font-semibold">
                      {patient.personalInfo.occupation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Home className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Marital Status:</span>
                    <span className="font-semibold capitalize">
                      {patient.personalInfo.maritalStatus}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Baby className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Children:</span>
                    <span className="font-semibold">
                      {patient.personalInfo.children}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coffee className="h-5 w-5 text-green-500" />
                  <span>Lifestyle & Habits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Habits</h4>
                  <div className="space-y-1">
                    {patient.personalInfo.habits.map((habit, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="mr-2 mb-1"
                      >
                        {habit}
                      </Badge>
                    ))}
                  </div>
                </div>
                {patient.personalInfo.other && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Additional Notes
                    </h4>
                    <p className="text-sm text-gray-700">
                      {patient.personalInfo.other}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-500" />
                <span>Emergency Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-semibold">
                    {patient.medicalInfo.emergencyContact.name}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Relationship:</span>
                  <p className="font-semibold">
                    {patient.medicalInfo.emergencyContact.relationship}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-semibold">
                    {patient.medicalInfo.emergencyContact.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical History Tab */}
        <TabsContent value="medical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  <span>Medical Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Chronic Conditions
                  </h4>
                  <div className="space-y-2">
                    {patient.medicalInfo.chronicConditions.map(
                      (condition, index) => (
                        <div
                          key={index}
                          className="p-2 bg-orange-50 rounded border border-orange-200"
                        >
                          <span className="font-medium text-orange-800">
                            {condition}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Allergies
                  </h4>
                  <div className="space-y-2">
                    {patient.medicalInfo.allergies.map((allergy, index) => (
                      <div
                        key={index}
                        className="p-2 bg-red-50 rounded border border-red-200"
                      >
                        <span className="font-medium text-red-800">
                          {allergy}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-green-500" />
                  <span>Current Medications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patient.medicalInfo.currentMedications.map(
                    (medication, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-50 rounded border border-green-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-800">
                            {medication}
                          </span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visit History Tab */}
        <TabsContent value="visits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Visit History</span>
                </div>
                <Badge variant="secondary">
                  {patient.visits.length} visits
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.visits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {visit.type}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(visit.date).toLocaleDateString()} -{" "}
                          {visit.doctor}
                        </p>
                      </div>
                      <Badge variant="outline">{visit.diagnosis}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{visit.notes}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-600">BP</div>
                        <div className="font-semibold text-sm">
                          {visit.vitals.bloodPressure}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-600">HR</div>
                        <div className="font-semibold text-sm">
                          {visit.vitals.heartRate}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-600">Temp</div>
                        <div className="font-semibold text-sm">
                          {visit.vitals.temperature}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-600">Weight</div>
                        <div className="font-semibold text-sm">
                          {visit.vitals.weight}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Results Tab */}
        <TabsContent value="labs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5 text-purple-500" />
                  <span>Laboratory Results</span>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Order New Tests
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.labResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {result.test}
                        </h4>
                        <p className="text-sm text-gray-600">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{result.value}</div>
                        <div className="text-sm text-gray-600">
                          Range: {result.range}
                        </div>
                        <Badge
                          variant={
                            result.status === "normal"
                              ? "default"
                              : "destructive"
                          }
                          className="mt-1"
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>Documents & Files</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Documents Yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Upload medical documents, reports, and images
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

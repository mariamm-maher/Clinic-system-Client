import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Heart,
  AlertTriangle,
  User,
  Edit,
  Save,
  X,
  Pill,
  Activity,
  Stethoscope,
  Filter,
  Clock,
  ChevronRight,
  Eye,
  UserPlus,
  History,
  TestTube,
  Shield,
  Zap,
  Download,
  Upload,
} from "lucide-react";

export default function PatientsSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  // Sample patient data with enhanced status and priority
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, Anytown, AT 12345",
      bloodType: "O+",
      insurance: "Blue Cross Blue Shield",
      emergencyContact: "John Johnson - Husband - (555) 123-4568",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-15",
      conditions: ["Hypertension", "Diabetes Type 2"],
      allergies: ["Penicillin"],
      medications: ["Metformin 500mg", "Lisinopril 10mg"],
      status: "active",
      priority: "high",
      riskLevel: "moderate",
      totalVisits: 12,
      vitals: {
        bloodPressure: "130/85",
        heartRate: "72 bpm",
        temperature: "98.6°F",
        weight: "150 lbs",
      },
      labResults: [
        {
          test: "HbA1c",
          value: "7.2%",
          date: "2024-01-10",
          status: "elevated",
        },
        {
          test: "Cholesterol",
          value: "195 mg/dL",
          date: "2024-01-10",
          status: "normal",
        },
      ],
      notes:
        "Patient reports feeling well. Blood pressure slightly elevated, monitoring closely.",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 42,
      gender: "Male",
      phone: "+1 (555) 987-6543",
      email: "michael.chen@email.com",
      address: "456 Oak Ave, Anytown, AT 12345",
      bloodType: "A+",
      insurance: "Aetna",
      emergencyContact: "Linda Chen - Wife - (555) 987-6544",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-15",
      conditions: ["Diabetes Type 2"],
      allergies: ["Shellfish"],
      medications: ["Metformin 850mg", "Insulin"],
      status: "active",
      priority: "medium",
      riskLevel: "low",
      totalVisits: 18,
      vitals: {
        bloodPressure: "125/80",
        heartRate: "68 bpm",
        temperature: "98.4°F",
        weight: "180 lbs",
      },
      labResults: [
        { test: "HbA1c", value: "6.8%", date: "2024-01-12", status: "good" },
        {
          test: "Kidney Function",
          value: "Normal",
          date: "2024-01-12",
          status: "normal",
        },
      ],
      notes: "Diabetes well controlled. Continue current medication regimen.",
    },
    {
      id: 3,
      name: "Emma Davis",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emma.davis@email.com",
      address: "789 Pine St, Anytown, AT 12345",
      bloodType: "B+",
      insurance: "United Healthcare",
      emergencyContact: "Mark Davis - Father - (555) 456-7891",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-15",
      conditions: [],
      allergies: [],
      medications: [],
      status: "active",
      priority: "low",
      riskLevel: "low",
      totalVisits: 5,
      vitals: {
        bloodPressure: "110/70",
        heartRate: "75 bpm",
        temperature: "98.8°F",
        weight: "125 lbs",
      },
      labResults: [
        {
          test: "Complete Blood Count",
          value: "Normal",
          date: "2024-01-08",
          status: "normal",
        },
        {
          test: "Vitamin D",
          value: "32 ng/mL",
          date: "2024-01-08",
          status: "normal",
        },
      ],
      notes: "Annual checkup. All vitals normal. Healthy patient.",
    },
    {
      id: 4,
      name: "Robert Wilson",
      age: 56,
      gender: "Male",
      phone: "+1 (555) 321-0987",
      email: "robert.wilson@email.com",
      address: "321 Elm St, Anytown, AT 12345",
      bloodType: "AB-",
      insurance: "Medicare",
      emergencyContact: "Mary Wilson - Wife - (555) 321-0988",
      lastVisit: "2024-01-05",
      nextAppointment: "2024-01-18",
      conditions: ["Hypertension", "High Cholesterol"],
      allergies: ["Aspirin"],
      medications: ["Lisinopril 20mg", "Atorvastatin 40mg"],
      status: "needs-attention",
      priority: "urgent",
      riskLevel: "high",
      totalVisits: 25,
      vitals: {
        bloodPressure: "140/90",
        heartRate: "80 bpm",
        temperature: "98.5°F",
        weight: "200 lbs",
      },
      labResults: [
        {
          test: "Blood Pressure",
          value: "140/90",
          date: "2024-01-05",
          status: "elevated",
        },
        {
          test: "Cholesterol",
          value: "240 mg/dL",
          date: "2024-01-05",
          status: "high",
        },
      ],
      notes: "Blood pressure needs adjustment. Considering medication change.",
    },
    {
      id: 5,
      name: "Lisa Martinez",
      age: 39,
      gender: "Female",
      phone: "+1 (555) 654-3210",
      email: "lisa.martinez@email.com",
      address: "567 Cedar Ave, Anytown, AT 12345",
      bloodType: "O-",
      insurance: "Cigna",
      emergencyContact: "Carlos Martinez - Brother - (555) 654-3211",
      lastVisit: "2024-01-11",
      nextAppointment: "2024-01-16",
      conditions: ["Asthma"],
      allergies: ["Dust mites", "Pollen"],
      medications: ["Albuterol Inhaler", "Flonase"],
      status: "inactive",
      priority: "low",
      riskLevel: "low",
      totalVisits: 8,
      vitals: {
        bloodPressure: "118/75",
        heartRate: "70 bpm",
        temperature: "98.7°F",
        weight: "140 lbs",
      },
      labResults: [
        {
          test: "Pulmonary Function",
          value: "85%",
          date: "2024-01-11",
          status: "slightly_low",
        },
        {
          test: "Allergy Panel",
          value: "Positive",
          date: "2024-01-11",
          status: "positive",
        },
      ],
      notes:
        "Asthma well controlled with current medications. Seasonal allergy management.",
    },
  ];
  // Filter and sort patients based on search term and filters
  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || patient.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return a.age - b.age;
        case "priority": {
          const priorityOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case "lastVisit":
          return new Date(b.lastVisit) - new Date(a.lastVisit);
        default:
          return 0;
      }
    });

  // Helper functions for status styling
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "needs-attention":
        return "bg-red-100 text-red-800 border-red-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "text-red-600";
      case "moderate":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Set default selected patient
  const currentPatient = selectedPatient || patients[0];

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setNotes(patient.notes || "");
    setIsEditingNotes(false);
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    console.log("Saving notes:", notes);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {" "}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
          <p className="text-gray-600">
            Manage patient records and information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View All Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Complete Patient Information</DialogTitle>
              </DialogHeader>
              {currentPatient && (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="medical">Medical History</TabsTrigger>
                    <TabsTrigger value="lab">Lab Results</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Personal Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Full Name:</span>
                            <span>{currentPatient.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span>{currentPatient.age} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gender:</span>
                            <span>{currentPatient.gender}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Blood Type:</span>
                            <span>{currentPatient.bloodType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Risk Assessment</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Priority:</span>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${getPriorityColor(
                                  currentPatient.priority
                                )}`}
                              ></div>
                              <span className="capitalize">
                                {currentPatient.priority}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Risk Level:</span>
                            <span
                              className={`capitalize font-medium ${getRiskLevelColor(
                                currentPatient.riskLevel
                              )}`}
                            >
                              {currentPatient.riskLevel}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge
                              className={getStatusColor(currentPatient.status)}
                            >
                              {currentPatient.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="medical" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Current Conditions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentPatient.conditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Current Medications
                        </h4>
                        <div className="space-y-1">
                          {currentPatient.medications.map(
                            (medication, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <Pill className="w-3 h-3 text-blue-500" />
                                <span>{medication}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="lab" className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Recent Lab Results</h4>
                      <div className="space-y-2">
                        {currentPatient.labResults?.map((result, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <span className="font-medium">{result.test}</span>
                              <p className="text-sm text-gray-600">
                                {result.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold">
                                {result.value}
                              </span>
                              <div className="text-sm">
                                <Badge
                                  variant={
                                    result.status === "normal"
                                      ? "default"
                                      : result.status === "elevated" ||
                                        result.status === "high"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="documents" className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No documents uploaded yet</p>
                      <Button className="mt-4" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </DialogContent>
          </Dialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </div>
      </div>
      {/* Main Content - Three Column Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Patient List - Left Column */}
        <div className="col-span-4">
          <Card className="h-full flex flex-col">
            {" "}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-lg">Patient List</CardTitle>
                <Badge variant="secondary">{filteredPatients.length}</Badge>
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="needs-attention">
                      Needs Attention
                    </SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="lastVisit">Last Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full overflow-y-auto">
                <div className="space-y-1 p-4">
                  {" "}
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      onDoubleClick={() =>
                        navigate(`/dashboard/patients/${patient.id}`)
                      }
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                        currentPatient?.id === patient.id
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "hover:bg-gray-50 border-transparent hover:border-gray-200"
                      }`}
                      title="Double-click to view full profile"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-11 h-11">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {/* Priority indicator */}
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getPriorityColor(
                              patient.priority
                            )}`}
                            title={`Priority: ${patient.priority}`}
                          ></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {patient.name}
                            </p>
                            {patient.allergies.length > 0 && (
                              <AlertTriangle
                                className="w-4 h-4 text-red-500 flex-shrink-0"
                                title="Has allergies"
                              />
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <span>{patient.age}y</span>
                            <span>•</span>
                            <span>{patient.gender}</span>
                            <span>•</span>
                            <span
                              className={getRiskLevelColor(patient.riskLevel)}
                            >
                              {patient.riskLevel} risk
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <Badge
                              className={`text-xs ${getStatusColor(
                                patient.status
                              )} border`}
                            >
                              {patient.status.replace("-", " ")}
                            </Badge>

                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(
                                  patient.lastVisit
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Medical indicators */}
                          <div className="flex items-center space-x-1 mt-2">
                            {patient.conditions.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Activity className="w-3 h-3 text-orange-500" />
                                <span className="text-xs text-gray-600">
                                  {patient.conditions.length} condition(s)
                                </span>
                              </div>
                            )}
                            {patient.medications.length > 0 && (
                              <div className="flex items-center space-x-1 ml-2">
                                <Pill className="w-3 h-3 text-blue-500" />
                                <span className="text-xs text-gray-600">
                                  {patient.medications.length} medication(s)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Details - Middle Column */}
        <div className="col-span-5">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {currentPatient?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {currentPatient?.name}
                    </h3>
                    <p className="text-gray-600">
                      {currentPatient?.age} years old • {currentPatient?.gender}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{currentPatient?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{currentPatient?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{currentPatient?.address}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* Medical Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Medical Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        Blood Type:
                      </span>
                      <p>{currentPatient?.bloodType}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Insurance:
                      </span>
                      <p>{currentPatient?.insurance}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-600">
                        Emergency Contact:
                      </span>
                      <p>{currentPatient?.emergencyContact}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* Current Conditions */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Current Conditions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPatient?.conditions.length > 0 ? (
                      currentPatient.conditions.map((condition, index) => (
                        <Badge key={index} variant="secondary">
                          {condition}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No current conditions
                      </span>
                    )}
                  </div>
                </div>
                <Separator />
                {/* Allergies */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                    Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPatient?.allergies.length > 0 ? (
                      currentPatient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No known allergies
                      </span>
                    )}
                  </div>
                </div>
                <Separator />
                {/* Current Medications */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Pill className="w-4 h-4 mr-2" />
                    Current Medications
                  </h4>
                  <div className="space-y-2">
                    {currentPatient?.medications.length > 0 ? (
                      currentPatient.medications.map((medication, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{medication}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No current medications
                      </span>
                    )}
                  </div>
                </div>
                <Separator /> {/* Recent Vitals */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Recent Vitals
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(currentPatient?.lastVisit).toLocaleDateString()}
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-600">
                        Blood Pressure
                      </span>
                      <p className="text-lg font-semibold">
                        {currentPatient?.vitals.bloodPressure}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-600">
                        Heart Rate
                      </span>
                      <p className="text-lg font-semibold">
                        {currentPatient?.vitals.heartRate}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-600">
                        Temperature
                      </span>
                      <p className="text-lg font-semibold">
                        {currentPatient?.vitals.temperature}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-600">Weight</span>
                      <p className="text-lg font-semibold">
                        {currentPatient?.vitals.weight}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* Lab Results Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TestTube className="w-4 h-4 mr-2 text-purple-500" />
                    Recent Lab Results
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-blue-600 hover:text-blue-700"
                      onClick={() => setShowDetailDialog(true)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View All
                    </Button>
                  </h4>
                  <div className="space-y-2">
                    {currentPatient?.labResults
                      ?.slice(0, 2)
                      .map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <span className="text-sm font-medium">
                              {result.test}
                            </span>
                            <p className="text-xs text-gray-500">
                              {result.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold">
                              {result.value}
                            </span>
                            <div className="text-xs">
                              <Badge
                                variant={
                                  result.status === "normal" ||
                                  result.status === "good"
                                    ? "default"
                                    : result.status === "elevated" ||
                                      result.status === "high"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {result.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <Separator />
                {/* Visit History */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Visit History
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        Total Visits:
                      </span>
                      <span className="ml-2">
                        {currentPatient?.totalVisits}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Last Visit:
                      </span>
                      <span className="ml-2">
                        {new Date(
                          currentPatient?.lastVisit
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Next Appointment:
                      </span>
                      <span className="ml-2">
                        {new Date(
                          currentPatient?.nextAppointment
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes Section - Right Column */}
        <div className="col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </CardTitle>
                {isEditingNotes ? (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditingNotes(false);
                        setNotes(currentPatient?.notes || "");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingNotes(true)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this patient..."
                  className="flex-1 resize-none"
                />
              ) : (
                <div className="flex-1 p-3 bg-gray-50 rounded-lg overflow-auto">
                  {notes || currentPatient?.notes ? (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {notes || currentPatient?.notes}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No notes available. Click edit to add notes.
                    </p>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Patient
                </Button>{" "}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() =>
                    navigate(`/dashboard/patients/${currentPatient?.id}`)
                  }
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Medical History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

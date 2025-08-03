import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Breadcrumb from "../Breadcrumb";
import {
  ArrowLeft,
  Save,
  FileText,
  User,
  Clock,
  Heart,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  Calendar,
  MapPin,
  Activity,
  BookOpen,
  Plus,
  CheckCircle,
} from "lucide-react";

export default function NewVisit() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Visit form data
  const [visitData, setVisitData] = useState({
    type: "",
    date: new Date().toISOString().split("T")[0],
    pastHistory: {
      medicalHistory: "",
      medications: "",
      surgicalHistory: "",
      hospitalizations: "",
      allergies: "",
    },
    mainComplaint: {
      description: "",
      onset: "",
      duration: "",
      location: "",
      character: "",
      course: "",
      severity: "",
      radiation: "",
      associatedSymptoms: "",
      aggravatingFactors: "",
      relievingFactors: "",
      previousEpisodes: "",
      impactOnLife: "",
      patientThoughts: "",
      otherNotes: "",
    },
  });

  // Mock patient data - in real app would fetch from API
  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      // Mock patient data
      const mockPatient = {
        _id: patientId,
        generalInfo: {
          name: "Sarah Johnson",
          age: 34,
          dateOfBirth: "1989-05-15",
          gender: "female",
          phone: "+1 (555) 123-4567",
        },
        medicalInfo: {
          bloodType: "O+",
          allergies: ["Penicillin", "Shellfish"],
          currentMedications: ["Lisinopril 10mg", "Metformin 500mg"],
          chronicConditions: ["Hypertension", "Type 2 Diabetes"],
        },
      };

      setTimeout(() => {
        setPatient(mockPatient);
        // Pre-fill past history with existing patient data
        setVisitData((prev) => ({
          ...prev,
          pastHistory: {
            ...prev.pastHistory,
            allergies: mockPatient.medicalInfo.allergies.join(", "),
            medications: mockPatient.medicalInfo.currentMedications.join(", "),
          },
        }));
        setLoading(false);
      }, 500);
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const handleInputChange = (section, field, value) => {
    if (section === "main") {
      setVisitData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setVisitData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In real app, would make API call to save visit
      console.log("Saving visit data:", visitData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to patient profile with success message
      navigate(`/dashboard/patients/${patientId}`, {
        state: { message: "Visit recorded successfully" },
      });
    } catch (error) {
      console.error("Error saving visit:", error);
    } finally {
      setSaving(false);
    }
  };

  const validateForm = () => {
    return visitData.type && visitData.mainComplaint.description;
  };

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
              Unable to load patient information.
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
            onClick={() => navigate(`/dashboard/patients/${patientId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Visit</h1>
            <p className="text-gray-600">Record patient visit information</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/dashboard/patients/${patientId}`)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!validateForm() || saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Visit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Patient Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-lg font-bold">
                {patient.generalInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {patient.generalInfo.name}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{patient.generalInfo.age} years old</span>
                <span>•</span>
                <span>{patient.generalInfo.phone}</span>
                <span>•</span>
                <span className="capitalize">{patient.generalInfo.gender}</span>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Patient ID: {patient._id}</Badge>
            </div>
          </div>

          {/* Alerts for allergies */}
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

      {/* Visit Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Visit Information</CardTitle>
                <p className="text-sm text-gray-600">
                  Complete the visit details below
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Visit Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="visitType">Visit Type *</Label>
                <Select
                  value={visitData.type}
                  onValueChange={(value) =>
                    handleInputChange("main", "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={visitData.date}
                  onChange={(e) =>
                    handleInputChange("main", "date", e.target.value)
                  }
                />
              </div>
              <div className="flex items-end">
                <Badge
                  variant="outline"
                  className="h-10 px-3 flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Tabbed Content */}
            <Tabs defaultValue="complaint" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="complaint">Chief Complaint</TabsTrigger>
                <TabsTrigger value="history">Past History</TabsTrigger>
                <TabsTrigger value="examination">Examination</TabsTrigger>
                <TabsTrigger value="plan">Plan</TabsTrigger>
              </TabsList>

              {/* Chief Complaint Tab */}
              <TabsContent value="complaint" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ClipboardList className="h-5 w-5 text-red-500" />
                      <span>Chief Complaint & History of Present Illness</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="description">
                        Main Complaint Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the main reason for the visit..."
                        value={visitData.mainComplaint.description}
                        onChange={(e) =>
                          handleInputChange(
                            "mainComplaint",
                            "description",
                            e.target.value
                          )
                        }
                        className="min-h-20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="onset">Onset</Label>
                        <Input
                          id="onset"
                          placeholder="When did it start?"
                          value={visitData.mainComplaint.onset}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "onset",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          placeholder="How long?"
                          value={visitData.mainComplaint.duration}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "duration",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Where exactly?"
                          value={visitData.mainComplaint.location}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="character">Character</Label>
                        <Input
                          id="character"
                          placeholder="Sharp, dull, throbbing..."
                          value={visitData.mainComplaint.character}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "character",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="severity">Severity (1-10)</Label>
                        <Select
                          value={visitData.mainComplaint.severity}
                          onValueChange={(value) =>
                            handleInputChange(
                              "mainComplaint",
                              "severity",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate severity" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} -{" "}
                                {num <= 3
                                  ? "Mild"
                                  : num <= 6
                                  ? "Moderate"
                                  : "Severe"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="course">Course</Label>
                        <Select
                          value={visitData.mainComplaint.course}
                          onValueChange={(value) =>
                            handleInputChange("mainComplaint", "course", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pattern" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="continuous">
                              Continuous
                            </SelectItem>
                            <SelectItem value="intermittent">
                              Intermittent
                            </SelectItem>
                            <SelectItem value="progressive">
                              Progressive
                            </SelectItem>
                            <SelectItem value="improving">Improving</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="radiation">Radiation</Label>
                        <Input
                          id="radiation"
                          placeholder="Does it spread anywhere?"
                          value={visitData.mainComplaint.radiation}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "radiation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="associatedSymptoms">
                          Associated Symptoms
                        </Label>
                        <Input
                          id="associatedSymptoms"
                          placeholder="Nausea, fever, etc."
                          value={visitData.mainComplaint.associatedSymptoms}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "associatedSymptoms",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="aggravatingFactors">
                          Aggravating Factors
                        </Label>
                        <Input
                          id="aggravatingFactors"
                          placeholder="What makes it worse?"
                          value={visitData.mainComplaint.aggravatingFactors}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "aggravatingFactors",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="relievingFactors">
                          Relieving Factors
                        </Label>
                        <Input
                          id="relievingFactors"
                          placeholder="What makes it better?"
                          value={visitData.mainComplaint.relievingFactors}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "relievingFactors",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="previousEpisodes">
                          Previous Episodes
                        </Label>
                        <Textarea
                          id="previousEpisodes"
                          placeholder="Has this happened before?"
                          value={visitData.mainComplaint.previousEpisodes}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "previousEpisodes",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="impactOnLife">
                          Impact on Daily Life
                        </Label>
                        <Textarea
                          id="impactOnLife"
                          placeholder="How does it affect sleep, appetite, work, etc.?"
                          value={visitData.mainComplaint.impactOnLife}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "impactOnLife",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientThoughts">
                          Patient's Thoughts
                        </Label>
                        <Textarea
                          id="patientThoughts"
                          placeholder="What does the patient think is causing this?"
                          value={visitData.mainComplaint.patientThoughts}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "patientThoughts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherNotes">Additional Notes</Label>
                        <Textarea
                          id="otherNotes"
                          placeholder="Any other relevant details..."
                          value={visitData.mainComplaint.otherNotes}
                          onChange={(e) =>
                            handleInputChange(
                              "mainComplaint",
                              "otherNotes",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Past History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span>Past Medical History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        placeholder="Previous diagnoses, chronic conditions..."
                        value={visitData.pastHistory.medicalHistory}
                        onChange={(e) =>
                          handleInputChange(
                            "pastHistory",
                            "medicalHistory",
                            e.target.value
                          )
                        }
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentMedications">
                        Current Medications
                      </Label>
                      <Textarea
                        id="currentMedications"
                        placeholder="List all current medications with dosages..."
                        value={visitData.pastHistory.medications}
                        onChange={(e) =>
                          handleInputChange(
                            "pastHistory",
                            "medications",
                            e.target.value
                          )
                        }
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surgicalHistory">Surgical History</Label>
                      <Textarea
                        id="surgicalHistory"
                        placeholder="Previous surgeries and procedures..."
                        value={visitData.pastHistory.surgicalHistory}
                        onChange={(e) =>
                          handleInputChange(
                            "pastHistory",
                            "surgicalHistory",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalizations">Hospitalizations</Label>
                      <Textarea
                        id="hospitalizations"
                        placeholder="Previous hospital admissions..."
                        value={visitData.pastHistory.hospitalizations}
                        onChange={(e) =>
                          handleInputChange(
                            "pastHistory",
                            "hospitalizations",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="Drug allergies, food allergies, environmental allergies..."
                        value={visitData.pastHistory.allergies}
                        onChange={(e) =>
                          handleInputChange(
                            "pastHistory",
                            "allergies",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Examination Tab */}
              <TabsContent value="examination" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5 text-green-500" />
                      <span>Physical Examination</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <Stethoscope className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Physical Examination
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Examination details will be recorded separately
                      </p>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Examination
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Plan Tab */}
              <TabsContent value="plan" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-purple-500" />
                      <span>Assessment & Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Investigations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm mb-4">
                              Lab tests and imaging to be recorded separately
                            </p>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Investigation
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Prescription
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8 text-gray-500">
                            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm mb-4">
                              Medications and treatment plan to be recorded
                              separately
                            </p>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Prescription
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  Ready to save visit?
                </p>
                <p className="text-sm text-green-600">
                  Make sure all required fields are completed
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/dashboard/patients/${patientId}`)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!validateForm() || saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Visit...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Visit
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, GraduationCap, Plus, X } from "lucide-react";
import { useStaffFormStore } from "./staffFormStore";

const departments = [
  "Cardiology",
  "Nursing",
  "Emergency",
  "Administration",
  "Radiology",
  "Pediatrics",
  "Surgery",
  "Internal Medicine",
  "Laboratory",
  "Pharmacy",
  "Dermatology",
  "Orthopedics",
  "Psychiatry",
  "Obstetrics & Gynecology",
];

const positions = [
  "Doctor",
  "Head Nurse",
  "Nurse",
  "Medical Assistant",
  "Radiologist",
  "Lab Technician",
  "Pharmacist",
  "Receptionist",
  "Administrator",
  "Emergency Physician",
  "Surgeon",
  "Pediatrician",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "Gynecologist",
];

export default function ProfessionalInfoStep() {
  const {
    formData,
    updateFormData,
    getFieldError,
    addQualification,
    removeQualification,
    updateTempQualification,
  } = useStaffFormStore();

  const handleInputChange = (field, value) => {
    updateFormData("professionalInfo", { [field]: value });
  };

  // Qualification logic
  const tempQualification = formData.professionalInfo.tempQualification || {
    degree: "",
    institution: "",
    year: "",
    certificatePhoto: null,
  };

  const handleAddQualification = () => {
    if (tempQualification.degree && tempQualification.institution) {
      addQualification(tempQualification);
    }
  };

  return (
    <div className="space-y-6">
      {/* Professional Details */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Professional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.professionalInfo.department}
                onValueChange={(value) =>
                  handleInputChange("department", value)
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    getFieldError("professionalInfo.department")
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("professionalInfo.department") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("professionalInfo.department")}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Select
                value={formData.professionalInfo.position}
                onValueChange={(value) => handleInputChange("position", value)}
              >
                <SelectTrigger
                  className={`mt-1 ${
                    getFieldError("professionalInfo.position")
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("professionalInfo.position") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("professionalInfo.position")}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="experienceYears">Years of Experience *</Label>
              <Input
                id="experienceYears"
                type="number"
                value={formData.professionalInfo.experience.years}
                onChange={(e) =>
                  updateFormData(
                    "professionalInfo.experience.years",
                    e.target.value
                  )
                }
                placeholder="3"
                className={`mt-1 ${
                  getFieldError("professionalInfo.experience.years")
                    ? "border-red-500"
                    : ""
                }`}
              />
              {getFieldError("professionalInfo.experience.years") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("professionalInfo.experience.years")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Qualification Form */}
          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Degree"
                value={tempQualification.degree}
                onChange={(e) =>
                  updateTempQualification({ degree: e.target.value })
                }
              />
              <Input
                placeholder="Institution"
                value={tempQualification.institution}
                onChange={(e) =>
                  updateTempQualification({ institution: e.target.value })
                }
              />
              <Input
                placeholder="Year"
                type="number"
                value={tempQualification.year}
                onChange={(e) =>
                  updateTempQualification({ year: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="certificate">Certificate Photo</Label>
              <Input
                id="certificate"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  updateTempQualification({
                    certificatePhoto: e.target.files[0],
                  })
                }
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddQualification}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Qualification
            </Button>
          </div>

          {/* Display Qualifications */}
          <div className="space-y-2">
            {(formData.professionalInfo.qualifications || []).map(
              (qualification, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-green-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{qualification.degree}</p>
                    <p className="text-sm text-slate-600">
                      {qualification.institution} • {qualification.year}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQualification(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

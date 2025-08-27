import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Shield } from "lucide-react";
import { useStaffFormStore } from "./staffFormStore";

const genders = ["male", "female"];
const relationships = [
  "Parent",
  "Spouse",
  "Sibling",
  "Child",
  "Friend",
  "Colleague",
  "Other",
];

export default function PersonalInfoStep() {
  const {
    formData,
    updateNestedFormData,
    getFieldError,
    handleDocumentUpload,
  } = useStaffFormStore();

  // Use updateNestedFormData for all nested fields
  const handleInputChange = (path, value) => {
    updateNestedFormData(`personalInfo.${path}`, value);
  };

  // For file uploads (ID photos)
  const handleFileChange = (path, file) => {
    handleDocumentUpload(path, file);
  };

  // Destructure for cleaner JSX
  const { personalInfo } = formData;
  const { address, emergencyContact } = personalInfo;
  const { identification } = formData;

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+201112223344"
                className={`mt-1 ${
                  getFieldError("personalInfo.phone") ? "border-red-500" : ""
                }`}
              />
              {getFieldError("personalInfo.phone") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("personalInfo.phone")}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={personalInfo.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="28"
                className={`mt-1 ${
                  getFieldError("personalInfo.age") ? "border-red-500" : ""
                }`}
              />
              {getFieldError("personalInfo.age") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("personalInfo.age")}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={personalInfo.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger
                  className={`mt-1 ${
                    getFieldError("personalInfo.gender") ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("personalInfo.gender") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("personalInfo.gender")}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-700">Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={address.street}
                  onChange={(e) =>
                    handleInputChange("address.street", e.target.value)
                  }
                  placeholder="10 Nile St"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) =>
                    handleInputChange("address.city", e.target.value)
                  }
                  placeholder="Cairo"
                  className="mt-1"
                />
              </div>
           
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-700 flex items-center gap-2">
              <Phone className="w-5 h-4" />
              Emergency Contact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyName">Name</Label>
                <Input
                  id="emergencyName"
                  value={emergencyContact.name}
                  onChange={(e) =>
                    handleInputChange("emergencyContact.name", e.target.value)
                  }
                  placeholder="Mona Hassan"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={emergencyContact.phone}
                  onChange={(e) =>
                    handleInputChange("emergencyContact.phone", e.target.value)
                  }
                  placeholder="+201005556677"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={emergencyContact.relationship}
                  onValueChange={(value) =>
                    handleInputChange("emergencyContact.relationship", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((relation) => (
                      <SelectItem key={relation} value={relation.toLowerCase()}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identification */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-blue-600" />
            Identification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nationalID">National ID *</Label>
            <Input
              id="nationalID"
              value={identification.nationalID}
              onChange={(e) =>
                updateNestedFormData("identification.nationalID", e.target.value)
              }
              placeholder="29801011234567"
              className={`mt-1 ${
                  getFieldError("identification.nationalID") ? "border-red-500" : ""
                }`}
            />
             {getFieldError("identification.nationalID") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("identification.nationalID")}
                </p>
              )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nidFront">National ID (Front)</Label>
              <Input
                id="nidFront"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleFileChange(
                    "identification.nationalIDPhoto.front",
                    file
                  );
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="nidBack">National ID (Back)</Label>
              <Input
                id="nidBack"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleFileChange("identification.nationalIDPhoto.back", file);
                }}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

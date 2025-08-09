import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function BasicInfoStep() {
  const { formData, updateFormData } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("basicInfo", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            Basic Visit Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Patient Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientId" className="text-sm font-medium text-slate-700">
                Patient
              </Label>
              <Select 
                value={formData.basicInfo.patientId} 
                onValueChange={(value) => handleInputChange("patientId", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select from existing patients list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient1">John Doe - ID: 001</SelectItem>
                  <SelectItem value="patient2">Jane Smith - ID: 002</SelectItem>
                  <SelectItem value="patient3">Mike Johnson - ID: 003</SelectItem>
                  <SelectItem value="patient4">Sarah Wilson - ID: 004</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitType" className="text-sm font-medium text-slate-700">
                Visit Type
              </Label>
              <Select 
                value={formData.basicInfo.visitType} 
                onValueChange={(value) => handleInputChange("visitType", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visit Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.basicInfo.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="h-11 max-w-xs"
            />
            <p className="text-xs text-slate-500">Default: Today</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

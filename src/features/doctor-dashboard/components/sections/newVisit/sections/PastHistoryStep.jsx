import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { History, Heart, Scissors, Building, AlertTriangle, Pill } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function PastHistoryStep() {
  const { formData, updateFormData } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("pastHistory", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-green-100 rounded-lg">
              <History className="w-5 h-5 text-green-600" />
            </div>
            Past History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Medical History */}
          <div className="space-y-2">
            <Label htmlFor="medicalHistory" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Medical History
            </Label>
            <Textarea
              id="medicalHistory"
              placeholder="Previous medical conditions, chronic diseases, past illnesses..."
              value={formData.pastHistory.medicalHistory}
              onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Medications */}
          <div className="space-y-2">
            <Label htmlFor="medications" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Medications
            </Label>
            <Textarea
              id="medications"
              placeholder="Current medications, dosages, frequency..."
              value={formData.pastHistory.medications}
              onChange={(e) => handleInputChange("medications", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Surgical History */}
          <div className="space-y-2">
            <Label htmlFor="surgicalHistory" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Surgical History
            </Label>
            <Textarea
              id="surgicalHistory"
              placeholder="Previous surgeries, procedures, dates..."
              value={formData.pastHistory.surgicalHistory}
              onChange={(e) => handleInputChange("surgicalHistory", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Hospitalizations */}
          <div className="space-y-2">
            <Label htmlFor="hospitalizations" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Hospitalizations
            </Label>
            <Textarea
              id="hospitalizations"
              placeholder="Previous hospitalizations, reasons, dates..."
              value={formData.pastHistory.hospitalizations}
              onChange={(e) => handleInputChange("hospitalizations", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Allergies */}
          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Allergies
            </Label>
            <Textarea
              id="allergies"
              placeholder="Drug allergies, food allergies, environmental allergies, reactions..."
              value={formData.pastHistory.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

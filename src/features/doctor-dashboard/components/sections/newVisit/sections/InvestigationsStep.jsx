import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Camera, Zap, FileText, TestTube, Activity } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function InvestigationsStep() {
  const { formData, updateFormData } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("investigations", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-teal-100 rounded-lg">
              <FlaskConical className="w-5 h-5 text-teal-600" />
            </div>
            Investigations & Diagnostic Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Laboratory Tests */}
          <div className="space-y-2">
            <Label htmlFor="laboratoryTests" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Laboratory Tests
            </Label>
            <Textarea
              id="laboratoryTests"
              placeholder="Blood tests, urine analysis, cultures, biochemistry panels, CBC, LFT, RFT..."
              value={formData.investigations.laboratoryTests}
              onChange={(e) => handleInputChange("laboratoryTests", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Imaging Studies */}
          <div className="space-y-2">
            <Label htmlFor="imagingStudies" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Imaging Studies
            </Label>
            <Textarea
              id="imagingStudies"
              placeholder="X-rays, CT scans, MRI, ultrasound, mammography, bone scans..."
              value={formData.investigations.imagingStudies}
              onChange={(e) => handleInputChange("imagingStudies", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Cardiac Tests */}
          <div className="space-y-2">
            <Label htmlFor="cardiacTests" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Cardiac Tests
            </Label>
            <Textarea
              id="cardiacTests"
              placeholder="ECG, echocardiogram, stress tests, Holter monitoring, cardiac catheterization..."
              value={formData.investigations.cardiacTests}
              onChange={(e) => handleInputChange("cardiacTests", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Pulmonary Function Tests */}
          <div className="space-y-2">
            <Label htmlFor="pulmonaryTests" className="text-sm font-medium text-slate-700">
              Pulmonary Function Tests
            </Label>
            <Textarea
              id="pulmonaryTests"
              placeholder="Spirometry, peak flow, arterial blood gas, chest function tests..."
              value={formData.investigations.pulmonaryTests}
              onChange={(e) => handleInputChange("pulmonaryTests", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Neurological Tests */}
          <div className="space-y-2">
            <Label htmlFor="neurologicalTests" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Neurological Tests
            </Label>
            <Textarea
              id="neurologicalTests"
              placeholder="EEG, EMG, nerve conduction studies, lumbar puncture, neuropsychological tests..."
              value={formData.investigations.neurologicalTests}
              onChange={(e) => handleInputChange("neurologicalTests", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Endoscopic Procedures */}
          <div className="space-y-2">
            <Label htmlFor="endoscopicProcedures" className="text-sm font-medium text-slate-700">
              Endoscopic Procedures
            </Label>
            <Textarea
              id="endoscopicProcedures"
              placeholder="Upper endoscopy, colonoscopy, bronchoscopy, arthroscopy, cystoscopy..."
              value={formData.investigations.endoscopicProcedures}
              onChange={(e) => handleInputChange("endoscopicProcedures", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Biopsy and Pathology */}
          <div className="space-y-2">
            <Label htmlFor="biopsyPathology" className="text-sm font-medium text-slate-700">
              Biopsy & Pathology
            </Label>
            <Textarea
              id="biopsyPathology"
              placeholder="Tissue biopsy, fine needle aspiration, cytology, histopathology..."
              value={formData.investigations.biopsyPathology}
              onChange={(e) => handleInputChange("biopsyPathology", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Other Tests */}
          <div className="space-y-2">
            <Label htmlFor="otherTests" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Other Tests & Procedures
            </Label>
            <Textarea
              id="otherTests"
              placeholder="Any other diagnostic tests, procedures, or investigations not listed above..."
              value={formData.investigations.otherTests}
              onChange={(e) => handleInputChange("otherTests", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, Eye, Ear, Brain, Heart,  Zap, Bone } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function ExaminationStep() {
  const { formData, updateFormData } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("examination", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Stethoscope className="w-5 h-5 text-purple-600" />
            </div>
            Physical Examination
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* General Appearance */}
          <div className="space-y-2">
            <Label htmlFor="generalAppearance" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              General Appearance
            </Label>
            <Textarea
              id="generalAppearance"
              placeholder="Overall appearance, posture, gait, hygiene, distress level..."
              value={formData.examination.generalAppearance}
              onChange={(e) => handleInputChange("generalAppearance", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* HEENT (Head, Eyes, Ears, Nose, Throat) */}
          <div className="space-y-2">
            <Label htmlFor="heent" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              HEENT (Head, Eyes, Ears, Nose, Throat)
            </Label>
            <Textarea
              id="heent"
              placeholder="Head examination, eye movements, pupil response, ear examination, throat inspection..."
              value={formData.examination.heent}
              onChange={(e) => handleInputChange("heent", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Cardiovascular */}
          <div className="space-y-2">
            <Label htmlFor="cardiovascular" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Cardiovascular System
            </Label>
            <Textarea
              id="cardiovascular"
              placeholder="Heart sounds, murmurs, rhythm, peripheral pulses, edema..."
              value={formData.examination.cardiovascular}
              onChange={(e) => handleInputChange("cardiovascular", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Respiratory */}
          <div className="space-y-2">
            <Label htmlFor="respiratory" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              {/* <Lungs className="w-4 h-4" /> */}
              Respiratory System
            </Label>
            <Textarea
              id="respiratory"
              placeholder="Breath sounds, chest expansion, percussion, adventitious sounds..."
              value={formData.examination.respiratory}
              onChange={(e) => handleInputChange("respiratory", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Abdominal */}
          <div className="space-y-2">
            <Label htmlFor="abdominal" className="text-sm font-medium text-slate-700">
              Abdominal System
            </Label>
            <Textarea
              id="abdominal"
              placeholder="Inspection, palpation, percussion, bowel sounds, organomegaly, tenderness..."
              value={formData.examination.abdominal}
              onChange={(e) => handleInputChange("abdominal", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Neurological */}
          <div className="space-y-2">
            <Label htmlFor="neurological" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Neurological System
            </Label>
            <Textarea
              id="neurological"
              placeholder="Mental status, cranial nerves, motor function, sensory function, reflexes, coordination..."
              value={formData.examination.neurological}
              onChange={(e) => handleInputChange("neurological", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Musculoskeletal */}
          <div className="space-y-2">
            <Label htmlFor="musculoskeletal" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Bone className="w-4 h-4" />
              Musculoskeletal System
            </Label>
            <Textarea
              id="musculoskeletal"
              placeholder="Joint examination, range of motion, muscle strength, deformities, swelling..."
              value={formData.examination.musculoskeletal}
              onChange={(e) => handleInputChange("musculoskeletal", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Skin */}
          <div className="space-y-2">
            <Label htmlFor="skin" className="text-sm font-medium text-slate-700">
              Skin & Integumentary
            </Label>
            <Textarea
              id="skin"
              placeholder="Skin color, texture, lesions, rashes, wounds, temperature..."
              value={formData.examination.skin}
              onChange={(e) => handleInputChange("skin", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Other Findings */}
          <div className="space-y-2">
            <Label htmlFor="otherFindings" className="text-sm font-medium text-slate-700">
              Other Findings
            </Label>
            <Textarea
              id="otherFindings"
              placeholder="Any additional examination findings not covered above..."
              value={formData.examination.otherFindings}
              onChange={(e) => handleInputChange("otherFindings", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

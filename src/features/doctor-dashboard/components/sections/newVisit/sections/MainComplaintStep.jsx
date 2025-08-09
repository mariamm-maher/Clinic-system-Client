import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function MainComplaintStep() {
  const { formData, updateFormData } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("mainComplaint", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-orange-600" />
            </div>
            Main Complaint
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Main reason for visit - describe the primary complaint..."
              value={formData.mainComplaint.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Grid for multiple fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="onset" className="text-sm font-medium text-slate-700">
                Onset
              </Label>
              <Input
                id="onset"
                placeholder="When did it start?"
                value={formData.mainComplaint.onset}
                onChange={(e) => handleInputChange("onset", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-slate-700">
                Duration
              </Label>
              <Input
                id="duration"
                placeholder="How long has it lasted?"
                value={formData.mainComplaint.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Where is the problem?"
                value={formData.mainComplaint.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="character" className="text-sm font-medium text-slate-700">
                Character
              </Label>
              <Input
                id="character"
                placeholder="What does it feel like?"
                value={formData.mainComplaint.character}
                onChange={(e) => handleInputChange("character", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course" className="text-sm font-medium text-slate-700">
                Course
              </Label>
              <Input
                id="course"
                placeholder="How has it progressed?"
                value={formData.mainComplaint.course}
                onChange={(e) => handleInputChange("course", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity" className="text-sm font-medium text-slate-700">
                Severity
              </Label>
              <Input
                id="severity"
                placeholder="Mild/Moderate/Severe or 0-10 scale"
                value={formData.mainComplaint.severity}
                onChange={(e) => handleInputChange("severity", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="radiation" className="text-sm font-medium text-slate-700">
                Radiation
              </Label>
              <Input
                id="radiation"
                placeholder="Does it spread anywhere?"
                value={formData.mainComplaint.radiation}
                onChange={(e) => handleInputChange("radiation", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="associatedSymptoms" className="text-sm font-medium text-slate-700">
                Associated Symptoms
              </Label>
              <Input
                id="associatedSymptoms"
                placeholder="Other symptoms"
                value={formData.mainComplaint.associatedSymptoms}
                onChange={(e) => handleInputChange("associatedSymptoms", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aggravatingFactors" className="text-sm font-medium text-slate-700">
                Aggravating Factors
              </Label>
              <Input
                id="aggravatingFactors"
                placeholder="What makes it worse?"
                value={formData.mainComplaint.aggravatingFactors}
                onChange={(e) => handleInputChange("aggravatingFactors", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relievingFactors" className="text-sm font-medium text-slate-700">
                Relieving Factors
              </Label>
              <Input
                id="relievingFactors"
                placeholder="What makes it better?"
                value={formData.mainComplaint.relievingFactors}
                onChange={(e) => handleInputChange("relievingFactors", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousEpisodes" className="text-sm font-medium text-slate-700">
                Previous Episodes
              </Label>
              <Input
                id="previousEpisodes"
                placeholder="Has this happened before?"
                value={formData.mainComplaint.previousEpisodes}
                onChange={(e) => handleInputChange("previousEpisodes", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impactOnLife" className="text-sm font-medium text-slate-700">
                Impact On Life
              </Label>
              <Input
                id="impactOnLife"
                placeholder="How does it affect daily activities?"
                value={formData.mainComplaint.impactOnLife}
                onChange={(e) => handleInputChange("impactOnLife", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientThoughts" className="text-sm font-medium text-slate-700">
                Patient Thoughts
              </Label>
              <Input
                id="patientThoughts"
                placeholder="What does the patient think is wrong?"
                value={formData.mainComplaint.patientThoughts}
                onChange={(e) => handleInputChange("patientThoughts", e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          {/* Other Notes */}
          <div className="space-y-2">
            <Label htmlFor="otherNotes" className="text-sm font-medium text-slate-700">
              Other Notes
            </Label>
            <Textarea
              id="otherNotes"
              placeholder="Any additional notes about the main complaint..."
              value={formData.mainComplaint.otherNotes}
              onChange={(e) => handleInputChange("otherNotes", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

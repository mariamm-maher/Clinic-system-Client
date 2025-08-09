import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Plus, Trash2, FileText, AlertTriangle } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function PrescriptionStep() {
  const { formData, updateFormData, addMedication, removeMedication, updateMedication } = useNewVisitStore();

  const handleInputChange = (field, value) => {
    updateFormData("prescription", { [field]: value });
  };

  const handleMedicationChange = (index, field, value) => {
    updateMedication(index, { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Medications Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Pill className="w-5 h-5 text-indigo-600" />
            </div>
            Medications & Prescription
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Medications List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700">Prescribed Medications</Label>
              <Button
                type="button"
                onClick={addMedication}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>

            {formData.prescription.medications.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Pill className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No medications prescribed yet</p>
                <p className="text-sm">Click "Add Medication" to start prescribing</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.prescription.medications.map((medication, index) => (
                  <Card key={index} className="border border-slate-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Medication Name */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">
                            Medication Name *
                          </Label>
                          <Input
                            placeholder="e.g., Amoxicillin"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                            className="h-10"
                          />
                        </div>

                        {/* Dosage */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">
                            Dosage *
                          </Label>
                          <Input
                            placeholder="e.g., 500mg"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                            className="h-10"
                          />
                        </div>

                        {/* Frequency */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">
                            Frequency *
                          </Label>
                          <Select
                            value={medication.frequency}
                            onValueChange={(value) => handleMedicationChange(index, "frequency", value)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once-daily">Once daily</SelectItem>
                              <SelectItem value="twice-daily">Twice daily</SelectItem>
                              <SelectItem value="three-times-daily">Three times daily</SelectItem>
                              <SelectItem value="four-times-daily">Four times daily</SelectItem>
                              <SelectItem value="as-needed">As needed</SelectItem>
                              <SelectItem value="every-4-hours">Every 4 hours</SelectItem>
                              <SelectItem value="every-6-hours">Every 6 hours</SelectItem>
                              <SelectItem value="every-8-hours">Every 8 hours</SelectItem>
                              <SelectItem value="every-12-hours">Every 12 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">
                            Duration *
                          </Label>
                          <Input
                            placeholder="e.g., 7 days"
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                            className="h-10"
                          />
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 space-y-2">
                        <Label className="text-sm font-medium text-slate-700">
                          Instructions
                        </Label>
                        <Textarea
                          placeholder="Special instructions for taking this medication..."
                          value={medication.instructions}
                          onChange={(e) => handleMedicationChange(index, "instructions", e.target.value)}
                          className="min-h-[60px] resize-none"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="mt-4 flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeMedication(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Instructions Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            Additional Instructions & Follow-up
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* General Instructions */}
          <div className="space-y-2">
            <Label htmlFor="generalInstructions" className="text-sm font-medium text-slate-700">
              General Instructions
            </Label>
            <Textarea
              id="generalInstructions"
              placeholder="General care instructions, lifestyle recommendations, dietary advice..."
              value={formData.prescription.generalInstructions}
              onChange={(e) => handleInputChange("generalInstructions", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Follow-up Instructions */}
          <div className="space-y-2">
            <Label htmlFor="followUpInstructions" className="text-sm font-medium text-slate-700">
              Follow-up Instructions
            </Label>
            <Textarea
              id="followUpInstructions"
              placeholder="When to return, what to monitor, emergency signs to watch for..."
              value={formData.prescription.followUpInstructions}
              onChange={(e) => handleInputChange("followUpInstructions", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Warning Signs */}
          <div className="space-y-2">
            <Label htmlFor="warningSigns" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Warning Signs
            </Label>
            <Textarea
              id="warningSigns"
              placeholder="Symptoms that require immediate medical attention..."
              value={formData.prescription.warningSigns}
              onChange={(e) => handleInputChange("warningSigns", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Next Appointment */}
          <div className="space-y-2">
            <Label htmlFor="nextAppointment" className="text-sm font-medium text-slate-700">
              Next Appointment
            </Label>
            <Input
              id="nextAppointment"
              type="date"
              value={formData.prescription.nextAppointment}
              onChange={(e) => handleInputChange("nextAppointment", e.target.value)}
              className="h-11"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

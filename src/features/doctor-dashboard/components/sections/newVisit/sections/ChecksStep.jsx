import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity } from "lucide-react";
import { useNewVisitStore } from "../store/newVisitStore";

export default function ChecksStep() {
  const { formData, updateNestedFormData } = useNewVisitStore();

  const handleCheckboxChange = (section, field, checked) => {
    updateNestedFormData(`checks.${section}.${field}`, checked);
  };

  const handleNotesChange = (value) => {
    updateNestedFormData("checks.otherNotes", value);
  };

  const CheckboxGroup = ({ title, section, items }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
              <Checkbox
                id={`${section}-${item.key}`}
                checked={formData.checks[section][item.key] || false}
                onCheckedChange={(checked) => handleCheckboxChange(section, item.key, checked)}
              />
              <Label
                htmlFor={`${section}-${item.key}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-red-100 rounded-lg">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            System Review Checks (Yes/No)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          
          <CheckboxGroup
            title="General"
            section="general"
            items={[
              { key: "fever", label: "Fever" },
              { key: "weightLoss", label: "Weight Loss" },
              { key: "fatigue", label: "Fatigue" },
              { key: "nightSweats", label: "Night Sweats" },
              { key: "appetiteChange", label: "Appetite Change" },
              { key: "weakness", label: "Weakness" },
            ]}
          />

          <CheckboxGroup
            title="Cardiovascular"
            section="cardiovascular"
            items={[
              { key: "chestPain", label: "Chest Pain" },
              { key: "palpitations", label: "Palpitations" },
              { key: "shortnessOfBreath", label: "Shortness of Breath" },
              { key: "orthopnea", label: "Orthopnea" },
              { key: "paroxysmalNocturnalDyspnea", label: "Paroxysmal Nocturnal Dyspnea" },
              { key: "legSwelling", label: "Leg Swelling" },
            ]}
          />

          <CheckboxGroup
            title="Respiratory"
            section="respiratory"
            items={[
              { key: "cough", label: "Cough" },
              { key: "sputum", label: "Sputum" },
              { key: "hemoptysis", label: "Hemoptysis" },
              { key: "wheezing", label: "Wheezing" },
              { key: "shortnessOfBreath", label: "Shortness of Breath" },
              { key: "chestTightness", label: "Chest Tightness" },
            ]}
          />

          <CheckboxGroup
            title="Gastrointestinal"
            section="gastrointestinal"
            items={[
              { key: "nausea", label: "Nausea" },
              { key: "vomiting", label: "Vomiting" },
              { key: "diarrhea", label: "Diarrhea" },
              { key: "constipation", label: "Constipation" },
              { key: "abdominalPain", label: "Abdominal Pain" },
              { key: "bloating", label: "Bloating" },
              { key: "heartburn", label: "Heartburn" },
              { key: "difficultySwallowing", label: "Difficulty Swallowing" },
              { key: "rectalBleeding", label: "Rectal Bleeding" },
            ]}
          />

          <CheckboxGroup
            title="Genitourinary"
            section="genitourinary"
            items={[
              { key: "dysuria", label: "Dysuria" },
              { key: "urinaryFrequency", label: "Urinary Frequency" },
              { key: "urgency", label: "Urgency" },
              { key: "incontinence", label: "Incontinence" },
              { key: "hematuria", label: "Hematuria" },
              { key: "flankPain", label: "Flank Pain" },
            ]}
          />

          <CheckboxGroup
            title="Reproductive"
            section="reproductive"
            items={[
              { key: "menstrualIrregularities", label: "Menstrual Irregularities" },
              { key: "pelvicPain", label: "Pelvic Pain" },
              { key: "vaginalDischarge", label: "Vaginal Discharge" },
              { key: "erectileDysfunction", label: "Erectile Dysfunction" },
              { key: "libidoChanges", label: "Libido Changes" },
            ]}
          />

          <CheckboxGroup
            title="Musculoskeletal"
            section="musculoskeletal"
            items={[
              { key: "jointPain", label: "Joint Pain" },
              { key: "jointSwelling", label: "Joint Swelling" },
              { key: "backPain", label: "Back Pain" },
              { key: "muscleCramps", label: "Muscle Cramps" },
              { key: "stiffness", label: "Stiffness" },
              { key: "limitedMobility", label: "Limited Mobility" },
            ]}
          />

          <CheckboxGroup
            title="Neurological"
            section="neurological"
            items={[
              { key: "headache", label: "Headache" },
              { key: "dizziness", label: "Dizziness" },
              { key: "syncope", label: "Syncope" },
              { key: "seizures", label: "Seizures" },
              { key: "numbness", label: "Numbness" },
              { key: "tingling", label: "Tingling" },
              { key: "weakness", label: "Weakness" },
              { key: "tremors", label: "Tremors" },
              { key: "memoryIssues", label: "Memory Issues" },
            ]}
          />

          <CheckboxGroup
            title="Endocrine"
            section="endocrine"
            items={[
              { key: "heatIntolerance", label: "Heat Intolerance" },
              { key: "coldIntolerance", label: "Cold Intolerance" },
              { key: "excessiveThirst", label: "Excessive Thirst" },
              { key: "excessiveUrination", label: "Excessive Urination" },
              { key: "weightGain", label: "Weight Gain" },
              { key: "weightLoss", label: "Weight Loss" },
              { key: "hairLoss", label: "Hair Loss" },
            ]}
          />

          <CheckboxGroup
            title="Dermatological"
            section="dermatological"
            items={[
              { key: "rashes", label: "Rashes" },
              { key: "itching", label: "Itching" },
              { key: "dryness", label: "Dryness" },
              { key: "hairLoss", label: "Hair Loss" },
              { key: "skinColorChanges", label: "Skin Color Changes" },
              { key: "lesions", label: "Lesions" },
            ]}
          />

          <CheckboxGroup
            title="Psychiatric"
            section="psychiatric"
            items={[
              { key: "anxiety", label: "Anxiety" },
              { key: "depression", label: "Depression" },
              { key: "insomnia", label: "Insomnia" },
              { key: "moodSwings", label: "Mood Swings" },
              { key: "hallucinations", label: "Hallucinations" },
              { key: "suicidalThoughts", label: "Suicidal Thoughts" },
            ]}
          />

          <CheckboxGroup
            title="Hematological"
            section="hematological"
            items={[
              { key: "easyBruising", label: "Easy Bruising" },
              { key: "prolongedBleeding", label: "Prolonged Bleeding" },
              { key: "anemiaSymptoms", label: "Anemia Symptoms" },
            ]}
          />

          <CheckboxGroup
            title="Allergy/Immunology"
            section="allergyImmunology"
            items={[
              { key: "nasalCongestion", label: "Nasal Congestion" },
              { key: "sneezing", label: "Sneezing" },
              { key: "seasonalAllergies", label: "Seasonal Allergies" },
              { key: "foodAllergies", label: "Food Allergies" },
              { key: "drugAllergies", label: "Drug Allergies" },
            ]}
          />

          {/* Other Notes */}
          <div className="space-y-2">
            <Label htmlFor="otherNotes" className="text-sm font-medium text-slate-700">
              Other Notes
            </Label>
            <Textarea
              id="otherNotes"
              placeholder="Any additional notes about the system review..."
              value={formData.checks.otherNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

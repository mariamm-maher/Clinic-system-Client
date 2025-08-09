import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Heart,
  Pill,
  AlertTriangle,
  Activity,
  Shield,
  FileText,
} from "lucide-react";

export default function MedicalInfoView({ patient }) {
  const medicalDetails = [
    {
      label: "Blood Type",
      value: patient.bloodType,
      icon: Heart,
    },
    {
      label: "Insurance Provider",
      value: patient.insurance,
      icon: Shield,
    },
    {
      label: "Current Condition",
      value: patient.condition,
      icon: Activity,
    },
  ];

  const InfoSection = ({
    title,
    items,
    icon: SectionIcon,
    gradient,
    borderColor,
    children,
  }) => (
    <div
      className={`bg-gradient-to-br from-white ${gradient} rounded-xl p-6 border ${borderColor} shadow-sm`}
    >
      <h4 className="font-semibold text-slate-800 mb-6 flex items-center gap-2 text-lg">
        <SectionIcon className="h-5 w-5" />
        {title}
      </h4>
      {items && (
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-white/50 rounded-lg"
              >
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">
                    {item.label}
                  </p>
                  <p className="text-slate-800 font-semibold">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {children}
    </div>
  );

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <Stethoscope className="h-6 w-6 text-purple-600" />
          Medical Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Details */}
          <div className="space-y-6">
            <InfoSection
              title="Medical Details"
              items={medicalDetails}
              icon={FileText}
              gradient="to-purple-50/30"
              borderColor="border-purple-100"
            />

            <InfoSection
              title="Allergies"
              icon={AlertTriangle}
              gradient="to-red-50/30"
              borderColor="border-red-100"
            >
              <div className="space-y-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 mr-2 mb-2"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No known allergies</p>
                )}
              </div>
            </InfoSection>
          </div>

          {/* Current Medications & Medical History */}
          <div className="space-y-6">
            <InfoSection
              title="Current Medications"
              icon={Pill}
              gradient="to-green-50/30"
              borderColor="border-green-100"
            >
              <div className="space-y-3">
                {patient.medications && patient.medications.length > 0 ? (
                  patient.medications.map((medication, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                    >
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Pill className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {medication}
                        </p>
                        <p className="text-sm text-slate-500">
                          Active prescription
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">
                    No current medications
                  </p>
                )}
              </div>
            </InfoSection>

            <InfoSection
              title="Medical History"
              icon={Heart}
              gradient="to-blue-50/30"
              borderColor="border-blue-100"
            >
              <div className="space-y-2">
                {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                  patient.medicalHistory.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {condition}
                        </p>
                        <p className="text-sm text-slate-500">
                          Previous condition
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">
                    No medical history recorded
                  </p>
                )}
              </div>
            </InfoSection>
          </div>
        </div>
      </CardContent>
    </>
  );
}

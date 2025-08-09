import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useStaffFormStore } from "./staffFormStore";

export default function ReviewStep() {
  const { formData } = useStaffFormStore();

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            Review Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info Summary */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">
              Basic Information
            </h4>
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {formData.basicInfo.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {formData.basicInfo.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {formData.personalInfo.phone}
              </p>
              <p>
                <span className="font-medium">Age:</span>{" "}
                {formData.personalInfo.age}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {formData.personalInfo.gender}
              </p>
            </div>
          </div>

          {/* Professional Info Summary */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">
              Professional Information
            </h4>
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <p>
                <span className="font-medium">Department:</span>{" "}
                {formData.professionalInfo.department}
              </p>
              <p>
                <span className="font-medium">Position:</span>{" "}
                {formData.professionalInfo.position}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {formData.professionalInfo.experience.years} years
              </p>
            </div>
          </div>

          {/* Qualifications Summary */}
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">
              Qualifications
            </h4>
            <div className="space-y-1">
              {(formData.professionalInfo.qualifications || []).map(
                (qualification, index) => (
                  <p key={index} className="text-sm bg-slate-50 p-2 rounded">
                    <span className="font-medium">{qualification.degree}</span>{" "}
                    from{" "}
                    <span className="text-slate-600">
                      {qualification.institution}
                    </span>{" "}
                    ({qualification.year})
                  </p>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

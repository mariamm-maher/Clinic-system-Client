import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useStaffFormStore } from "./staffFormStore";
import { Eye, EyeOff } from "lucide-react";

export default function ReviewStep() {
  const { formData } = useStaffFormStore();
  const [showPassword, setShowPassword] = useState(false);

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
              <div className="flex items-center justify-between">
                <p>
                  <span className="font-medium">Password:</span>{" "}
                  {showPassword ? formData.basicInfo.password : "********"}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
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

    

        </CardContent>
      </Card>
    </div>
  );
}

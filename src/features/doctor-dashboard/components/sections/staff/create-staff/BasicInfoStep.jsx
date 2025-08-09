import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, Mail } from "lucide-react";
import { useStaffFormStore } from "./staffFormStore";

export default function BasicInfoStep() {
  const { formData, updateFormData, getFieldError, handleAvatarUpload } =
    useStaffFormStore();

  const handleInputChange = (field, value) => {
    updateFormData("basicInfo", { [field]: value });
  };

  const handleAvatarChange = (e) => {
    handleAvatarUpload(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-blue-600" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-28 w-28 ring-4 ring-blue-100 shadow-lg">
                <AvatarImage src={formData.basicInfo.avatarPreview} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 text-xl font-semibold">
                  {formData.basicInfo.name ? (
                    formData.basicInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-blue-50"
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </span>
                  </Button>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <p className="text-xs text-slate-500 mt-2">
                  JPG, PNG up to 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.basicInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ahmed Mohamed"
                className={`mt-1 ${
                  getFieldError("basicInfo.name") ? "border-red-500" : ""
                }`}
              />
              {getFieldError("basicInfo.name") && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError("basicInfo.name")}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.basicInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ahmed@example.com"
                  className={`mt-1 ${
                    getFieldError("basicInfo.email") ? "border-red-500" : ""
                  }`}
                />
                {getFieldError("basicInfo.email") && (
                  <p className="text-sm text-red-600 mt-1">
                    {getFieldError("basicInfo.email")}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.basicInfo.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Secure password"
                  className={`mt-1 ${
                    getFieldError("basicInfo.password") ? "border-red-500" : ""
                  }`}
                />
                {getFieldError("basicInfo.password") && (
                  <p className="text-sm text-red-600 mt-1">
                    {getFieldError("basicInfo.password")}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLoginForm } from "../hooks/useAuth.jsx";
import LanguageToggle from "@/components/common/LanguageToggle";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function LoginForm() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error } = useLoginForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("logo.clinicName")}
          </h1>
          <p className="text-gray-600 mt-2">{t("auth.staffPortal")}</p>
        </div>{" "}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center text-gray-900">
              {t("auth.welcomeBack")}
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">
              {t("auth.enterCredentials")}
            </p>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {" "}
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.emailAddress")}</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className={`${isRTL ? "pr-10" : "pl-10"}`}
                  />
                  <Mail
                    className={`absolute ${
                      isRTL ? "right-3" : "left-3"
                    } top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400`}
                  />
                </div>
              </div>{" "}
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className={`${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}`}
                  />
                  <Lock
                    className={`absolute ${
                      isRTL ? "right-3" : "left-3"
                    } top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${
                      isRTL ? "left-3" : "right-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>{" "}
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center ${
                    isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                  }`}
                >
                  <Checkbox
                    id="remember-me"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-gray-600"
                  >
                    {t("auth.rememberMe")}
                  </Label>
                </div>
                <a
                  href="#forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {t("auth.forgotPassword")}
                </a>
              </div>{" "}
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className={`animate-spin h-5 w-5 ${
                        isRTL ? "ml-3" : "mr-3"
                      }`}
                    />
                    {t("auth.signingIn")}
                  </>
                ) : (
                  t("auth.signIn")
                )}
              </Button>
            </form>
            <Separator className="my-6" /> {/* Demo Credentials */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                {t("auth.demoCredentials")}
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>{t("auth.doctor")}:</strong> doctor@clinic.com /
                  password123
                </p>
                <p>
                  <strong>{t("auth.staff")}:</strong> staff@clinic.com /
                  password123
                </p>
                <p>
                  <strong>{t("auth.admin")}:</strong> admin@clinic.com /
                  password123
                </p>
              </div>
            </div>{" "}
            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {t("auth.needHelp")}{" "}
                <a
                  href="mailto:it@clinic.com"
                  className="text-blue-600 hover:underline"
                >
                  it@clinic.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Back to Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft
              className={`w-4 h-4 ${isRTL ? "ml-2 rtl-flip" : "mr-2"}`}
            />
            {t("auth.backToWebsite")}
          </a>
        </div>
      </div>
    </div>
  );
}

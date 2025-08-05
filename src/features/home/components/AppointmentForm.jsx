import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clinicConfig } from "@/lib/config";
import { useCreateAppointment } from "@/features/home/hooks/useAppointment";

export default function AppointmentForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    appointmentType: "",
    termsAccepted: false,
  });
  const [selectedDay, setSelectedDay] = useState("");

  // React Query mutation hook for creating appointments
  const createAppointmentMutation = useCreateAppointment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare appointment data for API
    const appointmentData = {
      patientName: formData.name,
      patientPhone: formData.phone,
      day: selectedDay,
      time: formData.appointmentTime,
      notes: formData.reason || "",
    };

    try {
      // Use React Query mutation
      await createAppointmentMutation.mutateAsync(appointmentData);
      // Reset form on success
      setFormData({
        name: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        appointmentType: "",
        termsAccepted: false,
      });
      setSelectedDay("");
    } catch (error) {
      // Error handling is done by React Query and the global error handler
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            {" "}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {t("appointment.title")}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {t("appointment.subtitle")}
              </CardDescription>
            </CardHeader>{" "}
            <CardContent>
              {/* Compact Notice Banner */}
              <div className="mb-4 relative overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 p-4 shadow-sm">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-300 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-green-300 rounded-full transform -translate-x-6 translate-y-6"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center space-x-3">
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>{" "}
                  {/* Text Content */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-snug">
                      {t("appointment.alertMessage")}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal & Contact Information */}{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("appointment.firstName")} *</Label>
                    <Input
                      id="name"
                      placeholder={t("appointment.firstName")}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("appointment.phone")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                {/* Appointment Date & Time */}{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {" "}
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDay">
                      {t("appointment.preferredDate")} *
                    </Label>
                    <Select
                      value={selectedDay}
                      onValueChange={(value) => {
                        setSelectedDay(value);
                        handleInputChange("appointmentDate", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("appointment.selectDay")} />
                      </SelectTrigger>{" "}
                      <SelectContent>
                        <SelectItem value="Sunday">
                          {t("appointment.days.sunday")}
                        </SelectItem>
                        <SelectItem value="Monday">
                          {t("appointment.days.monday")}
                        </SelectItem>
                        <SelectItem value="Tuesday">
                          {t("appointment.days.tuesday")}
                        </SelectItem>
                        <SelectItem value="Wednesday">
                          {t("appointment.days.wednesday")}
                        </SelectItem>
                        <SelectItem value="Thursday">
                          {t("appointment.days.thursday")}
                        </SelectItem>
                        <SelectItem value="Friday">
                          {t("appointment.days.friday")}
                        </SelectItem>
                        <SelectItem value="Saturday">
                          {t("appointment.days.saturday")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">
                      {t("appointment.preferredTime")} *
                    </Label>
                    <Select
                      value={formData.appointmentTime}
                      onValueChange={(value) =>
                        handleInputChange("appointmentTime", value)
                      }
                      aria-labelledby="appointmentTime-label"
                    >
                      <SelectTrigger id="appointmentTime" className="w-full">
                        <SelectValue
                          placeholder={t("appointment.preferredTime")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>{" "}
                {/* Reason for Visit */}
                <div className="space-y-2">
                  <Label htmlFor="reason">
                    {t("appointment.reasonForVisit")} (Optional)
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder={t("appointment.reasonPlaceholder")}
                    value={formData.reason}
                    onChange={(e) =>
                      handleInputChange("reason", e.target.value)
                    }
                    rows={3}
                  />
                </div>
                <Separator />
                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      handleInputChange("termsAccepted", checked)
                    }
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      privacy policy
                    </a>
                  </Label>
                </div>{" "}
                {/* Submit Button and Loading State */}
                <Button
                  type="submit"
                  disabled={
                    createAppointmentMutation.isPending ||
                    !formData.termsAccepted
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {createAppointmentMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("appointment.submitting")}
                    </>
                  ) : (
                    t("appointment.submitButton")
                  )}
                </Button>
                {/* Privacy Notice */}
                <div className="text-xs text-gray-500 text-center mt-4">
                  <p>{clinicConfig.privacyNotice}</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

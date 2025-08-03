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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { clinicConfig } from "@/lib/config";
import { toast } from "sonner";

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
  const [selectedDate, setSelectedDate] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingProgress, setBookingProgress] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingProgress(0);

    try {
      // Simulate API call with progress updates
      setBookingProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setBookingProgress(50);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setBookingProgress(80);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setBookingProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success(
        "Appointment booked successfully! We'll contact you shortly."
      );
      console.log("Appointment booking:", formData);
    } catch (error) {
      console.error("Appointment booking failed:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
      setBookingProgress(0);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
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
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDate">
                      {t("appointment.preferredDate")} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="date-picker-popover"
                        >
                          {formData.appointmentDate ||
                            t("appointment.preferredDate")}
                          <svg
                            className="ml-auto h-4 w-4 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        id="date-picker-popover"
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            handleInputChange(
                              "appointmentDate",
                              date?.toISOString().split("T")[0] || ""
                            );
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                </div>
                {/* Submit Button and Loading State */}
                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Processing your appointment...</span>
                      <span>{bookingProgress}%</span>
                    </div>
                    <Progress value={bookingProgress} className="w-full" />
                  </div>
                )}{" "}
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.termsAccepted}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
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

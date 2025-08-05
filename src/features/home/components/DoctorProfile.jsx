import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Shield,
  Heart,
  Smartphone,
  ChevronRight,
  Stethoscope,
  Clock,
  Database,
} from "lucide-react";
import { clinicConfig } from "@/lib/config";

const ServiceCard = ({ icon, title, description, colorClass, rotateClass }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`shadow-lg transform ${rotateClass} hover:rotate-0 transition-all duration-300 hover:shadow-xl cursor-pointer border-0 bg-white/95 backdrop-blur-sm`}
        >
          <CardContent className="p-4">
            <div
              className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center mb-3 shadow-sm`}
            >
              {icon}
            </div>
            <CardTitle className="text-sm font-semibold text-center mb-2 text-gray-800 leading-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-xs text-center text-gray-600 leading-relaxed font-medium">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-200 mt-1">{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function DoctorProfile() {
  const { t } = useTranslation();
  const services = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: t("doctorProfile.services.onlineBooking.title"),
      description: t("doctorProfile.services.onlineBooking.description"),
      colorClass: "bg-gradient-to-br from-blue-100 to-blue-200",
      rotateClass: "rotate-2",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: t("doctorProfile.services.secureRecords.title"),
      description: t("doctorProfile.services.secureRecords.description"),
      colorClass: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      rotateClass: "-rotate-2 mt-4",
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-indigo-600" />,
      title: t("doctorProfile.services.comprehensiveCare.title"),
      description: t("doctorProfile.services.comprehensiveCare.description"),
      colorClass: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      rotateClass: "rotate-1 -mt-2",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-violet-600" />,
      title: t("doctorProfile.services.digitalHealth.title"),
      description: t("doctorProfile.services.digitalHealth.description"),
      colorClass: "bg-gradient-to-br from-violet-100 to-violet-200",
      rotateClass: "-rotate-1",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-24 translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {" "}
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="bg-blue-200/20 text-blue-200 border-blue-200 uppercase tracking-wider hover:bg-blue-200/30 hover:text-blue-100 hover:border-blue-100 transition-all duration-300 hover:scale-105 cursor-default"
                >
                  {t("doctorProfile.clinic")}
                </Badge>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="block text-white">
                    {t("doctorProfile.hero.excellence")}
                  </span>
                  <span className="block text-white">
                    {t("doctorProfile.hero.healthcare")}
                  </span>
                  <span className="block text-blue-200">
                    {t("doctorProfile.hero.withDoctor")}{" "}
                    {clinicConfig.doctor.name.toUpperCase()}
                  </span>
                </h1>
              </div>
            </div>{" "}
            {/* Credentials as Badges */}
            <div className="flex flex-wrap gap-2">
              {t("doctorProfile.credentials", { returnObjects: true })
                .slice(0, 3)
                .map((credential, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-200/20 text-blue-100 border-blue-200 hover:bg-blue-200/30 hover:text-white hover:border-blue-100 transition-all duration-300 hover:scale-105 cursor-default text-xs font-medium"
                  >
                    {credential}
                  </Badge>
                ))}
            </div>
            <div className="pt-4">
              {" "}
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              >
                <a href="#appointment">
                  {t("doctorProfile.bookAppointment").toUpperCase()}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>{" "}
          {/* Right Content - Digital Health Services Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  colorClass={service.colorClass}
                  rotateClass={service.rotateClass}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

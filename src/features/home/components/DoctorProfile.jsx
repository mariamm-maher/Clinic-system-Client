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
  CheckCircle,
  FlaskConical,
  Heart,
  FileText,
  ChevronRight,
} from "lucide-react";
import { clinicConfig } from "@/lib/config";

const ServiceCard = ({ icon, title, description, colorClass, rotateClass }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`shadow-lg transform ${rotateClass} hover:rotate-0 transition-transform duration-300 hover:shadow-xl cursor-pointer`}
        >
          <CardContent className="p-3">
            <div
              className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mb-2`}
            >
              {icon}
            </div>
            <CardTitle className="text-xs text-center mb-1">{title}</CardTitle>
            <CardDescription className="text-xs text-center text-gray-600">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {title} - {description}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function DoctorProfile() {
  const { t } = useTranslation();
  const services = [
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Expert Diagnosis",
      description: "Comprehensive Care",
      colorClass: "bg-gradient-to-br from-blue-100 to-blue-200",
      rotateClass: "rotate-2",
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-blue-700" />,
      title: "Advanced Treatment",
      description: "Modern Medicine",
      colorClass: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      rotateClass: "-rotate-2 mt-4",
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-800" />,
      title: "Heart Health",
      description: "Preventive Care",
      colorClass: "bg-gradient-to-br from-sky-100 to-sky-200",
      rotateClass: "rotate-1 -mt-2",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-900" />,
      title: "Health Records",
      description: "Digital Solutions",
      colorClass: "bg-gradient-to-br from-cyan-100 to-cyan-200",
      rotateClass: "-rotate-1",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
      {" "}
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-24 translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {" "}
            <div className="space-y-4">
              {" "}
              <Badge
                variant="outline"
                className="bg-blue-200/20 text-blue-200 border-blue-200 uppercase tracking-wider hover:bg-blue-200/30 hover:text-blue-100 hover:border-blue-100 transition-all duration-300 hover:scale-105 cursor-default"
              >
                {clinicConfig.name}
              </Badge>{" "}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t("doctorProfile.title").toUpperCase()}
                <br />
                HEALTHCARE
                <br />
                <span className="text-blue-200">
                  WITH {clinicConfig.doctor.name.toUpperCase()}
                </span>
              </h1>
            </div>{" "}
            {/* Credentials as Badges */}
            <div className="flex flex-wrap gap-2">
              {clinicConfig.doctor.credentials
                .slice(0, 3)
                .map((credential, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-200/20 text-blue-100 border-blue-200 hover:bg-blue-200/30 hover:text-white hover:border-blue-100 transition-all duration-300 hover:scale-105 cursor-default"
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
          {/* Right Content - Medical Services Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
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
            <Card className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 shadow-2xl">
              <CardContent className="p-4 text-center">
                <Avatar className="w-12 h-12 mx-auto mb-2">
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                    {clinicConfig.doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm mb-1">
                  {clinicConfig.doctor.name}
                </CardTitle>
                <CardDescription className="text-xs mb-2">
                  {clinicConfig.doctor.title}
                </CardDescription>{" "}
                <Badge className="bg-blue-600 text-white text-xs hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-default">
                  15+ Years Experience
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

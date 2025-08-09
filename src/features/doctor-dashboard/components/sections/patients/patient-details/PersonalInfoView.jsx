import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Contact,
} from "lucide-react";

export default function PersonalInfoView({ patient }) {
  const personalInfo = [
    {
      label: "Full Name",
      value: patient.name,
      icon: User,
    },
    {
      label: "Date of Birth",
      value: patient.dateOfBirth,
      icon: Calendar,
    },
    {
      label: "Age",
      value: `${patient.age} years`,
      icon: Calendar,
    },
    {
      label: "Gender",
      value: patient.gender,
      icon: User,
    },
    {
      label: "Medical Record Number",
      value: patient.mrn,
      icon: Shield,
    },
  ];

  const contactInfo = [
    {
      label: "Phone Number",
      value: patient.phone,
      icon: Phone,
    },
    {
      label: "Email Address",
      value: patient.email,
      icon: Mail,
    },
    {
      label: "Address",
      value: patient.address,
      icon: MapPin,
    },
  ];

  const emergencyInfo = [
    {
      label: "Emergency Contact",
      value: patient.emergencyContactName,
      icon: Contact,
    },
    {
      label: "Emergency Phone",
      value: patient.emergencyContact,
      icon: Phone,
    },
  ];

  const InfoSection = ({
    title,
    items,
    icon: SectionIcon,
    gradient,
    borderColor,
  }) => (
    <div
      className={`bg-gradient-to-br from-white ${gradient} rounded-xl p-6 border ${borderColor} shadow-sm`}
    >
      <h4 className="font-semibold text-slate-800 mb-6 flex items-center gap-2 text-lg">
        <SectionIcon className="h-5 w-5" />
        {title}
      </h4>
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
    </div>
  );

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <User className="h-6 w-6 text-blue-600" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="space-y-6">
            <InfoSection
              title="Personal Details"
              items={personalInfo}
              icon={User}
              gradient="to-blue-50/30"
              borderColor="border-blue-100"
            />

            <InfoSection
              title="Emergency Contact"
              items={emergencyInfo}
              icon={Phone}
              gradient="to-red-50/30"
              borderColor="border-red-100"
            />
          </div>

          {/* Contact Information */}
          <div>
            <InfoSection
              title="Contact Information"
              items={contactInfo}
              icon={Mail}
              gradient="to-green-50/30"
              borderColor="border-green-100"
            />
          </div>
        </div>
      </CardContent>
    </>
  );
}

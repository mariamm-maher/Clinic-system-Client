import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Clock,
  DollarSign,
  Users,
  Shield,
  GraduationCap,
  Star,
  Heart,
  Activity,
  TrendingUp,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function OverviewView({ staffData }) {
  const quickStats = [
    {
      label: "Years of Service",
      value:
        new Date().getFullYear() -
        new Date(staffData.professional.hireDate).getFullYear(),
      icon: Calendar,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Department",
      value: staffData.professional.department,
      icon: Briefcase,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
    },
    {
      label: "Qualifications",
      value: staffData.professional.qualifications?.length || 0,
      icon: GraduationCap,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-600",
    },
    {
      label: "Rating",
      value: `${staffData.rating}/5`,
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      textColor: "text-amber-600",
    },
  ];

  const contactInfo = [
    {
      label: "Email",
      value: staffData.email,
      icon: Mail,
      color: "text-blue-600",
    },
    {
      label: "Phone",
      value: staffData.personalInfo.phone,
      icon: Phone,
      color: "text-green-600",
    },
    {
      label: "Address",
      value: `${staffData.personalInfo.address.street}, ${staffData.personalInfo.address.city}, ${staffData.personalInfo.address.state} ${staffData.personalInfo.address.zipCode}`,
      icon: MapPin,
      color: "text-red-600",
    },
  ];

  const professionalInfo = [
    { label: "Employee ID", value: staffData.professional.employeeId },
    {
      label: "Hire Date",
      value: new Date(staffData.professional.hireDate).toLocaleDateString(),
    },
    { label: "License Number", value: staffData.professional.licenseNumber },
    { label: "Shift", value: staffData.professional.shift },
    { label: "Supervisor", value: staffData.professional.supervisor },
    {
      label: "Experience",
      value: `${staffData.professional.experience.years} years`,
    },
  ];

  const performanceMetrics = [
    {
      label: "Current Patients",
      value: staffData.currentPatients,
      icon: Users,
      trend: "+5%",
    },
    { label: "Rating", value: staffData.rating, icon: Star, trend: "+0.2" },
    {
      label: "Experience",
      value: `${staffData.professional.experience.years}Y`,
      icon: Award,
      trend: "Stable",
    },
    {
      label: "Status",
      value: staffData.status,
      icon: CheckCircle,
      trend: "Active",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Enhanced Profile Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-100"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full translate-y-16 -translate-x-16" />

        <div className="relative flex items-center space-x-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-30 animate-pulse" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              {staffData.firstName?.[0]}
              {staffData.lastName?.[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              {staffData.firstName} {staffData.lastName}
            </h2>
            <p className="text-xl text-gray-600 mb-3 font-medium">
              {staffData.professional.position}
            </p>
            <p className="text-gray-500 mb-4">
              {staffData.professional.department} Department
            </p>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="text-lg font-semibold text-gray-900">
                  {staffData.rating}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900">
                  {staffData.currentPatients}
                </span>
                <span className="text-gray-500">patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-lg font-semibold text-gray-900">
                  {staffData.professional.experience.years}
                </span>
                <span className="text-gray-500">years exp.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform" />

              <div className="relative flex items-center space-x-4">
                <div
                  className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-100 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
          Performance Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {metric.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Contact Information
          </h3>
          <div className="space-y-5">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors"
                >
                  <div
                    className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center`}
                  >
                    <IconComponent className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {info.label}
                    </p>
                    <p className="text-gray-900 break-words">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Professional Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-white via-green-50/30 to-green-100/20 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-3 text-green-600" />
            Professional Details
          </h3>
          <div className="space-y-4">
            {professionalInfo.map((info, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-white/50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {info.label}
                </span>
                <span className="text-gray-900 font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white via-red-50/30 to-red-100/20 rounded-2xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-red-600" />
            Emergency Contact
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-red-100">
              <p className="text-sm font-semibold text-gray-700 mb-1">Name</p>
              <p className="text-gray-900 text-lg">
                {staffData.personalInfo.emergencyContact?.name}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-red-100">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Relationship
              </p>
              <p className="text-gray-900 capitalize">
                {staffData.personalInfo.emergencyContact?.relationship}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-red-100">
              <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
              <p className="text-gray-900">
                {staffData.personalInfo.emergencyContact?.phone}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Qualifications & Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-purple-600" />
            Qualifications & Certifications
          </h3>

          {/* Qualifications */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Education
            </h4>
            <div className="space-y-3">
              {staffData.professional.qualifications?.map((qual, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-gray-900">{qual.degree}</p>
                  <p className="text-sm text-gray-600">{qual.institution}</p>
                  <p className="text-sm text-purple-600 mt-1">
                    Graduated: {qual.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Certifications
            </h4>
            <div className="space-y-3">
              {staffData.certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-purple-100 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-purple-600 mt-1">
                    Expires: {new Date(cert.expiry).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Notes */}
      {staffData.notes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/20 rounded-2xl p-6 border border-indigo-100 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-indigo-600" />
            Additional Notes
          </h3>
          <div className="bg-white rounded-xl p-6 border border-indigo-100">
            <p className="text-gray-800 leading-relaxed">{staffData.notes}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

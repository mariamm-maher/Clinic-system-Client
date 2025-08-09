import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  Clock,
  Award,
  GraduationCap,
  User,
  Shield,
  Star,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";

export default function ProfessionalInfoView({ staffData }) {
  const professional = staffData.professional;

  const formatSalary = (salary) => {
    return salary.includes("$") ? salary : `$${salary}`;
  };

  const getShiftIcon = (shift) => {
    if (shift.toLowerCase().includes("morning")) return "🌅";
    if (shift.toLowerCase().includes("night")) return "🌙";
    if (shift.toLowerCase().includes("evening")) return "🌆";
    return "⏰";
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent flex items-center">
            <Briefcase className="w-8 h-8 mr-4 text-blue-600" />
            Professional Information
          </h2>
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-200 bg-purple-50"
          >
            Career Details
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-blue-500" />
                      Department
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {professional.department}
                      </p>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      Position
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {professional.position}
                      </p>
                    </div>
                  </div>

                  {/* Employee ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-blue-500" />
                      Employee ID
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium font-mono">
                        {professional.employeeId}
                      </p>
                    </div>
                  </div>

                  {/* Hire Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Hire Date
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {new Date(professional.hireDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-blue-500" />
                      Experience
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {professional.experience.years} years
                      </p>
                    </div>
                  </div>

                  {/* Supervisor */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      Supervisor
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {professional.supervisor}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Work Schedule & Compensation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                  Schedule & Compensation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Work Shift */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    Work Shift
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                    <p className="text-gray-900 font-medium flex items-center">
                      <span className="mr-2 text-lg">
                        {getShiftIcon(professional.shift)}
                      </span>
                      {professional.shift}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    Annual Salary
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                    <p className="text-gray-900 font-medium text-xl">
                      {formatSalary(professional.salary)}
                    </p>
                  </div>
                </div>

                {/* Employment Stats */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Employment Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-2xl font-bold text-green-600">
                        {new Date().getFullYear() -
                          new Date(professional.hireDate).getFullYear()}
                      </p>
                      <p className="text-sm text-gray-600">Years with us</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">
                        {professional.experience.years}
                      </p>
                      <p className="text-sm text-gray-600">Total Experience</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* License & Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Shield className="w-6 h-6 text-purple-600" />
                License & Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* License Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-purple-500" />
                    License Number
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                    <p className="text-gray-900 font-medium font-mono">
                      {professional.licenseNumber}
                    </p>
                  </div>
                </div>

                {/* License Expiry */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    License Expiry
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                    <p className="text-gray-900 font-medium">
                      {new Date(professional.licenseExpiry).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <Badge
                      className={
                        new Date(professional.licenseExpiry) > new Date()
                          ? "bg-green-100 text-green-800 border-green-200 mt-2"
                          : "bg-red-100 text-red-800 border-red-200 mt-2"
                      }
                    >
                      {new Date(professional.licenseExpiry) > new Date()
                        ? "Valid"
                        : "Expired"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              {professional.specializations &&
                professional.specializations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-500" />
                      Specializations
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                      <div className="flex flex-wrap gap-2">
                        {professional.specializations.map((spec, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-purple-600 border-purple-200 bg-purple-50"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Qualifications & Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/20 border-indigo-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                Education & Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {professional.qualifications &&
              professional.qualifications.length > 0 ? (
                <div className="space-y-4">
                  {professional.qualifications.map((qualification, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {qualification.degree}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 flex items-center mb-1">
                                <Building className="w-4 h-4 mr-2 text-indigo-500" />
                                Institution
                              </p>
                              <p className="text-gray-900">
                                {qualification.institution}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 flex items-center mb-1">
                                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                Graduation Year
                              </p>
                              <p className="text-gray-900">
                                {qualification.year}
                              </p>
                            </div>
                          </div>

                          {/* Certificate Status */}
                          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Certificate Status
                            </p>
                            <Badge
                              className={
                                qualification.certificatePhoto
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-orange-100 text-orange-800 border-orange-200"
                              }
                            >
                              {qualification.certificatePhoto
                                ? "Certificate Uploaded"
                                : "Certificate Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No qualifications recorded</p>
                </div>
              )}

              {/* Education Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-indigo-600" />
                  Education Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {professional.qualifications?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Degrees</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {professional.qualifications?.length > 0
                        ? Math.min(
                            ...professional.qualifications.map((q) =>
                              parseInt(q.year)
                            )
                          )
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">First Degree</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {professional.qualifications?.length > 0
                        ? Math.max(
                            ...professional.qualifications.map((q) =>
                              parseInt(q.year)
                            )
                          )
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">Latest Degree</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

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


  const contactInfo = [
    {
      label: "Email",
      value: staffData.user?.email || "N/A",
      icon: Mail,
      color: "text-blue-600",
    },
    {
      label: "Phone",
      value: staffData?.personalInfo?.phone || "N/A",
      icon: Phone,
      color: "text-green-600",
    },
    {
      label: "Address",
      value: staffData?.personalInfo?.address 
        ? `${staffData.personalInfo.address.street || ''}, ${staffData.personalInfo.address.city || ''}`
        : "N/A",
      icon: MapPin,
      color: "text-red-600",
    },
  ];

  const professionalInfo = [
    { label: "Staff ID", value: staffData?._id || "N/A" },
    { label: "User Role", value: staffData?.user?.role || "N/A" },
    {
      label: "Status", 
      value: staffData?.isActive ? "Active" : "Inactive"
    },
    {
      label: "Age",
      value: staffData?.personalInfo?.age ? `${staffData.personalInfo.age} years` : "N/A"
    },
    {
      label: "Gender",
      value: staffData?.personalInfo?.gender ? staffData.personalInfo.gender.charAt(0).toUpperCase() + staffData.personalInfo.gender.slice(1) : "N/A"
    },
    {
      label: "National ID",
      value: staffData?.identification?.nationalID || "N/A"
    },
    {
      label: "Created At",
      value: staffData?.createdAt ? new Date(staffData.createdAt).toLocaleDateString() : "N/A"
    },
  ];


  return (
    <div className="p-8 space-y-8">
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
            {staffData?.personalInfo?.emergencyContact ? (
              <>
                <div className="p-4 bg-white rounded-xl border border-red-100">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Name</p>
                  <p className="text-gray-900 text-lg">
                    {staffData.personalInfo.emergencyContact.name || "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-red-100">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Relationship
                  </p>
                  <p className="text-gray-900 capitalize">
                    {staffData.personalInfo.emergencyContact.relationship || "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-red-100">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                  <p className="text-gray-900">
                    {staffData.personalInfo.emergencyContact.phone || "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl border border-red-100 text-center">
                <p className="text-gray-500">No emergency contact information available</p>
              </div>
            )}
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
              {staffData?.professional?.qualifications?.length > 0 ? (
                staffData.professional.qualifications.map((qual, index) => (
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
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-purple-100 text-center">
                  <p className="text-gray-500">No education information available</p>
                </div>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Certifications
            </h4>
            <div className="space-y-3">
              {staffData?.certifications?.length > 0 ? (
                staffData.certifications.map((cert, index) => (
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
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-purple-100 text-center">
                  <p className="text-gray-500">No certifications available</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

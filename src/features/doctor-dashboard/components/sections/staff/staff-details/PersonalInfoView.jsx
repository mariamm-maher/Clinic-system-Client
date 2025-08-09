import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Calendar,
  User,
  Heart,
  Home,
  Globe,
  CreditCard,
  Shield,
  Users,
} from "lucide-react";

export default function PersonalInfoView({ staffData }) {
  const personalInfo = staffData.personalInfo;
  const identification = staffData.identification;

  const getGenderIcon = (gender) => {
    return gender === "female" ? "♀️" : gender === "male" ? "♂️" : "⚧️";
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return personalInfo.age;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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
            <User className="w-8 h-8 mr-4 text-blue-600" />
            Personal Information
          </h2>
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50"
          >
            Personal Details
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-6 h-6 text-blue-600" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      Phone Number
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.phone}
                      </p>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Age
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {calculateAge(personalInfo.dateOfBirth)} years old
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-blue-500" />
                      Gender
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium flex items-center">
                        <span className="mr-2">
                          {getGenderIcon(personalInfo.gender)}
                        </span>
                        {personalInfo.gender.charAt(0).toUpperCase() +
                          personalInfo.gender.slice(1)}
                      </p>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Date of Birth
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.dateOfBirth
                          ? new Date(
                              personalInfo.dateOfBirth
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-500" />
                      Nationality
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.nationality || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <MapPin className="w-6 h-6 text-green-600" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Street Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Home className="w-4 h-4 mr-2 text-green-500" />
                    Street Address
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                    <p className="text-gray-900 font-medium">
                      {personalInfo.address.street}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      City
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.address.city}
                      </p>
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      State/Province
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.address.state}
                      </p>
                    </div>
                  </div>

                  {/* ZIP Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-green-500" />
                      ZIP/Postal Code
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.address.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-green-500" />
                      Country
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {personalInfo.address.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Address Display */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Complete Address
                  </h4>
                  <p className="text-gray-900 leading-relaxed">
                    {personalInfo.address.street}
                    <br />
                    {personalInfo.address.city}, {personalInfo.address.state}{" "}
                    {personalInfo.address.zipCode}
                    <br />
                    {personalInfo.address.country}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-white via-red-50/30 to-red-100/20 border-red-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Users className="w-6 h-6 text-red-600" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Emergency Contact Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-red-500" />
                    Contact Name
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                    <p className="text-gray-900 font-medium">
                      {personalInfo.emergencyContact.name}
                    </p>
                  </div>
                </div>

                {/* Emergency Contact Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-red-500" />
                    Contact Phone
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                    <p className="text-gray-900 font-medium">
                      {personalInfo.emergencyContact.phone}
                    </p>
                  </div>
                </div>

                {/* Relationship */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Relationship
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                    <p className="text-gray-900 font-medium capitalize">
                      {personalInfo.emergencyContact.relationship}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Summary */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Emergency Contact Summary
                </h4>
                <div className="text-gray-900">
                  <p className="mb-2">
                    <strong>Primary Contact:</strong>{" "}
                    {personalInfo.emergencyContact.name}
                  </p>
                  <p className="mb-2">
                    <strong>Relationship:</strong>{" "}
                    {personalInfo.emergencyContact.relationship
                      .charAt(0)
                      .toUpperCase() +
                      personalInfo.emergencyContact.relationship.slice(1)}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {personalInfo.emergencyContact.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Identification Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <CreditCard className="w-6 h-6 text-purple-600" />
                Identification Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* National ID */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
                    National ID Number
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                    <p className="text-gray-900 font-medium font-mono">
                      {identification.nationalID}
                    </p>
                  </div>
                </div>

                {/* ID Status */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-purple-500" />
                    ID Verification Status
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ID Documents */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                  ID Document Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <p className="text-sm text-gray-600 mb-1">Front ID Photo</p>
                    <p className="font-medium text-gray-900">
                      {identification.nationalIDPhoto.front
                        ? "Uploaded"
                        : "Not uploaded"}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        identification.nationalIDPhoto.front
                          ? "text-green-600 border-green-200 bg-green-50"
                          : "text-red-600 border-red-200 bg-red-50"
                      }
                    >
                      {identification.nationalIDPhoto.front
                        ? "Available"
                        : "Missing"}
                    </Badge>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <p className="text-sm text-gray-600 mb-1">Back ID Photo</p>
                    <p className="font-medium text-gray-900">
                      {identification.nationalIDPhoto.back
                        ? "Uploaded"
                        : "Not uploaded"}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        identification.nationalIDPhoto.back
                          ? "text-green-600 border-green-200 bg-green-50"
                          : "text-red-600 border-red-200 bg-red-50"
                      }
                    >
                      {identification.nationalIDPhoto.back
                        ? "Available"
                        : "Missing"}
                    </Badge>
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

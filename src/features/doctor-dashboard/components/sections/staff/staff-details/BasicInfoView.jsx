import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Camera, Key, Shield } from "lucide-react";

export default function BasicInfoView({ staffData }) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent flex items-center">
            <User className="w-8 h-8 mr-4 text-blue-600" />
            Basic Information
          </h2>
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50"
          >
            Personal Details
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Camera className="w-6 h-6 text-blue-600" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-30" />
                    <Avatar className="relative h-32 w-32 ring-4 ring-white shadow-2xl">
                      <AvatarImage src={staffData.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                        {staffData.firstName?.[0]}
                        {staffData.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {staffData.firstName} {staffData.lastName}
                    </h3>
                    <p className="text-gray-600">
                      {staffData.professional.position}
                    </p>
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {staffData.status.charAt(0).toUpperCase() +
                        staffData.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Basic Information Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-white via-green-50/20 to-green-100/10 border-green-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-6 h-6 text-green-600" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      First Name
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {staffData.firstName}
                      </p>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      Last Name
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {staffData.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      Email Address
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {staffData.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      Phone Number
                    </label>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-900 font-medium">
                        {staffData.personalInfo.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-white via-purple-50/20 to-purple-100/10 border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Shield className="w-6 h-6 text-purple-600" />
                Security Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-gray-500" />
                    Password
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-900 font-medium">••••••••</p>
                  </div>
                </div>

                {/* Account Status */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-gray-500" />
                    Account Status
                  </label>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <Badge
                      className={`${
                        staffData.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {staffData.status.charAt(0).toUpperCase() +
                        staffData.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Last Login Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Account Activity
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Last Login:</span>
                    <p className="font-medium text-gray-900">
                      Today at 9:15 AM
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Login Count:</span>
                    <p className="font-medium text-gray-900">1,247 times</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Account Created:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        staffData.professional.hireDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Security Level:</span>
                    <p className="font-medium text-green-600">High</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold text-gray-900">
                {staffData.firstName} {staffData.lastName}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Email Domain</p>
              <p className="font-semibold text-gray-900">
                @{staffData.email.split("@")[1]}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Role Level</p>
              <p className="font-semibold text-gray-900">
                {staffData.professional.position}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStaffStore } from "../../../../stores/staffStore";
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
  KeyRound,
  Eye,
  EyeOff,
  Edit,
  Save,
  X,
} from "lucide-react";

export default function PersonalInfoView({ staffData }) {
  const { updateStaffMember, isLoading, fetchStaffById } = useStaffStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const personalInfo = staffData?.personalInfo;
  const identification = staffData?.identification;

  const getGenderIcon = (gender) => {
    return gender === "female" ? "♀️" : gender === "male" ? "♂️" : "⚧️";
  };



  const handleEdit = () => {
    setEditData({
      phone: personalInfo?.phone || '',
      dateOfBirth: personalInfo?.dateOfBirth || '',
      gender: personalInfo?.gender || '',
      nationality: personalInfo?.nationality || '',
      street: personalInfo?.address?.street || '',
      city: personalInfo?.address?.city || '',
      emergencyContactName: personalInfo?.emergencyContact?.name || '',
      emergencyContactPhone: personalInfo?.emergencyContact?.phone || '',
      emergencyContactRelationship: personalInfo?.emergencyContact?.relationship || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = {
        personalInfo: {
          phone: editData.phone,
          dateOfBirth: editData.dateOfBirth,
          gender: editData.gender,
          nationality: editData.nationality,
          address: {
            street: editData.street,
            city: editData.city,
          },
          emergencyContact: {
            name: editData.emergencyContactName,
            phone: editData.emergencyContactPhone,
            relationship: editData.emergencyContactRelationship,
          },
        },
      };

      await updateStaffMember(staffData._id, updates);
      await fetchStaffById(staffData._id);

      setIsEditing(false);
      setEditData({});
      // Consider adding a success toast notification here
    } catch (error) {
      console.error("Error updating staff:", error);
      // Consider adding an error toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
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
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            <Badge
              variant="outline"
              className="text-green-600 border-green-200 bg-green-50"
            >
              Personal Details
            </Badge>
          </div>
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
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {personalInfo?.phone || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Age
                    </label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editData.dateOfBirth ? editData.dateOfBirth.split('T')[0] : ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {personalInfo?.age ? `${personalInfo.age} years old` : `${calculateAge(personalInfo?.dateOfBirth)} years old`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-blue-500" />
                      Gender
                    </label>
                    {isEditing ? (
                      <Select
                        value={editData.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}
                      >
                        <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                        <p className="text-gray-900 font-medium flex items-center">
                          {personalInfo?.gender ? (
                            <>
                              <span className="mr-2">
                                {getGenderIcon(personalInfo.gender)}
                              </span>
                              {personalInfo.gender.charAt(0).toUpperCase() +
                                personalInfo.gender.slice(1)}
                            </>
                          ) : 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Nationality */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-500" />
                      Nationality
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter nationality"
                      />
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {personalInfo?.nationality || "Not specified"}
                        </p>
                      </div>
                    )}
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
                {personalInfo?.address || isEditing ? (
                  <>
                    {/* Street Address */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <Home className="w-4 h-4 mr-2 text-green-500" />
                        Street Address
                      </label>
                      {isEditing ? (
                        <Input
                          value={editData.street}
                          onChange={(e) => handleInputChange('street', e.target.value)}
                          className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="Enter street address"
                        />
                      ) : (
                        <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                          <p className="text-gray-900 font-medium">
                            {personalInfo.address.street || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* City */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-green-500" />
                          City
                        </label>
                        {isEditing ? (
                          <Input
                            value={editData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter city"
                          />
                        ) : (
                          <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                            <p className="text-gray-900 font-medium">
                              {personalInfo.address.city || 'N/A'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isEditing && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-green-600" />
                          Complete Address
                        </h4>
                        <p className="text-gray-900 leading-relaxed">
                          {personalInfo.address.street || 'N/A'}
                          {personalInfo.address.city && (
                            <>
                              <br />
                              {personalInfo.address.city}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-xl border border-green-100 text-center">
                    <p className="text-gray-500">No address information available</p>
                  </div>
                )}
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
              {personalInfo?.emergencyContact || isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Emergency Contact Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <User className="w-4 h-4 mr-2 text-red-500" />
                        Contact Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={editData.emergencyContactName}
                          onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                          className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
                          placeholder="Enter contact name"
                        />
                      ) : (
                        <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                          <p className="text-gray-900 font-medium">
                            {personalInfo.emergencyContact.name || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Emergency Contact Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-red-500" />
                        Contact Phone
                      </label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={editData.emergencyContactPhone}
                          onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                          className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
                          placeholder="Enter contact phone"
                        />
                      ) : (
                        <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                          <p className="text-gray-900 font-medium">
                            {personalInfo.emergencyContact.phone || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Relationship */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-red-500" />
                        Relationship
                      </label>
                      {isEditing ? (
                        <Select
                          value={editData.emergencyContactRelationship}
                          onValueChange={(value) => handleInputChange('emergencyContactRelationship', value)}
                        >
                          <SelectTrigger className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500">
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-4 bg-white rounded-xl border border-red-200 shadow-sm">
                          <p className="text-gray-900 font-medium capitalize">
                            {personalInfo?.emergencyContact?.relationship || 'N/A'}
                          </p>
                        </div>
                      )}
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
                        {personalInfo.emergencyContact.name || 'N/A'}
                      </p>
                      <p className="mb-2">
                        <strong>Relationship:</strong>{" "}
                        {personalInfo.emergencyContact.relationship
                          ? personalInfo.emergencyContact.relationship.charAt(0).toUpperCase() +
                            personalInfo.emergencyContact.relationship.slice(1)
                          : 'N/A'}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {personalInfo.emergencyContact.phone || 'N/A'}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-red-100 text-center">
                  <p className="text-gray-500">No emergency contact information available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                <KeyRound className="w-7 h-7 mr-4 text-gray-500" />
                Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <p className="text-gray-900 font-medium font-mono">**********</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Staff Password</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-red-600 mb-4 text-center">This is sensitive information. Do not share this password.</p>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          readOnly
                          value={staffData.password || "Not available"}
                          className="w-full p-3 pr-12 bg-gray-100 border border-gray-300 rounded-lg font-mono"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 px-4 text-gray-600 hover:text-gray-900"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
              {identification ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* National ID */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
                        National ID Number
                      </label>
                      <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
                        <p className="text-gray-900 font-medium font-mono">
                          {identification.nationalID || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {identification.nationalIDPhoto && (
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
                  )}
                </>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-purple-100 text-center">
                  <p className="text-gray-500">No identification information available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

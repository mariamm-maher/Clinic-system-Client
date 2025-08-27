import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStaffStore } from "../../../../stores/staffStore";
import { useState } from "react";
import { User, Mail, Phone, Camera, Key, Shield, Edit, Save, X } from "lucide-react";

export default function BasicInfoView({ staffData }) {
  const { updateStaffMember, isLoading, fetchStaffById } = useStaffStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setEditData({
      name: staffData?.user?.name || '',
      email: staffData?.user?.email || '',
      phone: staffData?.personalInfo?.phone || '',
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
        user: {
          name: editData.name,
          email: editData.email,
        },
        personalInfo: {
          phone: editData.phone,
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
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent flex items-center">
            <User className="w-8 h-8 mr-4 text-blue-600" />
            Basic Information
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-200 bg-blue-50"
            >
              Personal Details
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
                  {/* Full Name */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter full name"
                      />
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {staffData.user?.name || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {staffData.user?.email || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
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
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-gray-900 font-medium">
                          {staffData.personalInfo?.phone || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
                        staffData.isActive
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {staffData.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Last Login Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                 
                    <span className="text-gray-600">Account Created:</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {staffData.createdAt ? new Date(staffData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
               
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

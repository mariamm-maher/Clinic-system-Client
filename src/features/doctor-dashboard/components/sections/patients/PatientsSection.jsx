import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Heart,
  Activity,
  AlertTriangle,
  Eye,
  Edit,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";
import ModernBreadcrumb from "../../ModernBreadcrumb";

export default function PatientsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-22",
      condition: "Hypertension",
      status: "stable",
      avatar: "/api/placeholder/40/40",
      priority: "normal",
      insurance: "Blue Cross",
      bloodType: "O+",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 42,
      gender: "Male",
      phone: "+1 (555) 234-5678",
      email: "m.chen@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-25",
      condition: "Diabetes Type 2",
      status: "monitoring",
      avatar: "/api/placeholder/40/40",
      priority: "high",
      insurance: "Aetna",
      bloodType: "A+",
    },
    {
      id: 3,
      name: "Emma Davis",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 345-6789",
      email: "emma.davis@email.com",
      lastVisit: "2024-01-12",
      nextAppointment: "Today",
      condition: "Chest Pain Investigation",
      status: "critical",
      avatar: "/api/placeholder/40/40",
      priority: "urgent",
      insurance: "Medicare",
      bloodType: "B-",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "monitoring":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "stable":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "normal":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <ModernBreadcrumb />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            Patient Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage patient records and health information
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="text-center py-8 text-gray-500">
                <p>Patient registration form would go here</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Total Patients
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {patients.length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Critical</p>
                  <p className="text-3xl font-bold text-red-700">
                    {patients.filter((p) => p.status === "critical").length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">
                    Monitoring
                  </p>
                  <p className="text-3xl font-bold text-orange-700">
                    {patients.filter((p) => p.status === "monitoring").length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
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
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Stable</p>
                  <p className="text-3xl font-bold text-green-700">
                    {patients.filter((p) => p.status === "stable").length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Patients List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 ${getPriorityColor(
                        patient.priority
                      )} rounded-full border-2 border-white`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {patient.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {patient.age}y • {patient.gender}
                      </Badge>
                      <Badge
                        className={`text-xs border ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{patient.condition}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Next: {patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No patients found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

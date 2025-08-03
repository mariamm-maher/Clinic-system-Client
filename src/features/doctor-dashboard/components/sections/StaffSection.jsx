import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StaffSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const staff = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Cardiologist",
      department: "Cardiology",
      email: "sarah.mitchell@clinic.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      shift: "Morning (8:00 AM - 4:00 PM)",
      experience: "12 years",
      education: "MD from Harvard Medical School",
      specializations: ["Interventional Cardiology", "Heart Failure"],
      avatar: null,
      startDate: "2020-03-15",
      currentPatients: 45,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Nurse Jennifer Rodriguez",
      role: "Head Nurse",
      department: "Nursing",
      email: "jennifer.rodriguez@clinic.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      shift: "Day (7:00 AM - 7:00 PM)",
      experience: "8 years",
      education: "BSN from UCLA",
      specializations: ["Critical Care", "Patient Education"],
      avatar: null,
      startDate: "2018-06-01",
      currentPatients: 12,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Dr. Michael Thompson",
      role: "Emergency Physician",
      department: "Emergency",
      email: "michael.thompson@clinic.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      shift: "Night (6:00 PM - 6:00 AM)",
      experience: "15 years",
      education: "MD from Johns Hopkins",
      specializations: ["Trauma Care", "Critical Care"],
      avatar: null,
      startDate: "2016-09-10",
      currentPatients: 0,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Medical Assistant",
      department: "Administration",
      email: "lisa.chen@clinic.com",
      phone: "+1 (555) 321-0987",
      status: "active",
      shift: "Morning (8:00 AM - 4:00 PM)",
      experience: "5 years",
      education: "Certificate from Community College",
      specializations: ["Patient Care", "Administrative Tasks"],
      avatar: null,
      startDate: "2021-01-20",
      currentPatients: 8,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Dr. Robert Kim",
      role: "Radiologist",
      department: "Radiology",
      email: "robert.kim@clinic.com",
      phone: "+1 (555) 654-3210",
      status: "on-leave",
      shift: "Flexible",
      experience: "10 years",
      education: "MD from Stanford University",
      specializations: ["MRI", "CT Scans", "X-Ray Interpretation"],
      avatar: null,
      startDate: "2019-04-05",
      currentPatients: 0,
      rating: 4.8,
    },
    {
      id: 6,
      name: "Maria Gonzalez",
      role: "Receptionist",
      department: "Administration",
      email: "maria.gonzalez@clinic.com",
      phone: "+1 (555) 789-0123",
      status: "active",
      shift: "Morning (7:00 AM - 3:00 PM)",
      experience: "3 years",
      education: "High School + Customer Service Training",
      specializations: ["Patient Communication", "Appointment Scheduling"],
      avatar: null,
      startDate: "2022-08-15",
      currentPatients: 0,
      rating: 4.5,
    },
  ];

  const departments = [
    "Cardiology",
    "Nursing",
    "Emergency",
    "Administration",
    "Radiology",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "on-leave":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "inactive":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const activeStaff = staff.filter((s) => s.status === "active");
  const onLeaveStaff = staff.filter((s) => s.status === "on-leave");
  const doctorsStaff = staff.filter((s) => s.role.includes("Dr."));
  const nursingStaff = staff.filter(
    (s) => s.role.includes("Nurse") || s.role.includes("Assistant")
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
          <p className="text-gray-600">Manage clinic staff and team members</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Add Staff Member
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-blue-600">
                  {staff.length}
                </p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {activeStaff.length}
                </p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doctors</p>
                <p className="text-2xl font-bold text-purple-600">
                  {doctorsStaff.length}
                </p>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nursing Staff</p>
                <p className="text-2xl font-bold text-amber-600">
                  {nursingStaff.length}
                </p>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, role, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Staff ({staff.length})</TabsTrigger>
          <TabsTrigger value="doctors">
            Doctors ({doctorsStaff.length})
          </TabsTrigger>
          <TabsTrigger value="nursing">
            Nursing ({nursingStaff.length})
          </TabsTrigger>
          <TabsTrigger value="on-leave">
            On Leave ({onLeaveStaff.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredStaff.map((member) => (
              <Card
                key={member.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {member.name}
                          </h3>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              member.status
                            )}`}
                            variant="outline"
                          >
                            <span className="mr-1">
                              {getStatusIcon(member.status)}
                            </span>
                            {member.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Role:</span>{" "}
                            {member.role}
                          </div>
                          <div>
                            <span className="font-medium">Department:</span>{" "}
                            {member.department}
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span>{" "}
                            {member.experience}
                          </div>
                          <div>
                            <span className="font-medium">Rating:</span> ⭐{" "}
                            {member.rating}
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {member.email}
                          </div>
                          <div>
                            <span className="font-medium">Shift:</span>{" "}
                            {member.shift}
                          </div>
                        </div>

                        {member.currentPatients > 0 && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">
                              Current Patients:
                            </span>{" "}
                            {member.currentPatients}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </DialogTitle>
                            <DialogDescription>
                              Complete staff member information and details
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Professional Information */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Professional Information
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Role:
                                  </span>
                                  <p>{member.role}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Department:
                                  </span>
                                  <p>{member.department}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Experience:
                                  </span>
                                  <p>{member.experience}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Start Date:
                                  </span>
                                  <p>
                                    {new Date(
                                      member.startDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium text-gray-600">
                                    Education:
                                  </span>
                                  <p>{member.education}</p>
                                </div>
                              </div>
                            </div>

                            {/* Specializations */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Specializations
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {member.specializations.map((spec, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Contact & Schedule */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Contact & Schedule
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Email:
                                  </span>
                                  <p>{member.email}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Phone:
                                  </span>
                                  <p>{member.phone}</p>
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium text-gray-600">
                                    Work Shift:
                                  </span>
                                  <p>{member.shift}</p>
                                </div>
                              </div>
                            </div>

                            {/* Performance */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Performance
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Rating:
                                  </span>
                                  <p>⭐ {member.rating}/5.0</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    Current Patients:
                                  </span>
                                  <p>{member.currentPatients}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {doctorsStaff.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:shadow-md transition-shadow border-purple-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.role} • {doctor.department}
                      </p>
                      <p className="text-sm text-gray-500">
                        {doctor.experience} experience
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-purple-100 text-purple-800">
                        Doctor
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        ⭐ {doctor.rating}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nursing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {nursingStaff.map((nurse) => (
              <Card
                key={nurse.id}
                className="hover:shadow-md transition-shadow border-amber-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={nurse.avatar} />
                      <AvatarFallback className="bg-amber-100 text-amber-600">
                        {nurse.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {nurse.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {nurse.role} • {nurse.department}
                      </p>
                      <p className="text-sm text-gray-500">
                        {nurse.experience} experience
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-amber-100 text-amber-800">
                        Nursing
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        ⭐ {nurse.rating}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="on-leave" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {onLeaveStaff.map((member) => (
              <Card
                key={member.id}
                className="hover:shadow-md transition-shadow opacity-75"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-yellow-100 text-yellow-600">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {member.role} • {member.department}
                      </p>
                      <p className="text-sm text-gray-500">
                        Currently on leave
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      On Leave
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

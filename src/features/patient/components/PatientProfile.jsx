import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  Send,
  Phone,
  MapPin,
  Stethoscope,
  Activity,
  Heart,
  Thermometer,
  Weight,
  ArrowRight,
  ChevronRight,
  X,
} from "lucide-react";
import { LogoutButton } from "@/features/auth";

// Dummy data for patient profile
const patientData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  age: 28,
  address: "123 Main St, New York, NY 10001",
  profilePicture:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  bloodType: "O+",
  emergencyContact: {
    name: "John Johnson",
    phone: "+1 (555) 987-6543",
    relationship: "Spouse",
  },
};

// Dummy medical records
const medicalRecords = [
  {
    id: 1,
    date: "2024-07-15",
    type: "Annual Checkup",
    doctor: "Dr. Michael Chen",
    diagnosis: "Healthy - Normal vital signs",
    prescription: "Vitamin D supplement",
    notes: "Patient reports feeling well. Blood pressure normal.",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-06-20",
    type: "Blood Test",
    doctor: "Dr. Sarah Williams",
    diagnosis: "Slight iron deficiency",
    prescription: "Iron supplements, 65mg daily",
    notes: "Follow-up in 3 months for repeat blood work.",
    status: "completed",
  },
  {
    id: 3,
    date: "2024-05-10",
    type: "Consultation",
    doctor: "Dr. Michael Chen",
    diagnosis: "Seasonal allergies",
    prescription: "Antihistamine as needed",
    notes: "Symptoms improved with medication.",
    status: "completed",
  },
];

// Dummy appointment data
const pastAppointments = [
  {
    id: 1,
    date: "2024-07-15",
    time: "10:00 AM",
    doctor: "Dr. Michael Chen",
    type: "Annual Checkup",
    status: "completed",
    duration: "45 min",
  },
  {
    id: 2,
    date: "2024-06-20",
    time: "2:30 PM",
    doctor: "Dr. Sarah Williams",
    type: "Blood Test",
    status: "completed",
    duration: "30 min",
  },
  {
    id: 3,
    date: "2024-05-10",
    time: "11:15 AM",
    doctor: "Dr. Michael Chen",
    type: "Consultation",
    status: "completed",
    duration: "30 min",
  },
  {
    id: 4,
    date: "2024-04-22",
    time: "9:00 AM",
    doctor: "Dr. Emily Rodriguez",
    type: "Physical Therapy",
    status: "completed",
    duration: "60 min",
  },
];

// Dummy vital signs
const vitalSigns = {
  bloodPressure: "120/80",
  heartRate: "72 bpm",
  temperature: "98.6°F",
  weight: "145 lbs",
  height: "5'6\"",
  lastUpdated: "2024-07-15",
};

// Dummy chat messages
const initialMessages = [
  {
    id: 1,
    sender: "doctor",
    message: "Hello Sarah! How are you feeling today?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    doctorName: "Dr. Michael Chen",
  },
];

// Doctor responses for simulation
const doctorResponses = [
  "Thank you for reaching out. I'll review your message and get back to you shortly.",
  "Based on your symptoms, I recommend scheduling an appointment for a proper examination.",
  "Please continue taking your prescribed medication and monitor your symptoms.",
  "That's great to hear! Keep up with your current treatment plan.",
  "I understand your concern. Let me provide some guidance on this matter.",
  "Please make sure to follow the instructions we discussed during your last visit.",
  "If symptoms persist, please don't hesitate to schedule another appointment.",
];

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "patient",
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate doctor response
    setTimeout(() => {
      const randomResponse =
        doctorResponses[Math.floor(Math.random() * doctorResponses.length)];
      const doctorMessage = {
        id: messages.length + 2,
        sender: "doctor",
        message: randomResponse,
        timestamp: new Date(),
        doctorName: "Dr. Michael Chen",
      };
      setMessages((prev) => [...prev, doctorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {" "}
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Patient Profile
            </h1>
            <p className="text-gray-600">
              Manage your health information and appointments
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {/* Chat with Doctor Button */}
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Doctor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] h-[70vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                    Chat with Dr. Michael Chen
                  </DialogTitle>
                </DialogHeader>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "patient"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.sender === "patient"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-900 border"
                        } rounded-lg p-3 shadow-sm`}
                      >
                        {message.sender === "doctor" && (
                          <p className="text-xs text-blue-600 font-medium mb-1">
                            {message.doctorName}
                          </p>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "patient"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-900 border rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-blue-600 font-medium mb-1">
                          Dr. Michael Chen
                        </p>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="flex space-x-2 pt-4">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>{" "}
                </div>
              </DialogContent>
            </Dialog>

            {/* Logout Button */}
            <LogoutButton variant="outline" size="sm" />
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "records", label: "Medical Records", icon: FileText },
            { id: "appointments", label: "Appointments", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info Card - Always visible */}
          <Card className="lg:col-span-1 shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture and Basic Info */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 shadow-lg">
                  <AvatarImage
                    src={patientData.profilePicture}
                    alt={patientData.name}
                  />
                  <AvatarFallback className="text-lg font-bold bg-blue-100 text-blue-600">
                    {patientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-gray-900">
                  {patientData.name}
                </h3>
                <p className="text-gray-600">Age {patientData.age}</p>
                <Badge variant="outline" className="mt-2">
                  Blood Type: {patientData.bloodType}
                </Badge>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {patientData.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {patientData.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {patientData.address}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Vital Signs */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Latest Vital Signs
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">
                        Blood Pressure
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {vitalSigns.bloodPressure}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">
                        Heart Rate
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {vitalSigns.heartRate}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-orange-600 font-medium">
                        Temperature
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {vitalSigns.temperature}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Weight className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        Weight
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {vitalSigns.weight}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {formatDate(vitalSigns.lastUpdated)}
                </p>
              </div>

              <Separator />

              {/* Emergency Contact */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Emergency Contact
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {patientData.emergencyContact.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {patientData.emergencyContact.relationship}
                  </p>
                  <p className="text-xs text-gray-600">
                    {patientData.emergencyContact.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalRecords.slice(0, 3).map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {record.type}
                              </p>
                              <p className="text-sm text-gray-600">
                                with {record.doctor}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(record.date)}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Upcoming Appointments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No upcoming appointments</p>
                      <Button variant="outline" className="mt-4">
                        Schedule Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Medical Records Tab */}
            {activeTab === "records" && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Medical Records</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicalRecords.map((record) => (
                      <div
                        key={record.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs">
                              {record.type}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {formatDate(record.date)}
                            </span>
                          </div>
                          <Badge
                            variant={
                              record.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {record.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Doctor:{" "}
                            </span>
                            <span className="text-sm text-gray-600">
                              {record.doctor}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Diagnosis:{" "}
                            </span>
                            <span className="text-sm text-gray-600">
                              {record.diagnosis}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Prescription:{" "}
                            </span>
                            <span className="text-sm text-gray-600">
                              {record.prescription}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Notes:{" "}
                            </span>
                            <span className="text-sm text-gray-600">
                              {record.notes}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Past Appointments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Stethoscope className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.type}
                              </p>
                              <p className="text-sm text-gray-600">
                                with {appointment.doctor}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              Date:{" "}
                            </span>
                            <span className="text-gray-600">
                              {formatDate(appointment.date)}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Time:{" "}
                            </span>
                            <span className="text-gray-600">
                              {appointment.time}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Duration:{" "}
                            </span>
                            <span className="text-gray-600">
                              {appointment.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

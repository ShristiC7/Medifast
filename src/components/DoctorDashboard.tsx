import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  Bell, 
  Video, 
  Search, 
  Plus, 
  Settings, 
  Globe, 
  ChevronDown,
  Clock,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Upload,
  Download,
  Eye,
  TrendingUp,
  Award,
  Heart,
  Activity,
  BarChart3
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DoctorDashboardProps {
  onBack?: () => void;
}

export function DoctorDashboard({ onBack }: DoctorDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" }
  ];

  const upcomingAppointments = [
    {
      id: "1",
      patientName: "Rajesh Kumar",
      time: "10:30 AM",
      mode: "online",
      condition: "Hypertension Follow-up",
      avatar: "RK"
    },
    {
      id: "2", 
      patientName: "Priya Sharma",
      time: "11:15 AM",
      mode: "offline",
      condition: "Diabetes Consultation",
      avatar: "PS"
    },
    {
      id: "3",
      patientName: "Mohammad Ali",
      time: "12:00 PM",
      mode: "online",
      condition: "General Checkup",
      avatar: "MA"
    },
    {
      id: "4",
      patientName: "Sneha Patel",
      time: "2:30 PM", 
      mode: "offline",
      condition: "Skin Consultation",
      avatar: "SP"
    }
  ];

  const recentPatients = [
    {
      id: "1",
      name: "Amit Singh",
      lastVisit: "Dec 18, 2024",
      condition: "Hypertension",
      status: "Stable"
    },
    {
      id: "2",
      name: "Meera Joshi",
      lastVisit: "Dec 17, 2024", 
      condition: "Diabetes Type 2",
      status: "Improving"
    },
    {
      id: "3",
      name: "Vikram Rao",
      lastVisit: "Dec 16, 2024",
      condition: "Chest Pain",
      status: "Follow-up"
    }
  ];

  const notifications = [
    {
      id: "1",
      type: "appointment",
      message: "New appointment request from Rahul Gupta",
      time: "5 mins ago"
    },
    {
      id: "2",
      type: "message", 
      message: "Patient query: Medication side effects",
      time: "15 mins ago"
    },
    {
      id: "3",
      type: "prescription",
      message: "Prescription uploaded for Sunita Devi",
      time: "1 hour ago"
    }
  ];

  const todayStats = {
    appointments: 8,
    completed: 5,
    revenue: 4500,
    newPatients: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
              <Badge variant="outline" className="ml-2 text-xs">Doctor Portal</Badge>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-teal-600 font-medium">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Appointments</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Patients</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Prescriptions</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Payments</a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              {onBack && (
                <Button variant="outline" size="sm" onClick={onBack}>
                  Back
                </Button>
              )}
              
              {/* Language Selector */}
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-20 h-8 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1ODI1NzgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Welcome Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20 border-4 border-white/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1ODI1NzgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Good Morning, Dr. Rajesh Gupta</h1>
                    <p className="text-teal-100 mb-3">Cardiologist • 15 years experience</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        4.9 Rating
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Award className="w-3 h-3 mr-1" />
                        Apollo Hospital
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Users className="w-3 h-3 mr-1" />
                        2,450+ Patients
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Today's Schedule Mini Calendar */}
                <Card className="bg-white/10 border-white/20 text-white min-w-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">Dec 19</div>
                      <div className="text-sm text-teal-100 mb-3">Thursday</div>
                      <div className="text-lg font-semibold">{todayStats.appointments} Appointments</div>
                      <div className="text-sm text-teal-100">{todayStats.completed} Completed</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.appointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Patients</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.newPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-xl font-semibold text-gray-900">₹{todayStats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                  <p className="text-xl font-semibold text-gray-900">+23%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Slot
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{appointment.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{appointment.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{appointment.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={appointment.mode === "online" ? "default" : "secondary"}>
                              {appointment.mode === "online" ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <MapPin className="w-3 h-3 mr-1" />
                              )}
                              {appointment.mode}
                            </Badge>
                          </TableCell>
                          <TableCell>{appointment.condition}</TableCell>
                          <TableCell>
                            {appointment.mode === "online" ? (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Video className="w-4 h-4 mr-2" />
                                Start Video
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Records */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Patient Records</CardTitle>
                  <CardDescription>Quick access to recent patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search patients..." className="pl-10" />
                    </div>
                    
                    <div className="space-y-3">
                      {recentPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-500">{patient.condition}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{patient.lastVisit}</p>
                            <Badge variant={patient.status === "Stable" ? "default" : "secondary"} className="text-xs">
                              {patient.status}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Prescription Writer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Digital Prescription Writer</CardTitle>
                  <CardDescription>Create and manage digital prescriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-24 flex flex-col space-y-2">
                      <FileText className="w-8 h-8" />
                      <span>Create New Prescription</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col space-y-2">
                      <Upload className="w-8 h-8" />
                      <span>Upload Prescription</span>
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Prescriptions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Rajesh Kumar - Hypertension medication</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Priya Sharma - Diabetes medication</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Toggle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Availability Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {isOnline ? "Currently Online" : "Currently Offline"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isOnline ? "Available for consultations" : "Not accepting new patients"}
                      </p>
                    </div>
                    <Switch checked={isOnline} onCheckedChange={setIsOnline} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Badge variant="secondary">{notifications.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 border rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Add Languages
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Update Consultation Fees
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Earnings Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-teal-600">₹45,200</p>
                      <p className="text-sm text-gray-500">This Week</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today</span>
                        <span className="font-medium">₹{todayStats.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-medium">₹1,85,200</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-medium text-orange-600">₹12,500</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
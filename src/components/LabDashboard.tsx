import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  FlaskConical, 
  Upload, 
  Download, 
  DollarSign, 
  Bell, 
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
  Eye,
  TrendingUp,
  Award,
  Heart,
  Activity,
  FileText,
  Calendar,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Home,
  Building,
  Truck
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LabDashboardProps {
  onBack?: () => void;
}

export function LabDashboard({ onBack }: LabDashboardProps) {
  const [homeCollection, setHomeCollection] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" }
  ];

  const newBookings = [
    {
      id: "LAB001",
      patientName: "Rajesh Kumar",
      testType: "Complete Blood Count (CBC)",
      bookingTime: "10:30 AM",
      date: "Dec 19, 2024",
      status: "confirmed",
      type: "home_collection",
      amount: 299
    },
    {
      id: "LAB002", 
      patientName: "Priya Sharma",
      testType: "Lipid Profile",
      bookingTime: "11:15 AM", 
      date: "Dec 19, 2024",
      status: "sample_collected",
      type: "walk_in",
      amount: 599
    },
    {
      id: "LAB003",
      patientName: "Mohammad Ali",
      testType: "Thyroid Function Test",
      bookingTime: "12:00 PM",
      date: "Dec 19, 2024", 
      status: "pending",
      type: "home_collection",
      amount: 450
    }
  ];

  const reportsToUpload = [
    {
      id: "RPT001",
      patientName: "Anjali Patel",
      testType: "HbA1c",
      collectedDate: "Dec 17, 2024",
      status: "processing",
      priority: "normal"
    },
    {
      id: "RPT002",
      patientName: "Vikram Singh", 
      testType: "Liver Function Test",
      collectedDate: "Dec 16, 2024",
      status: "ready",
      priority: "urgent"
    },
    {
      id: "RPT003",
      patientName: "Sneha Patel",
      testType: "Kidney Function Test", 
      collectedDate: "Dec 18, 2024",
      status: "processing",
      priority: "normal"
    }
  ];

  const availableTests = [
    { name: "Complete Blood Count", price: 299, category: "Blood Tests" },
    { name: "Lipid Profile", price: 599, category: "Cardiac" },
    { name: "Thyroid Function", price: 450, category: "Hormone" },
    { name: "Liver Function", price: 650, category: "Organ Function" },
    { name: "HbA1c", price: 350, category: "Diabetes" }
  ];

  const todayStats = {
    newBookings: 15,
    samplesCollected: 23,
    reportsUploaded: 18,
    revenue: 12500
  };

  const labInfo = {
    name: "MediFast Diagnostics",
    address: "456 Health Avenue, Medical Complex",
    certification: "NABL Accredited",
    license: "DL-LAB-2024-005678",
    rating: 4.7,
    reviews: 856
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
              <Badge variant="outline" className="ml-2 text-xs">Lab Portal</Badge>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-teal-600 font-medium">Bookings</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Tests</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Reports</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Payments</a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
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
                  <AvatarFallback>LB</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Lab Info Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <FlaskConical className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{labInfo.name}</h1>
                    <p className="text-purple-100 mb-1">{labInfo.address}</p>
                    <p className="text-purple-100 mb-3">License: {labInfo.license}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Award className="w-3 h-3 mr-1" />
                        {labInfo.certification}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        {labInfo.rating} Rating
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Users className="w-3 h-3 mr-1" />
                        {labInfo.reviews}+ Reviews
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Home Collection Toggle */}
                <Card className="bg-white/10 border-white/20 text-white min-w-[200px]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Home Collection</span>
                      <Switch checked={homeCollection} onCheckedChange={setHomeCollection} />
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${homeCollection ? 'text-green-200' : 'text-red-200'}`}>
                        {homeCollection ? 'ENABLED' : 'DISABLED'}
                      </div>
                      <div className="text-sm text-purple-100">
                        {homeCollection ? 'Available for booking' : 'Walk-in only'}
                      </div>
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
                  <p className="text-sm text-gray-600">New Bookings</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.newBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Samples Collected</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.samplesCollected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reports Uploaded</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.reportsUploaded}</p>
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
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Test Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>New Test Bookings</span>
                    <Badge variant="secondary">{newBookings.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{booking.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{booking.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{booking.testType}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{booking.date}</p>
                              <p className="text-xs text-gray-500">{booking.bookingTime}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={booking.type === "home_collection" ? "default" : "secondary"}>
                              {booking.type === "home_collection" ? (
                                <Home className="w-3 h-3 mr-1" />
                              ) : (
                                <Building className="w-3 h-3 mr-1" />
                              )}
                              {booking.type === "home_collection" ? "Home" : "Walk-in"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                booking.status === "confirmed" ? "default" : 
                                booking.status === "sample_collected" ? "secondary" : 
                                "outline"
                              }
                            >
                              {booking.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">₹{booking.amount}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button size="sm">
                                {booking.status === "pending" ? "Confirm" : "Update"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upload Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Upload Digital Reports</CardTitle>
                  <CardDescription>Upload and manage test reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-medium text-gray-900 mb-1">Drag & Drop Reports</p>
                      <p className="text-sm text-gray-500">Or click to browse files</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Reports Ready to Upload</h4>
                      {reportsToUpload.map((report) => (
                        <div key={report.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{report.patientName}</p>
                              <p className="text-xs text-gray-500">{report.testType}</p>
                              <p className="text-xs text-gray-400">{report.collectedDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={report.priority === "urgent" ? "destructive" : "outline"} className="text-xs">
                                {report.priority}
                              </Badge>
                              <Button size="sm">
                                <Upload className="w-3 h-3 mr-1" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Test Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Test Management</CardTitle>
                  <CardDescription>Manage available tests and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search tests..." className="pl-10" />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Test
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {availableTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">{test.name}</p>
                          <p className="text-sm text-gray-600">{test.category}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-purple-600">₹{test.price}</span>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lab Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Lab Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{labInfo.rating}</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1,2,3,4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-600">{labInfo.reviews}+ patient reviews</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Report Accuracy</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Turnaround Time</span>
                      <span className="font-medium">6-8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sample Quality</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="w-4 h-4 mr-2" />
                      {homeCollection ? 'Disable' : 'Enable'} Home Collection
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Lab Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Manage Service Areas
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
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">₹85,400</p>
                      <p className="text-sm text-gray-500">This Week</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today</span>
                        <span className="font-medium">₹{todayStats.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-medium">₹3,25,600</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending Settlement</span>
                        <span className="font-medium text-orange-600">₹28,900</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Sample Collections</p>
                      <p className="text-gray-500">8 home visits scheduled</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Walk-in Appointments</p>
                      <p className="text-gray-500">12 patients expected</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Reports Due</p>
                      <p className="text-gray-500">15 reports to upload</p>
                    </div>
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
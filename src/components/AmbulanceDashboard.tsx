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
  Truck, 
  MapPin, 
  Navigation, 
  DollarSign, 
  Bell, 
  Search, 
  Plus, 
  Settings, 
  Globe, 
  ChevronDown,
  Clock,
  Star,
  Phone,
  MessageCircle,
  Eye,
  TrendingUp,
  Award,
  Heart,
  Activity,
  User,
  Calendar,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Timer,
  Target
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AmbulanceDashboardProps {
  onBack?: () => void;
}

export function AmbulanceDashboard({ onBack }: AmbulanceDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" }
  ];

  const activeRequests = [
    {
      id: "AMB001",
      patientName: "Rajesh Kumar",
      emergencyType: "Cardiac Emergency",
      pickupLocation: "123 MG Road, Bangalore",
      dropLocation: "Apollo Hospital, Bangalore",
      requestTime: "10:30 AM",
      distance: "8.5 km",
      eta: "12 mins",
      status: "assigned",
      serviceType: "ALS",
      priority: "critical"
    },
    {
      id: "AMB002", 
      patientName: "Priya Sharma",
      emergencyType: "Accident Case",
      pickupLocation: "456 Brigade Road, Bangalore",
      dropLocation: "Fortis Hospital, Bangalore", 
      requestTime: "11:15 AM",
      distance: "6.2 km",
      eta: "8 mins",
      status: "en_route",
      serviceType: "BLS",
      priority: "high"
    },
    {
      id: "AMB003",
      patientName: "Mohammad Ali",
      emergencyType: "General Emergency",
      pickupLocation: "789 Koramangala, Bangalore",
      dropLocation: "Manipal Hospital, Bangalore",
      requestTime: "12:00 PM", 
      distance: "4.1 km",
      eta: "6 mins",
      status: "new_request",
      serviceType: "BLS", 
      priority: "medium"
    }
  ];

  const fleetVehicles = [
    {
      id: "KA01AB1234",
      type: "BLS",
      driverName: "Suresh Kumar",
      driverPhone: "+91-9876543210",
      status: "available",
      location: "Koramangala",
      fuelLevel: 85,
      lastService: "Dec 10, 2024"
    },
    {
      id: "KA01AB5678",
      type: "ALS",
      driverName: "Ramesh Yadav", 
      driverPhone: "+91-9876543211",
      status: "on_trip",
      location: "En route to Apollo",
      fuelLevel: 62,
      lastService: "Dec 8, 2024"
    },
    {
      id: "KA01AB9012",
      type: "ICU",
      driverName: "Prakash Singh",
      driverPhone: "+91-9876543212", 
      status: "maintenance",
      location: "Service Center",
      fuelLevel: 95,
      lastService: "Dec 18, 2024"
    }
  ];

  const todayStats = {
    totalRequests: 24,
    completed: 18,
    revenue: 15600,
    avgResponseTime: "7 mins"
  };

  const fleetInfo = {
    name: "MediFast Emergency Services",
    address: "Emergency Services Hub, Medical District",
    license: "KA-AMB-2024-001234",
    fleetSize: 12,
    rating: 4.8,
    reviews: 2140
  };

  const serviceTypes = [
    { name: "Basic Life Support", code: "BLS", count: 5 },
    { name: "Advanced Life Support", code: "ALS", count: 4 },
    { name: "ICU Ambulance", code: "ICU", count: 2 },
    { name: "Neonatal", code: "NICU", count: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
              <Badge variant="outline" className="ml-2 text-xs">Ambulance Portal</Badge>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-teal-600 font-medium">Requests</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Vehicles</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Profile</a>
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

              {/* Emergency Hotline */}
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: 102
              </Button>

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Fleet Info Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{fleetInfo.name}</h1>
                    <p className="text-red-100 mb-1">{fleetInfo.address}</p>
                    <p className="text-red-100 mb-3">License: {fleetInfo.license}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Truck className="w-3 h-3 mr-1" />
                        {fleetInfo.fleetSize} Vehicles
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        {fleetInfo.rating} Rating
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Users className="w-3 h-3 mr-1" />
                        {fleetInfo.reviews}+ Rides
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Service Categories */}
                <div className="grid grid-cols-2 gap-2 min-w-[200px]">
                  {serviceTypes.map((service) => (
                    <Card key={service.code} className="bg-white/10 border-white/20 text-white">
                      <CardContent className="p-3 text-center">
                        <div className="text-lg font-bold">{service.count}</div>
                        <div className="text-xs text-red-100">{service.code}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.completed}</p>
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
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Timer className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.avgResponseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Emergency Requests</span>
                    <Badge variant="destructive">{activeRequests.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={
                                request.priority === "critical" ? "destructive" : 
                                request.priority === "high" ? "secondary" : 
                                "outline"
                              }
                            >
                              {request.priority}
                            </Badge>
                            <span className="font-medium text-gray-900">{request.patientName}</span>
                            <Badge variant="outline" className="text-xs">
                              {request.serviceType}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">{request.requestTime}</span>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">{request.emergencyType}</p>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>From: {request.pickupLocation}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>To: {request.dropLocation}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{request.distance}</span>
                            <span className="text-green-600 font-medium">ETA: {request.eta}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            {request.status === "new_request" ? (
                              <>
                                <Button size="sm" variant="outline">
                                  Decline
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Accept
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" variant="outline">
                                  <Navigation className="w-4 h-4 mr-2" />
                                  Navigate
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call Patient
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fleet Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Fleet Management</span>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Fuel</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fleetVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vehicle.id}</p>
                              <p className="text-sm text-gray-500">{vehicle.type} Ambulance</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vehicle.driverName}</p>
                              <p className="text-sm text-gray-500">{vehicle.driverPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                vehicle.status === "available" ? "default" : 
                                vehicle.status === "on_trip" ? "secondary" : 
                                "outline"
                              }
                            >
                              {vehicle.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>{vehicle.location}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                                vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}></div>
                              <span className="text-sm">{vehicle.fuelLevel}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Track
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Call
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {isOnline ? "Service Online" : "Service Offline"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isOnline ? "Accepting emergency requests" : "Not accepting new requests"}
                      </p>
                    </div>
                    <Switch checked={isOnline} onCheckedChange={setIsOnline} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-red-600 mb-1">{fleetInfo.rating}</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{fleetInfo.reviews}+ emergency rides</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-medium">{todayStats.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patient Satisfaction</span>
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
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Hotline: 102
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Fleet Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Service Areas
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Performance Analytics
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
                      <p className="text-2xl font-bold text-red-600">₹95,800</p>
                      <p className="text-sm text-gray-500">This Week</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today</span>
                        <span className="font-medium">₹{todayStats.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-medium">₹3,85,600</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending Settlement</span>
                        <span className="font-medium text-orange-600">₹42,800</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Map Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Live Fleet Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Navigation className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Live map view</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available vehicles</span>
                      <span className="font-medium text-green-600">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">On emergency calls</span>
                      <span className="font-medium text-orange-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In maintenance</span>
                      <span className="font-medium text-red-600">1</span>
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
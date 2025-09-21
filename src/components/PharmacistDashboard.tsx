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
  Pill, 
  Package, 
  Truck, 
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
  ShoppingCart,
  FileText,
  Tags,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PharmacistDashboardProps {
  onBack?: () => void;
}

export function PharmacistDashboard({ onBack }: PharmacistDashboardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" }
  ];

  const newOrders = [
    {
      id: "ORD001",
      patientName: "Rajesh Kumar",
      orderTime: "10:30 AM",
      medicines: ["Paracetamol 500mg", "Crocin Cold & Flu"],
      total: 285,
      status: "pending",
      prescription: true
    },
    {
      id: "ORD002", 
      patientName: "Priya Sharma",
      orderTime: "11:15 AM",
      medicines: ["Metformin 500mg", "Glimepiride 2mg"],
      total: 450,
      status: "confirmed",
      prescription: true
    },
    {
      id: "ORD003",
      patientName: "Mohammad Ali",
      orderTime: "12:00 PM",
      medicines: ["Vitamin D3", "Omega 3 Capsules"],
      total: 680,
      status: "preparing",
      prescription: false
    }
  ];

  const activeDeliveries = [
    {
      id: "DEL001",
      orderId: "ORD001",
      patientName: "Anjali Patel",
      riderName: "Suresh Kumar",
      riderPhone: "+91-9876543210",
      status: "picked_up",
      eta: "15 mins",
      location: "En route to delivery"
    },
    {
      id: "DEL002",
      orderId: "ORD002", 
      patientName: "Vikram Singh",
      riderName: "Ramesh Yadav",
      riderPhone: "+91-9876543211",
      status: "delivered",
      eta: "Delivered",
      location: "Delivered successfully"
    }
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", currentStock: 25, minStock: 50, urgency: "high" },
    { name: "Amoxicillin 250mg", currentStock: 8, minStock: 30, urgency: "critical" },
    { name: "Omeprazole 20mg", currentStock: 35, minStock: 40, urgency: "medium" }
  ];

  const todayStats = {
    newOrders: 12,
    completed: 28,
    revenue: 8500,
    deliveries: 15
  };

  const storeInfo = {
    name: "MediFast Pharmacy",
    license: "DL-PHM-2024-001234",
    address: "123 Health Street, Medical District",
    rating: 4.8,
    reviews: 1240
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
              <Badge variant="outline" className="ml-2 text-xs">Pharmacy Portal</Badge>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-teal-600 font-medium">Orders</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Inventory</a>
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

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>PH</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Store Info Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <Pill className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{storeInfo.name}</h1>
                    <p className="text-green-100 mb-1">License: {storeInfo.license}</p>
                    <p className="text-green-100 mb-3">{storeInfo.address}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        {storeInfo.rating} Rating
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Users className="w-3 h-3 mr-1" />
                        {storeInfo.reviews}+ Reviews
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Award className="w-3 h-3 mr-1" />
                        Verified Store
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Store Status */}
                <Card className="bg-white/10 border-white/20 text-white min-w-[180px]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Store Status</span>
                      <Switch checked={isOpen} onCheckedChange={setIsOpen} />
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${isOpen ? 'text-green-200' : 'text-red-200'}`}>
                        {isOpen ? 'OPEN' : 'CLOSED'}
                      </div>
                      <div className="text-sm text-green-100">
                        {isOpen ? 'Accepting Orders' : 'Not Accepting Orders'}
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
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Orders</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.newOrders}</p>
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
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deliveries</p>
                  <p className="text-xl font-semibold text-gray-900">{todayStats.deliveries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Orders Queue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>New Orders Queue</span>
                    <Badge variant="secondary">{newOrders.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant={order.status === "pending" ? "destructive" : order.status === "confirmed" ? "default" : "secondary"}>
                                {order.status}
                              </Badge>
                              <span className="font-medium text-gray-900">{order.patientName}</span>
                              <span className="text-sm text-gray-500">{order.orderTime}</span>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-1">Medicines:</p>
                              <div className="flex flex-wrap gap-1">
                                {order.medicines.map((medicine, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {medicine}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold text-teal-600">₹{order.total}</span>
                              {order.prescription && (
                                <Badge variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  Prescription Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                            <Button size="sm">
                              Accept Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Order Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Live Order Tracking</CardTitle>
                  <CardDescription>Track active deliveries in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeDeliveries.map((delivery) => (
                      <div key={delivery.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant={delivery.status === "delivered" ? "default" : "secondary"}>
                              {delivery.status === "picked_up" ? "En Route" : "Delivered"}
                            </Badge>
                            <span className="font-medium">{delivery.patientName}</span>
                          </div>
                          <span className="text-sm text-gray-500">Order #{delivery.orderId}</span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Delivery Partner</p>
                            <p className="font-medium">{delivery.riderName}</p>
                            <p className="text-sm text-gray-500">{delivery.riderPhone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <p className="font-medium">{delivery.location}</p>
                            <p className="text-sm text-teal-600">{delivery.eta}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Rider
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="w-4 h-4 mr-2" />
                            Track Live
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inventory Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Monitor and update medicine stock</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <Button className="h-20 flex flex-col space-y-2">
                      <Plus className="w-6 h-6" />
                      <span>Add New Medicine</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Package className="w-6 h-6" />
                      <span>Update Stock</span>
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                      Low Stock Alert
                    </h4>
                    <div className="space-y-3">
                      {lowStockItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Current: {item.currentStock} | Min Required: {item.minStock}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={item.urgency === "critical" ? "destructive" : item.urgency === "high" ? "secondary" : "outline"}>
                              {item.urgency}
                            </Badge>
                            <Button size="sm">Reorder</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Ratings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Store Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-teal-600 mb-1">{storeInfo.rating}</div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{storeInfo.reviews}+ customer reviews</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">5 stars</span>
                      <span className="font-medium">892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">4 stars</span>
                      <span className="font-medium">248</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">3 stars</span>
                      <span className="font-medium">78</span>
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
                      <Tags className="w-4 h-4 mr-2" />
                      Add Offers/Discounts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Store Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Delivery Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Sales Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payments Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payments & Settlement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">₹68,500</p>
                      <p className="text-sm text-gray-500">This Week</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today</span>
                        <span className="font-medium">₹{todayStats.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-medium">₹2,45,800</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending Settlement</span>
                        <span className="font-medium text-orange-600">₹18,200</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Order #ORD123 completed</p>
                      <p className="text-gray-500">2 mins ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">New review: 5 stars</p>
                      <p className="text-gray-500">15 mins ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Stock updated: Paracetamol</p>
                      <p className="text-gray-500">1 hour ago</p>
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
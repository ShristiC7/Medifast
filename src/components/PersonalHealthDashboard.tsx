import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  ArrowLeft, 
  Calendar, 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  Truck, 
  Brain,
  Activity,
  Apple,
  Heart,
  TrendingUp,
  Clock,
  User,
  Bell,
  Settings,
  Plus,
  Eye,
  Download,
  Share,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Phone,
  Video,
  ChevronRight
} from "lucide-react";

interface PersonalHealthDashboardProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function PersonalHealthDashboard({ onBack, onNavigate }: PersonalHealthDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const healthSummary = {
    lastCheckup: "Dec 15, 2024",
    nextAppointment: "Jan 5, 2025",
    activePrescriptions: 2,
    pendingReports: 1,
    healthScore: 85
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Rajesh Gupta",
      specialty: "Cardiologist",
      date: "Jan 5, 2025",
      time: "10:30 AM",
      type: "Follow-up",
      mode: "Online",
      hospital: "Apollo Hospital"
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma", 
      specialty: "Dermatologist",
      date: "Jan 8, 2025",
      time: "2:00 PM",
      type: "Consultation",
      mode: "Offline",
      hospital: "Max Hospital"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      doctor: "Dr. Rajesh Gupta",
      date: "Dec 18, 2024",
      medicines: ["Metoprolol 25mg", "Aspirin 75mg"],
      status: "Active",
      refillDate: "Jan 15, 2025"
    },
    {
      id: 2,
      doctor: "Dr. Anita Singh",
      date: "Dec 10, 2024", 
      medicines: ["Vitamin D3", "Calcium"],
      status: "Completed",
      refillDate: null
    }
  ];

  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count",
      date: "Dec 15, 2024",
      lab: "SRL Diagnostics",
      status: "Available",
      results: "Normal"
    },
    {
      id: 2,
      testName: "Lipid Profile",
      date: "Dec 12, 2024",
      lab: "Dr. Lal PathLabs",
      status: "Available", 
      results: "Attention needed"
    },
    {
      id: 3,
      testName: "HbA1c",
      date: "Dec 20, 2024",
      lab: "Metropolis Healthcare",
      status: "Processing",
      results: null
    }
  ];

  const vitalsData = {
    bloodPressure: { systolic: 120, diastolic: 80, status: "Normal", lastUpdated: "2 days ago" },
    heartRate: { value: 72, status: "Normal", lastUpdated: "2 days ago" },
    weight: { value: 68.5, unit: "kg", trend: "stable", lastUpdated: "1 week ago" },
    bloodSugar: { value: 95, unit: "mg/dL", status: "Normal", lastUpdated: "3 days ago" }
  };

  const activityStats = {
    steps: { today: 8500, goal: 10000 },
    calories: { burned: 320, goal: 400 },
    water: { consumed: 6, goal: 8 },
    sleep: { hours: 7.5, quality: "Good" }
  };

  const healthAlerts = [
    {
      id: 1,
      type: "reminder",
      title: "Prescription Refill Due",
      message: "Metoprolol refill needed by Jan 15",
      priority: "medium",
      action: "Order Medicine"
    },
    {
      id: 2,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Cardiology consultation in 2 days",
      priority: "high",
      action: "View Details"
    }
  ];

  const quickActions = [
    { name: "Book Doctor", icon: Stethoscope, action: () => onNavigate("doctors"), color: "blue" },
    { name: "Order Medicine", icon: Pill, action: () => onNavigate("medicine"), color: "green" },
    { name: "Lab Tests", icon: FlaskConical, action: () => onNavigate("lab"), color: "purple" },
    { name: "Emergency", icon: Truck, action: () => onNavigate("ambulance"), color: "red" },
    { name: "Mental Health", icon: Brain, action: () => onNavigate("mental"), color: "teal" },
    { name: "Wellness", icon: Activity, action: () => onNavigate("yoga"), color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Personal Health Dashboard</h1>
              <p className="text-gray-600">Your complete health overview and management center</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Report
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Health Score & Alerts */}
        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <CardTitle>Health Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - healthSummary.healthScore / 100)}`}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{healthSummary.healthScore}</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              <p className="text-sm text-gray-600 mt-2">Based on your recent data</p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Health Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.priority === "high" ? "bg-red-50 border-red-400" : 
                    alert.priority === "medium" ? "bg-yellow-50 border-yellow-400" : 
                    "bg-blue-50 border-blue-400"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                      <Button size="sm" variant="outline">{alert.action}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most used health services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="h-20 w-full flex flex-col space-y-2 hover:shadow-lg transition-shadow"
                    onClick={action.action}
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    <span className="text-xs">{action.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Activity</span>
                    <Button size="sm" variant="outline" onClick={() => onNavigate("wellness")}>
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Steps</p>
                        <p className="text-sm text-gray-500">{activityStats.steps.today} / {activityStats.steps.goal}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={(activityStats.steps.today / activityStats.steps.goal) * 100} className="w-20" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Calories Burned</p>
                        <p className="text-sm text-gray-500">{activityStats.calories.burned} / {activityStats.calories.goal}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={(activityStats.calories.burned / activityStats.calories.goal) * 100} className="w-20" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Apple className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Water Intake</p>
                        <p className="text-sm text-gray-500">{activityStats.water.consumed} / {activityStats.water.goal} glasses</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={(activityStats.water.consumed / activityStats.water.goal) * 100} className="w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Last Checkup</p>
                      <p className="font-semibold text-green-700">{healthSummary.lastCheckup}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Next Appointment</p>
                      <p className="font-semibold text-blue-700">{healthSummary.nextAppointment}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Active Prescriptions</p>
                      <p className="font-semibold text-purple-700">{healthSummary.activePrescriptions}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Pending Reports</p>
                      <p className="font-semibold text-orange-700">{healthSummary.pendingReports}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">Sleep Quality:</span>
                      <span className="font-semibold">{activityStats.sleep.quality}</span>
                      <span className="text-gray-500">({activityStats.sleep.hours} hours)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              <Button onClick={() => onNavigate("doctors")}>
                <Plus className="w-4 h-4 mr-2" />
                Book New Appointment
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-xs text-gray-500">{appointment.hospital}</p>
                        </div>
                      </div>
                      <Badge variant={appointment.mode === "Online" ? "default" : "secondary"}>
                        {appointment.mode}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        {appointment.type}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {appointment.mode === "Online" ? (
                        <Button size="sm" className="flex-1">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Prescriptions</h3>
              <Button onClick={() => onNavigate("medicine")}>
                <Plus className="w-4 h-4 mr-2" />
                Order Medicine
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Prescribed by {prescription.doctor}</h4>
                        <p className="text-sm text-gray-600">{prescription.date}</p>
                      </div>
                      <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                        {prescription.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Medicines:</p>
                      <div className="flex flex-wrap gap-2">
                        {prescription.medicines.map((medicine, index) => (
                          <Badge key={index} variant="outline">
                            {medicine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {prescription.refillDate && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Refill needed by: {prescription.refillDate}
                        </p>
                        <Button size="sm">
                          <Pill className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lab Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lab Reports</h3>
              <Button onClick={() => onNavigate("lab")}>
                <Plus className="w-4 h-4 mr-2" />
                Book Lab Test
              </Button>
            </div>
            
            <div className="space-y-4">
              {labReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.testName}</h4>
                        <p className="text-sm text-gray-600">{report.lab} • {report.date}</p>
                        {report.results && (
                          <div className="flex items-center mt-2">
                            {report.results === "Normal" ? (
                              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-orange-600 mr-1" />
                            )}
                            <span className={`text-sm ${
                              report.results === "Normal" ? "text-green-600" : "text-orange-600"
                            }`}>
                              {report.results}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant={report.status === "Available" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                        {report.status === "Available" && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Blood Pressure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {vitalsData.bloodPressure.systolic}/{vitalsData.bloodPressure.diastolic}
                    </p>
                    <p className="text-sm text-gray-600">mmHg</p>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      {vitalsData.bloodPressure.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      {vitalsData.bloodPressure.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Heart Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{vitalsData.heartRate.value}</p>
                    <p className="text-sm text-gray-600">bpm</p>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      {vitalsData.heartRate.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      {vitalsData.heartRate.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{vitalsData.weight.value}</p>
                    <p className="text-sm text-gray-600">{vitalsData.weight.unit}</p>
                    <Badge className="bg-blue-100 text-blue-800 mt-2">
                      {vitalsData.weight.trend}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      {vitalsData.weight.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Blood Sugar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{vitalsData.bloodSugar.value}</p>
                    <p className="text-sm text-gray-600">{vitalsData.bloodSugar.unit}</p>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      {vitalsData.bloodSugar.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      {vitalsData.bloodSugar.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Vitals</CardTitle>
                <CardDescription>Record your latest measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Heart className="w-6 h-6 text-red-600" />
                    <span className="text-sm">Blood Pressure</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">Heart Rate</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <span className="text-sm">Weight</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Apple className="w-6 h-6 text-orange-600" />
                    <span className="text-sm">Blood Sugar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
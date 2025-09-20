import { motion } from "framer-motion";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  Truck, 
  Heart,
  ArrowRight,
  Users,
  Building,
  Award,
  Globe
} from "lucide-react";

interface ProfessionalPortalProps {
  onSelectPortal: (portal: string) => void;
  onBack: () => void;
}

export function ProfessionalPortal({ onSelectPortal, onBack }: ProfessionalPortalProps) {
  const handlePortalSelect = useCallback((portalId: string) => {
    onSelectPortal(portalId);
  }, [onSelectPortal]);
  const portals = [
    {
      id: "doctor-dashboard",
      title: "Doctor Portal",
      description: "Manage appointments, patients, prescriptions, and consultations",
      icon: Stethoscope,
      features: ["Appointment Management", "Patient Records", "Digital Prescriptions", "Video Consultations"],
      color: "from-blue-600 to-teal-600",
      stats: "15,000+ Doctors"
    },
    {
      id: "pharmacist-dashboard", 
      title: "Pharmacist Portal",
      description: "Handle medicine orders, inventory, and customer support",
      icon: Pill,
      features: ["Order Management", "Inventory Control", "Live Tracking", "Customer Chat"],
      color: "from-green-600 to-emerald-600",
      stats: "3,200+ Pharmacies"
    },
    {
      id: "lab-dashboard",
      title: "Lab Portal", 
      description: "Manage test bookings, sample collection, and report uploads",
      icon: FlaskConical,
      features: ["Test Bookings", "Sample Collection", "Digital Reports", "Home Collection"],
      color: "from-purple-600 to-indigo-600",
      stats: "1,800+ Labs"
    },
    {
      id: "ambulance-dashboard",
      title: "Ambulance Portal",
      description: "Emergency response management and fleet coordination",
      icon: Truck,
      features: ["Emergency Requests", "Fleet Management", "Live Tracking", "Response Analytics"],
      color: "from-red-600 to-orange-600",
      stats: "850+ Providers"
    }
  ];

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
              <Badge variant="outline" className="ml-2 text-xs">Professional Portal</Badge>
            </div>
            
            <Button variant="outline" onClick={onBack}>
              Back to Main Site
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Portals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your professional portal to access specialized tools, manage your practice, 
            and connect with patients across the MediFast platform.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-teal-600" />
              <span>Trusted by 20,000+ Healthcare Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span>Available in 22 Indian Languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-teal-600" />
              <span>NABH & ISO Certified</span>
            </div>
          </div>
        </motion.div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${portal.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 bg-gradient-to-br ${portal.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <portal.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {portal.stats}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl text-gray-900 group-hover:text-teal-600 transition-colors">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {portal.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-gray-900">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {portal.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handlePortalSelect(portal.id)}
                    className={`w-full bg-gradient-to-r ${portal.color} hover:opacity-90 group-hover:shadow-lg transition-all duration-300`}
                  >
                    Access {portal.title}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Why Choose MediFast Professional Portals?</h2>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-3 text-teal-200" />
                    <h3 className="font-semibold mb-2">Unified Platform</h3>
                    <p className="text-sm text-teal-100">Single dashboard for all your professional needs</p>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 mx-auto mb-3 text-teal-200" />
                    <h3 className="font-semibold mb-2">Pan-India Reach</h3>
                    <p className="text-sm text-teal-100">Connect with patients across all Indian states</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 mx-auto mb-3 text-teal-200" />
                    <h3 className="font-semibold mb-2">Trusted & Secure</h3>
                    <p className="text-sm text-teal-100">HIPAA compliant with end-to-end encryption</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Need help getting started? Our support team is available 24/7
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              Contact Support
            </Button>
            <Button variant="outline">
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
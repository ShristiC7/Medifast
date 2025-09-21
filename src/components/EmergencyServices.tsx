import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Truck, 
  Heart,
  Zap,
  Shield,
  Activity,
  Navigation,
  Star,
  CheckCircle,
  AlertTriangle,
  Users,
  Stethoscope,
  Siren,
  Timer,
  Target
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EmergencyServicesProps {
  onBack: () => void;
}

export function EmergencyServices({ onBack }: EmergencyServicesProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isEmergencyCall, setIsEmergencyCall] = useState(false);
  const [requestStatus, setRequestStatus] = useState<"idle" | "requesting" | "confirmed" | "enroute">("idle");
  const [eta, setEta] = useState<number>(8);
  const [ambulanceDetails, setAmbulanceDetails] = useState({
    vehicleNumber: "HR-26-AB-1234",
    driverName: "Rajesh Kumar",
    driverPhone: "+91-9876543210",
    rating: 4.8
  });

  const emergencyTypes = [
    {
      id: "bls",
      name: "Basic Life Support (BLS)",
      description: "Standard ambulance with basic medical equipment",
      features: ["Oxygen Support", "First Aid", "Basic Monitoring", "Stretcher"],
      price: 800,
      eta: "5-8 mins",
      icon: Truck,
      available: true
    },
    {
      id: "als",
      name: "Advanced Life Support (ALS)",
      description: "Equipped with advanced medical equipment and paramedic",
      features: ["Ventilator", "Defibrillator", "Cardiac Monitor", "IV Fluids", "Trained Paramedic"],
      price: 1500,
      eta: "8-12 mins",
      icon: Heart,
      available: true
    },
    {
      id: "icu",
      name: "ICU Ambulance",
      description: "Mobile ICU with critical care equipment",
      features: ["Ventilator", "Cardiac Monitor", "Infusion Pumps", "Doctor on Board", "Life Support"],
      price: 2500,
      eta: "10-15 mins",
      icon: Activity,
      available: false
    },
    {
      id: "neonatal",
      name: "Neonatal Ambulance",
      description: "Specialized transport for newborns and infants",
      features: ["Incubator", "Infant Ventilator", "Temperature Control", "Neonatal Specialist"],
      price: 3000,
      eta: "12-18 mins",
      icon: Shield,
      available: true
    }
  ];

  const quickActions = [
    {
      title: "Call Emergency Hotline",
      subtitle: "24/7 Medical Emergency",
      number: "102",
      color: "from-red-500 to-red-600",
      icon: Phone
    },
    {
      title: "Police Emergency",
      subtitle: "Immediate Police Assistance",
      number: "100",
      color: "from-blue-500 to-blue-600",
      icon: Shield
    },
    {
      title: "Fire Emergency",
      subtitle: "Fire & Rescue Services",
      number: "101",
      color: "from-orange-500 to-orange-600",
      icon: Zap
    }
  ];

  const nearbyHospitals = [
    {
      name: "Apollo Hospital",
      distance: "2.3 km",
      rating: 4.8,
      specialties: ["Emergency", "Cardiac", "Trauma"],
      eta: "6 mins"
    },
    {
      name: "Max Super Speciality",
      distance: "3.1 km", 
      rating: 4.7,
      specialties: ["Emergency", "Neurology", "Orthopedic"],
      eta: "8 mins"
    },
    {
      name: "Fortis Hospital",
      distance: "4.2 km",
      rating: 4.6,
      specialties: ["Emergency", "Cardiology", "Oncology"],
      eta: "11 mins"
    }
  ];

  useEffect(() => {
    if (requestStatus === "enroute") {
      const interval = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [requestStatus]);

  const handleEmergencyCall = () => {
    setIsEmergencyCall(true);
    // Simulate emergency call
    setTimeout(() => {
      setIsEmergencyCall(false);
    }, 3000);
  };

  const handleAmbulanceRequest = () => {
    setRequestStatus("requesting");
    setTimeout(() => {
      setRequestStatus("confirmed");
      setTimeout(() => {
        setRequestStatus("enroute");
      }, 2000);
    }, 3000);
  };

  const renderStatusCard = () => {
    if (requestStatus === "idle") return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-x-4 top-20 z-50"
      >
        <Card className="bg-white shadow-2xl border-0">
          <CardContent className="p-6">
            {requestStatus === "requesting" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Finding Nearest Ambulance</h3>
                <p className="text-gray-600">Please wait while we locate the closest available ambulance...</p>
              </div>
            )}

            {requestStatus === "confirmed" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ambulance Confirmed!</h3>
                <p className="text-gray-600 mb-4">Your ambulance has been booked and is on the way.</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Vehicle:</span>
                    <p className="font-medium">{ambulanceDetails.vehicleNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Driver:</span>
                    <p className="font-medium">{ambulanceDetails.driverName}</p>
                  </div>
                </div>
              </div>
            )}

            {requestStatus === "enroute" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ambulance En Route</h3>
                      <p className="text-sm text-gray-600">{ambulanceDetails.vehicleNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{eta} min</div>
                    <div className="text-sm text-gray-500">ETA</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Driver</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ambulanceDetails.driverName}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{ambulanceDetails.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track Live
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 sticky top-0 z-40"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Emergency Services</h1>
              <p className="text-sm text-gray-600">24/7 medical emergency support</p>
            </div>
          </div>
          
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Activity className="w-3 h-3 mr-1" />
            24/7 Available
          </Badge>
        </div>
      </motion.div>

      {renderStatusCard()}

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Siren className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">Medical Emergency?</h2>
                  <p className="text-red-100 mb-4">If this is a life-threatening emergency, call immediately</p>
                  <Button 
                    onClick={handleEmergencyCall}
                    disabled={isEmergencyCall}
                    className="bg-white text-red-600 hover:bg-red-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {isEmergencyCall ? "Connecting..." : "Call Emergency - 102"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Emergency Contacts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.subtitle}</p>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{action.number}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ambulance Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Ambulance</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyTypes.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 h-full transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  selectedService === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                } ${!service.available ? 'opacity-60' : ''}`}
                onClick={() => service.available && setSelectedService(service.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        service.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={service.available ? "default" : "secondary"}>
                            {service.available ? "Available" : "Unavailable"}
                          </Badge>
                          <span className="text-sm text-gray-500">{service.eta}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">₹{service.price}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input id="pickup" placeholder="Enter pickup address" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination Hospital</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {nearbyHospitals.map((hospital, i) => (
                          <SelectItem key={i} value={hospital.name.toLowerCase()}>
                            {hospital.name} - {hospital.distance}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="emergency-details">Emergency Details (Optional)</Label>
                  <Textarea 
                    id="emergency-details"
                    placeholder="Brief description of the medical emergency..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleAmbulanceRequest}
                  disabled={requestStatus !== "idle"}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  {requestStatus === "idle" ? "Book Ambulance Now" : "Booking in Progress..."}
                </Button>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Nearby Hospitals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Hospitals</h2>
          <div className="space-y-4">
            {nearbyHospitals.map((hospital, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {hospital.distance}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {hospital.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {hospital.eta}
                          </div>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {hospital.specialties.map((specialty, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Emergency Response Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Before Ambulance Arrives:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Keep the patient calm and comfortable</li>
                  <li>• Do not move the patient unless necessary</li>
                  <li>• Keep airways clear</li>
                  <li>• Apply pressure to bleeding wounds</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Information to Provide:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Patient's age and medical conditions</li>
                  <li>• Current symptoms</li>
                  <li>• Medications being taken</li>
                  <li>• Any allergies</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
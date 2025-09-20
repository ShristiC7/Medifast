import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PulseLoader } from "./PulseLoader";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  ChevronLeft,
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby
} from "lucide-react";

interface DoctorSearchProps {
  onBack: () => void;
}

export function DoctorSearch({ onBack }: DoctorSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Simulate loading when search changes
  useEffect(() => {
    if (searchQuery || selectedSpecialty) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, selectedSpecialty]);

  const toggleFavorite = (doctorId: number) => {
    setFavorites(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const specialties = [
    { id: "all", name: "All", icon: Stethoscope },
    { id: "cardiology", name: "Cardiology", icon: Heart },
    { id: "neurology", name: "Neurology", icon: Brain },
    { id: "ophthalmology", name: "Eye Care", icon: Eye },
    { id: "orthopedics", name: "Orthopedics", icon: Bone },
    { id: "pediatrics", name: "Pediatrics", icon: Baby }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: 12,
      hospital: "Apollo Hospital",
      distance: "2.3 km",
      nextSlot: "Today 2:30 PM",
      fee: 500,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      rating: 4.9,
      experience: 15,
      hospital: "Max Hospital",
      distance: "1.8 km",
      nextSlot: "Tomorrow 10:00 AM",
      fee: 700,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      rating: 4.7,
      experience: 8,
      hospital: "Fortis Hospital",
      distance: "3.1 km",
      nextSlot: "Today 4:15 PM",
      fee: 400,
      image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      rating: 4.6,
      experience: 20,
      hospital: "AIIMS Hospital",
      distance: "4.2 km",
      nextSlot: "Tomorrow 2:00 PM",
      fee: 800,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || selectedSpecialty === "all" ||
                           doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 pt-12 pb-6 text-white relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.h1 
            className="text-xl font-medium ml-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Find Doctors
          </motion.h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            animate={searchQuery ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-5 h-5 text-gray-400" />
          </motion.div>
          <Input
            type="text"
            placeholder="Search doctors, specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl bg-white border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/30"
          />
          <motion.button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="px-6 -mt-3 space-y-6">
        {/* Specialty Filter Chips */}
        <motion.div 
          className="flex space-x-3 overflow-x-auto pb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {specialties.map((specialty, index) => (
            <motion.button
              key={specialty.id}
              onClick={() => setSelectedSpecialty(specialty.id === "all" ? "" : specialty.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-2xl whitespace-nowrap transition-all ${
                selectedSpecialty === specialty.id || (selectedSpecialty === "" && specialty.id === "all")
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={selectedSpecialty === specialty.id || (selectedSpecialty === "" && specialty.id === "all") ? 
                  { rotate: [0, 360] } : {}
                }
                transition={{ duration: 0.5 }}
              >
                <specialty.icon className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">{specialty.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Results Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.h3 
            className="font-medium text-gray-900"
            animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <PulseLoader size="sm" />
                <span>Searching...</span>
              </div>
            ) : (
              `${filteredDoctors.length} doctors available`
            )}
          </motion.h3>
          <motion.button 
            className="text-teal-600 hover:text-teal-700 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sort by rating
          </motion.button>
        </motion.div>

        {/* Doctor Cards */}
        <AnimatePresence>
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="p-4 shadow-md border-0 bg-white">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-20 mt-4" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    y: -2
                  }}
                >
                  <Card className="p-4 shadow-md border-0 bg-white cursor-pointer relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-50/50 to-transparent rounded-bl-3xl"
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    />
                    <div className="flex space-x-4">
                      <div className="relative">
                        <motion.img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <motion.div 
                          className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                          animate={{ 
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.4)",
                              "0 0 0 6px rgba(34, 197, 94, 0)",
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              onClick={() => toggleFavorite(doctor.id)}
                              className={`p-1 rounded-full transition-colors ${
                                favorites.includes(doctor.id) 
                                  ? "text-red-500" 
                                  : "text-gray-400 hover:text-red-500"
                              }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <motion.div
                                animate={favorites.includes(doctor.id) ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <Heart className={`w-4 h-4 ${
                                  favorites.includes(doctor.id) ? "fill-current" : ""
                                }`} />
                              </motion.div>
                            </motion.button>
                            <motion.div 
                              className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium text-yellow-700">{doctor.rating}</span>
                            </motion.div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Stethoscope className="w-4 h-4 mr-2" />
                            <span>{doctor.experience} years experience</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{doctor.hospital} • {doctor.distance}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Next available: {doctor.nextSlot}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900">₹{doctor.fee}</span>
                            <span className="text-sm text-gray-600 ml-1">consultation</span>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="px-6 h-9 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 relative overflow-hidden">
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                              />
                              <span className="relative z-10">Book</span>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>

        {/* Quick Book Emergency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-900">Emergency Consultation</h4>
                <p className="text-sm text-red-700">Available 24/7 for urgent care</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl">
                  Book Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
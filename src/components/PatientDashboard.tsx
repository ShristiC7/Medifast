import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AnimatedCounter } from "./AnimatedCounter";
import { PulseLoader } from "./PulseLoader";
import { 
  Calendar, 
  Pill, 
  Activity, 
  Ambulance, 
  Stethoscope, 
  TestTube, 
  Heart,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  Bell,
  RefreshCw
} from "lucide-react";

interface PatientDashboardProps {
  onNavigate: (screen: string) => void;
}

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveData, setLiveData] = useState({
    heartRate: 72,
    steps: 8420,
    calories: 1650
  });

  const nextAppointment = {
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Today",
    time: "2:30 PM",
    location: "Apollo Hospital"
  };

  const currentPrescriptions = 3;

  // Animate wellness score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setWellnessScore(78);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        heartRate: Math.max(60, Math.min(90, prev.heartRate + (Math.random() - 0.5) * 4)),
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 5)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const quickServices = [
    {
      id: "doctor",
      title: "Book Doctor",
      subtitle: "Find specialists",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
      screen: "doctors"
    },
    {
      id: "medicine",
      title: "Order Medicine",
      subtitle: "Upload prescription",
      icon: Pill,
      color: "from-green-500 to-green-600",
      screen: "medicine"
    },
    {
      id: "lab",
      title: "Lab Tests",
      subtitle: "Book & get reports",
      icon: TestTube,
      color: "from-purple-500 to-purple-600",
      screen: "lab"
    },
    {
      id: "ambulance",
      title: "Emergency",
      subtitle: "Call ambulance",
      icon: Ambulance,
      color: "from-red-500 to-red-600",
      screen: "ambulance"
    }
  ];

  const wellnessCards = [
    {
      title: "Mental Wellness",
      subtitle: "Mood & meditation",
      icon: Heart,
      value: "Good",
      color: "text-green-600",
      screen: "mental"
    },
    {
      title: "Fitness Goals",
      subtitle: "Daily activity",
      icon: Activity,
      value: "75%",
      color: "text-blue-600",
      screen: "yoga"
    },
    {
      title: "Nutrition",
      subtitle: "Today's intake",
      icon: TrendingUp,
      value: "1,650 cal",
      color: "text-orange-600",
      screen: "nutrition"
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 pt-12 pb-8 text-white relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />

        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div>
            <motion.h1 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {getGreeting()}
            </motion.h1>
            <motion.p 
              className="text-teal-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Alex Johnson
            </motion.p>
          </div>
          <motion.div className="flex space-x-2">
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <motion.button 
              onClick={() => onNavigate("notifications")}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors relative"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="w-6 h-6" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Wellness Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div>
                <h3 className="text-white font-medium">Wellness Score</h3>
                <motion.p 
                  className="text-teal-100"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {wellnessScore >= 75 ? "Excellent!" : wellnessScore >= 60 ? "Good progress!" : "Keep improving!"}
                </motion.p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={wellnessScore} duration={2} />
                </div>
                <div className="text-sm text-teal-100">out of 100</div>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              className="origin-left"
            >
              <Progress value={wellnessScore} className="bg-white/20" />
            </motion.div>
          </Card>
        </motion.div>

        {/* Live Health Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
            </motion.div>
            <div className="text-white font-medium">
              <AnimatedCounter value={Math.round(liveData.heartRate)} />
            </div>
            <div className="text-xs text-teal-100">BPM</div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
            <Activity className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-white font-medium">
              <AnimatedCounter value={Math.round(liveData.steps)} />
            </div>
            <div className="text-xs text-teal-100">Steps</div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
            <TrendingUp className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <div className="text-white font-medium">
              <AnimatedCounter value={Math.round(liveData.calories)} />
            </div>
            <div className="text-xs text-teal-100">Cal</div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="px-6 -mt-4 space-y-6">
        {/* Next Appointment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="p-4 shadow-lg border-0 bg-white relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Next Appointment</h3>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {nextAppointment.date}
                  </Badge>
                </motion.div>
              </div>
              <div className="flex items-start space-x-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Stethoscope className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{nextAppointment.doctor}</h4>
                  <p className="text-sm text-gray-600">{nextAppointment.specialty}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="mr-4">{nextAppointment.time}</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{nextAppointment.location}</span>
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">Quick Services</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.5 + index * 0.1, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="p-4 shadow-md border-0 bg-white cursor-pointer relative overflow-hidden"
                  onClick={() => onNavigate(service.screen)}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-3xl"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  />
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-3 relative z-10`}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h4 className="font-medium text-gray-900 relative z-10">{service.title}</h4>
                  <p className="text-sm text-gray-600 relative z-10">{service.subtitle}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Prescriptions */}
        <Card className="p-4 shadow-md border-0 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Active Prescriptions</h3>
            <Badge className="bg-green-100 text-green-700">
              {currentPrescriptions} active
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Metformin 500mg</p>
                  <p className="text-sm text-gray-600">Take with breakfast</p>
                </div>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Due now
              </Badge>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("medicine")}
                className="text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                View all prescriptions
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </Card>

        {/* Wellness Tracking */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Your Wellness</h3>
          <div className="grid grid-cols-1 gap-4">
            {wellnessCards.map((card, index) => (
              <Card
                key={index}
                className="p-4 shadow-md border-0 bg-white hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => onNavigate(card.screen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{card.title}</h4>
                      <p className="text-sm text-gray-600">{card.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${card.color}`}>{card.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
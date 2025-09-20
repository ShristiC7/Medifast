import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  Truck, 
  Brain, 
  Activity, 
  Apple, 
  BarChart3,
  Bell,
  Heart,
  User,
  Menu,
  X,
  Lock,
  Crown,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState, useMemo, useCallback, memo } from "react";

interface PostLoginHomepageProps {
  onNavigate: (screen: string) => void;
  userName?: string;
  isTempAccount?: boolean;
  onOpenRegisterModal?: () => void;
}

const PostLoginHomepage = memo(function PostLoginHomepage({ onNavigate, userName = "John", isTempAccount = false, onOpenRegisterModal = () => {} }: PostLoginHomepageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = useMemo(() => [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" }
  ], []);

  const quickActions = useMemo(() => [
    {
      icon: Stethoscope,
      title: "Book Doctor",
      description: "Find & book appointments",
      action: () => onNavigate("doctors"),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Pill,
      title: "Order Medicine",
      description: "Get medicines delivered",
      action: () => onNavigate("medicine"),
      color: "from-green-500 to-green-600"
    },
    {
      icon: FlaskConical,
      title: "Lab Tests",
      description: "Book home collection",
      action: () => onNavigate("lab"),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Truck,
      title: "Emergency",
      description: "Call ambulance now",
      action: () => onNavigate("ambulance"),
      color: "from-red-500 to-red-600"
    }
  ], [onNavigate]);

  const healthServices = useMemo(() => [
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Smart health analysis & insights",
      action: () => onNavigate("ai-symptom-checker"),
      premium: true // Requires full registration
    },
    {
      icon: Activity,
      title: "Yoga & Fitness",
      description: "Exercise tracking & routines",
      action: () => onNavigate("yoga")
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Diet planning & food scanner",
      action: () => onNavigate("nutrition")
    },
    {
      icon: BarChart3,
      title: "Health Dashboard",
      description: "Complete health overview",
      action: () => onNavigate("appointments"),
      premium: true // Requires full registration
    }
  ], [onNavigate]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((screen: string) => {
    onNavigate(screen);
    setIsMenuOpen(false);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MediFast</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["Dashboard", "Appointments", "Reports", "Support"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Dashboard") onNavigate("home");
                    if (item === "Appointments") onNavigate("appointments");
                    if (item === "Reports") onNavigate("wellness");
                    if (item === "Support") onNavigate("chat");
                  }}
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

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

              {/* Notification & Profile */}
              <div className="hidden md:flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate("notifications")}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate("profile")}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  {userName}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMenuToggle}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {["Dashboard", "Appointments", "Reports", "Support"].map((item) => (
                <button 
                  key={item} 
                  onClick={() => handleNavClick(
                    item === "Dashboard" ? "home" :
                    item === "Appointments" ? "appointments" :
                    item === "Reports" ? "wellness" : "chat"
                  )}
                  className="block w-full text-left text-gray-700 hover:text-teal-600 py-2"
                >
                  {item}
                </button>
              ))}
              <div className="flex space-x-3 pt-3 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleNavClick("notifications")}
                  className="flex-1"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavClick("profile")}
                  className="flex-1"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Welcome Section */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">{userName}!</span>
            </h1>
            <p className="text-xl text-gray-600">
              Your personalized healthcare dashboard is ready. What would you like to do today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className="p-6 h-full bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 shadow-md"
                  onClick={action.action}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Health Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Health & Wellness Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthServices.map((service, index) => {
                const isPremiumLocked = service.premium && isTempAccount;
                return (
                  <Card 
                    key={index}
                    className={`p-6 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 shadow-sm relative ${
                      isPremiumLocked ? 'opacity-75' : ''
                    }`}
                    onClick={isPremiumLocked ? onOpenRegisterModal : service.action}
                  >
                    {/* Premium Badge */}
                    {isPremiumLocked && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-amber-100 border border-amber-200 rounded-full p-1">
                          <Lock className="w-3 h-3 text-amber-600" />
                        </div>
                      </div>
                    )}
                    
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {service.title}
                      {isPremiumLocked && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Premium</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isPremiumLocked 
                        ? "Complete registration to unlock personalized health features"
                        : service.description
                      }
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* MediFast Plus Subscription Promotion */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden relative"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <h2 className="text-3xl font-bold">MediFast Plus</h2>
                  </div>
                  <p className="text-purple-100 text-lg">
                    Unlock premium healthcare benefits with exclusive savings
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-2">15% Cashback</h4>
                    <p className="text-purple-100 text-sm">On all medicine orders</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-red-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Free Health Test</h4>
                    <p className="text-purple-100 text-sm">Worth ₹499 included</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-2">24/7 Doctor Access</h4>
                    <p className="text-purple-100 text-sm">Unlimited consultations</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl font-bold">Starting at ₹250/month</span>
                    <span className="ml-2 text-purple-200 line-through">₹500</span>
                    <span className="ml-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm font-semibold">50% OFF</span>
                  </div>
                  <Button 
                    onClick={() => onNavigate("subscription")}
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl text-lg"
                  >
                    Join MediFast Plus
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Your Health Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-teal-100">Consultations</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8.5/10</div>
                <div className="text-teal-100">Health Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">45</div>
                <div className="text-teal-100">Days Active</div>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate("appointments")}
              className="mt-6 bg-white text-teal-700 hover:bg-gray-100"
            >
              View Detailed Reports
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
});

export { PostLoginHomepage };
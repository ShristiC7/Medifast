import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import doctorsGroupImage from 'figma:asset/95d0627d88fcccfb3ec2487f3ba37b2533e53b64.png';
import {
  Stethoscope,
  Pill,
  FlaskConical,
  Truck,
  Brain,
  Activity,
  Apple,
  BarChart3,
  Search,
  MapPin,
  Clock,
  Star,
  Upload,
  MessageCircle,
  CreditCard,
  MapIcon,
  Calendar,
  FileText,
  Phone,
  Zap,
  Globe,
  Heart,
  Target,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface HomepageProps {
  onLogin: () => void;
  onRegister: () => void;
  onProfessionalPortal?: () => void;
  onNavigateToFeature?: (featureType: string) => void;
}

export function Homepage({
  onLogin,
  onRegister,
  onProfessionalPortal,
  onNavigateToFeature,
}: HomepageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "as", name: "অসমীয়া" },
    { code: "ur", name: "اردو" },
    { code: "sa", name: "संस्कृत" },
    { code: "ne", name: "नेपाली" },
    { code: "sd", name: "سنڌي" },
    { code: "ks", name: "कश्मीरी" },
    { code: "doi", name: "डोगरी" },
    { code: "mni", name: "মণিপুরী" },
    { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ" },
    { code: "kok", name: "कोंकणी" },
    { code: "mai", name: "मैथिली" },
  ];

  const mainFeatures = [
    {
      icon: Stethoscope,
      title: "Doctor Appointment Booking",
      description:
        "Search & filter doctors by specialization, rating, location with real-time slot booking.",
      features: [
        "Real-time slot booking",
        "Online/offline consult",
        "Video consultation",
        "Doctor ratings & reviews",
      ],
      featureType: "doctors",
    },
    {
      icon: Pill,
      title: "Medicine Ordering & Delivery",
      description:
        "Order medicines with prescription upload, pharmacy chat, and live tracking.",
      features: [
        "Pharmacy locator",
        "Prescription upload",
        "Chat with pharmacist",
        "Live order tracking",
      ],
      featureType: "medicine",
    },
    {
      icon: FlaskConical,
      title: "Lab Test Booking",
      description:
        "Book lab tests with home collection and digital report management.",
      features: [
        "Home sample collection",
        "Digital reports",
        "Test price comparison",
        "Health packages",
      ],
      featureType: "lab",
    },
    {
      icon: Truck,
      title: "Ambulance Booking",
      description:
        "On-demand ambulance with real-time tracking and emergency support.",
      features: [
        "Real-time tracking",
        "Multiple categories",
        "Emergency call",
        "ETA updates",
      ],
      featureType: "ambulance",
    },
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: "22 Indian Languages",
      description:
        "Complete multilingual support for accessible healthcare across India.",
    },
    {
      icon: Brain,
      title: "Mental Health Support",
      description:
        "Psychology support, mood tracking, and self-help resources for mental wellness.",
    },
    {
      icon: Activity,
      title: "Yoga & Exercise Tracking",
      description:
        "Activity logging, daily routines, and fitness notifications for active lifestyle.",
    },
    {
      icon: Apple,
      title: "Diet & Nutrition Scanner",
      description:
        "Log eating habits, scan food, get calorie suggestions and nutritional insights.",
    },
    {
      icon: BarChart3,
      title: "Personal Health Dashboard",
      description:
        "Comprehensive view of vitals, appointments, prescriptions, and health analytics.",
    },
    {
      icon: Zap,
      title: "AI Symptom Checker",
      description:
        "Smart symptom analysis powered by machine learning for preliminary health insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                MediFast
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                "Home",
                "Features",
                "Services",
                "About",
                "Contact",
              ].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.4,
                  }}
                  href="#"
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-20 h-8 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem
                        key={lang.code}
                        value={lang.code}
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden md:flex items-center space-x-3"
              >
                {onProfessionalPortal && (
                  <Button
                    variant="outline"
                    onClick={onProfessionalPortal}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Professional Portal
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={onLogin}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Login
                </Button>
                <Button
                  onClick={onRegister}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                >
                  Register
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {[
                "Home",
                "Features",
                "Services",
                "About",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-gray-700 hover:text-teal-600 py-2"
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-3 pt-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={onLogin}
                  className="flex-1"
                >
                  Login
                </Button>
                <Button onClick={onRegister} className="flex-1">
                  Register
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6"
              >
                <Zap className="w-4 h-4 mr-2" />
                Your Personal Health Companion
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                Complete Healthcare
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  {" "}
                  Platform
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Access doctors, medicines, lab tests, emergency
                services, and wellness tracking - all in one
                trusted platform designed for every Indian
                family.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={onRegister}
                  className="px-8 py-4 text-lg bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span className="text-sm text-gray-600">
                    100% Secure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <span className="text-sm text-gray-600">
                    22 Languages
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <span className="text-sm text-gray-600">
                    24/7 Support
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div className="relative z-10">
                <ImageWithFallback
                  src={doctorsGroupImage}
                  alt="Team of diverse healthcare professionals and doctors"
                  className="w-full h-96 object-contain shadow-2xl px-[30px] py-[20px] mx-[30px] rounded-tl-[80px] rounded-tr-[100px] rounded-bl-[150px] rounded-br-[40px]"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-green-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      50K+ Appointments
                    </p>
                    <p className="text-xs text-gray-500">
                      This month
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      4.9/5 Rating
                    </p>
                    <p className="text-xs text-gray-500">
                      From 10K+ users
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for your family's health, from
              consultations to emergency care, all available at
              your fingertips with trusted professionals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="mt-6 border-teal-200 text-teal-700 hover:bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300"
                        onClick={() => onNavigateToFeature?.(feature.featureType)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              More Ways We Care For You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond basic healthcare, we provide comprehensive
              wellness solutions to keep you and your family
              healthy, happy, and informed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Health Journey?
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Join thousands of families who trust us with their
              healthcare needs. Get started today and experience
              the future of healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onRegister}
                className="px-8 py-4 text-lg bg-white text-teal-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Free Account
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-teal-700"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">
MediFast                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in health and wellness,
                providing comprehensive healthcare solutions for
                every Indian family.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Doctor Consultations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Medicine Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Lab Tests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Emergency Care
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 MediFast. All rights reserved. Made
              with ❤️ for India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
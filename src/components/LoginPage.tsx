import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SignIn, 
  SignUp, 
  useAuth, 
  useUser,
  RedirectToSignIn,
  RedirectToSignUp
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { 
  Heart, 
  ArrowLeft,
  Stethoscope,
  Pill,
  Truck,
  User
} from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onSignup?: () => void;
  onSignupComplete?: () => void;
  onBack: () => void;
  isSignupMode?: boolean;
}

export function LoginPage({ onLogin, onSignup, onSignupComplete, onBack, isSignupMode = false }: LoginPageProps) {
  const [userType, setUserType] = useState<string>("patient");
  const [showClerkAuth, setShowClerkAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  const userTypes = [
    { value: "patient", label: "Patient", icon: User },
    { value: "doctor", label: "Doctor", icon: Stethoscope },
    { value: "pharmacist", label: "Pharmacist", icon: Pill },
    { value: "ambulance", label: "Ambulance Driver", icon: Truck }
  ];

  // Handle successful authentication
  const handleAuthSuccess = () => {
    // Store user type in user metadata
    if (user) {
      user.update({
        publicMetadata: {
          userType: userType
        }
      });
    }
    
    if (authMode === "signup" && onSignupComplete) {
      onSignupComplete();
    } else {
      onLogin();
    }
  };

  // Custom Clerk appearance configuration
  const clerkAppearance = {
    baseTheme: "light",
    variables: {
      colorPrimary: "#0891b2", // teal-600
      colorBackground: "rgba(255, 255, 255, 0.9)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      borderRadius: "0.5rem"
    },
    elements: {
      card: "shadow-2xl border-0 bg-white/90 backdrop-blur-md",
      headerTitle: "text-2xl font-bold text-gray-900",
      headerSubtitle: "text-gray-600",
      socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
      formButtonPrimary: "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700",
      footerActionLink: "text-teal-600 hover:text-teal-700"
    }
  };

  // If user is already signed in, redirect to main app
  if (isSignedIn && !showClerkAuth) {
    handleAuthSuccess();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-3 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">MediFast</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              Welcome Back to Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Health Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Access your personalized healthcare dashboard, manage appointments, 
              track your wellness, and connect with trusted medical professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU4MTc3ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical technology and digital health"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-teal-100"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">98%</p>
                  <p className="text-xs text-gray-500">User Satisfaction</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">24/7</p>
                  <p className="text-xs text-gray-500">Support Available</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          {!showClerkAuth ? (
            // Pre-auth user type selection
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0">
              <CardHeader className="text-center pb-6">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onBack}
                  className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {isSignupMode ? "Create Account" : "Welcome Back"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {isSignupMode 
                      ? "Join MediFast to start your health journey" 
                      : "Sign in to your account to continue"
                    }
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="space-y-4"
                >
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Continue Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={() => {
                        setAuthMode("signin");
                        setShowClerkAuth(true);
                      }}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                    >
                      Sign In
                    </Button>

                    <Button 
                      variant="outline"
                      onClick={() => {
                        setAuthMode("signup");
                        setShowClerkAuth(true);
                      }}
                      className="w-full border-gray-300 hover:bg-gray-50"
                    >
                      Create New Account
                    </Button>
                  </div>
                </motion.div>

                {/* Terms */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-xs text-gray-500 text-center leading-relaxed"
                >
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-teal-600 hover:text-teal-700">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-teal-600 hover:text-teal-700">Privacy Policy</a>
                </motion.p>
              </CardContent>
            </Card>
          ) : (
            // Clerk Auth Components
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Back button overlay */}
              <button
                onClick={() => setShowClerkAuth(false)}
                className="absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors bg-white/80"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Type Badge */}
              <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const selectedType = userTypes.find(type => type.value === userType);
                    const IconComponent = selectedType?.icon || User;
                    return (
                      <>
                        <IconComponent className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">{selectedType?.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {authMode === "signin" ? (
                <SignIn
                  appearance={clerkAppearance}
                  afterSignInUrl="/dashboard"
                  signUpUrl="#"
                  redirectUrl="/dashboard"
                  afterSignIn={handleAuthSuccess}
                />
              ) : (
                <SignUp
                  appearance={clerkAppearance}
                  afterSignUpUrl="/dashboard"
                  signInUrl="#"
                  redirectUrl="/dashboard"
                  afterSignUp={handleAuthSuccess}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

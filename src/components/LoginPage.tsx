import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Stethoscope,
  Pill,
  Truck,
  User
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onLogin: () => void;
  onSignup?: () => void;
  onSignupComplete?: () => void;
  onBack: () => void;
  isSignupMode?: boolean;
}

export function LoginPage({ onLogin, onSignup, onSignupComplete, onBack, isSignupMode = false }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [userType, setUserType] = useState<string>("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLogin();
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    if (isSignupMode && onSignupComplete) {
      onSignupComplete();
    } else {
      onLogin();
    }
  };

  const handleSimpleSignup = async () => {
    setIsLoading(true);
    // Simulate signup API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    if (onSignupComplete) {
      onSignupComplete();
    }
  };

  const userTypes = [
    { value: "patient", label: "Patient", icon: User },
    { value: "doctor", label: "Doctor", icon: Stethoscope },
    { value: "pharmacist", label: "Pharmacist", icon: Pill },
    { value: "ambulance", label: "Ambulance Driver", icon: Truck }
  ];

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
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU4MTc3ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
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
                  {isSignupMode ? "Join MediFast to start your health journey" : "Sign in to your account to continue"}
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Tabs defaultValue={isSignupMode ? "signup" : "signin"} className="w-full">
                  {!isSignupMode && (
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                  )}

                  <TabsContent value="signin" className="space-y-4">
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

                    {/* Login Method Toggle */}
                    <div className="flex rounded-lg bg-gray-100 p-1">
                      <button
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
                          loginMethod === "email"
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </button>
                      <button
                        onClick={() => setLoginMethod("phone")}
                        className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
                          loginMethod === "phone"
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone
                      </button>
                    </div>

                    {/* Email/Phone Input */}
                    <div className="space-y-2">
                      <Label htmlFor="login-input">
                        {loginMethod === "email" ? "Email Address" : "Phone Number"}
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-input"
                          type={loginMethod === "email" ? "email" : "tel"}
                          placeholder={
                            loginMethod === "email" 
                              ? "Enter your email" 
                              : "Enter your phone number"
                          }
                          className="pl-10"
                        />
                        {loginMethod === "email" ? (
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        ) : (
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Password Input */}
                    {loginMethod === "email" && (
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                          />
                          <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Sign In Button */}
                    <Button 
                      onClick={handleLogin}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                    >
                      {isLoading ? "Signing in..." : 
                       loginMethod === "email" ? "Sign In" : "Send OTP"}
                    </Button>

                    {loginMethod === "email" && (
                      <div className="text-center">
                        <button className="text-sm text-teal-600 hover:text-teal-700">
                          Forgot your password?
                        </button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    {isSignupMode ? (
                      // Simple Signup Form
                      <>
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

                        {/* Signup Method Toggle */}
                        <div className="flex rounded-lg bg-gray-100 p-1">
                          <button
                            onClick={() => setLoginMethod("email")}
                            className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
                              loginMethod === "email"
                                ? "bg-white shadow-sm text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email
                          </button>
                          <button
                            onClick={() => setLoginMethod("phone")}
                            className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
                              loginMethod === "phone"
                                ? "bg-white shadow-sm text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            <Phone className="w-4 h-4 inline mr-2" />
                            Phone
                          </button>
                        </div>

                        {/* Email/Phone Input */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-input">
                            {loginMethod === "email" ? "Email Address" : "Phone Number"}
                          </Label>
                          <div className="relative">
                            <Input
                              id="signup-input"
                              type={loginMethod === "email" ? "email" : "tel"}
                              placeholder={
                                loginMethod === "email" 
                                  ? "Enter your email" 
                                  : "Enter your phone number"
                              }
                              className="pl-10"
                              value={loginMethod === "email" ? signupData.email : signupData.phone}
                              onChange={(e) => setSignupData(prev => ({
                                ...prev,
                                [loginMethod]: e.target.value
                              }))}
                            />
                            {loginMethod === "email" ? (
                              <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            ) : (
                              <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {/* Password Input for Email Signup */}
                        {loginMethod === "email" && (
                          <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <div className="relative">
                              <Input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pl-10 pr-10"
                                value={signupData.password}
                                onChange={(e) => setSignupData(prev => ({
                                  ...prev,
                                  password: e.target.value
                                }))}
                              />
                              <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Sign Up Button */}
                        <Button 
                          onClick={handleSimpleSignup}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                        >
                          {isLoading ? "Creating account..." : 
                           loginMethod === "email" ? "Create Account" : "Send OTP"}
                        </Button>

                        {/* Switch to Login */}
                        <div className="text-center">
                          <span className="text-sm text-gray-600">Already have an account? </span>
                          <button 
                            onClick={onBack}
                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Sign in here
                          </button>
                        </div>
                      </>
                    ) : (
                      // Original signup redirect
                      <div className="text-center py-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Create New Account
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Join thousands of users who trust us with their healthcare
                        </p>
                        <Button 
                          onClick={onSignup}
                          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                        >
                          Start Registration
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </motion.div>

              {/* Google Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full border-gray-300 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </motion.div>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-xs text-gray-500 text-center leading-relaxed"
              >
                By continuing, you agree to our{" "}
                <a href="#" className="text-teal-600 hover:text-teal-700">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-teal-600 hover:text-teal-700">Privacy Policy</a>
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
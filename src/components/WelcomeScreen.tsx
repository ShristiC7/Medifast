import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, Phone, Mail, Eye, EyeOff } from "lucide-react";

interface WelcomeScreenProps {
  onLogin: () => void;
}

export function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-4 rounded-3xl">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MediFast</h1>
        <p className="text-gray-600 px-8">Your complete wellness companion</p>
      </div>

      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-3xl p-8 mb-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Heart className="w-12 h-12 text-teal-600" />
            </div>
            <p className="text-gray-700">Book doctors, order medicines, track wellness - all in one app</p>
          </div>

          {/* Login/Signup Form */}
          <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-gray-600">
                {isLogin ? "Sign in to continue" : "Create your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              )}
              
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-12 pl-11 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 pl-11 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="h-12 pr-11 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <Button 
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                {isLogin ? "New user? Create account" : "Already have an account? Sign in"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <button className="text-gray-600 hover:text-gray-700">
                  Forgot Password?
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
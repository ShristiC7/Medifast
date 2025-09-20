import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Upload, 
  FileText,
  CheckCircle,
  AlertCircle,
  Pill,
  Shield
} from "lucide-react";

interface RegistrationFormProps {
  onComplete: () => void;
  onBack: () => void;
  isAfterSimpleSignup?: boolean;
  isModal?: boolean;
}

export function RegistrationForm({ onComplete, onBack, isAfterSimpleSignup = false, isModal = false }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    nationality: "Indian",
    
    // Step 2: Medical Details
    bloodGroup: "",
    conditions: [] as string[],
    medications: "",
    allergies: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Step 3: Documents
    profilePhoto: null as File | null,
    reports: [] as File[],
    
    // Terms
    agreeTerms: false,
    agreePrivacy: false
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate registration API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onComplete();
  };

  const medicalConditions = [
    "Diabetes", "Hypertension", "Heart Disease", "Asthma", "Arthritis",
    "Thyroid", "Kidney Disease", "Liver Disease", "Cancer", "None"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <p className="text-gray-600 mt-2">Let's start with your basic details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender} value={gender.toLowerCase()}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  placeholder="Enter your nationality"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your complete address"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
              <p className="text-gray-600 mt-2">Help us provide better care for you</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact person"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Contact Number</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                placeholder="Emergency contact number"
              />
            </div>

            <div className="space-y-2">
              <Label>Medical Conditions (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {medicalConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.conditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange("conditions", [...formData.conditions, condition]);
                        } else {
                          handleInputChange("conditions", formData.conditions.filter(c => c !== condition));
                        }
                      }}
                    />
                    <Label htmlFor={condition} className="text-sm font-normal">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                placeholder="List any medications you are currently taking"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                placeholder="List any known allergies (food, medicine, environmental)"
                rows={3}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Documents & Final Steps</h3>
              <p className="text-gray-600 mt-2">Upload documents and review your information</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profilePhoto">Profile Photo (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleInputChange("profilePhoto", file);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reports">Medical Reports (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload your medical reports</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG up to 5MB each</p>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleInputChange("reports", files);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                Privacy & Terms
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                      Terms and Conditions
                    </a>{" "}
                    and understand the healthcare services provided.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked)}
                  />
                  <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed">
                    I consent to the collection and processing of my personal and medical data 
                    as described in the{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                      Privacy Policy
                    </a>.
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Data Security Notice</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Your health information is encrypted and stored securely. We follow strict 
                      medical data protection standards and will never share your personal 
                      information without your explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={isModal ? "p-6" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4"}>
      <div className={isModal ? "max-w-lg mx-auto" : "max-w-4xl mx-auto"}>
        {/* Header - only show in non-modal mode */}
        {!isModal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">MediFast</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isAfterSimpleSignup ? "Complete Your Profile" : "Create Your Account"}
            </h1>
            <p className="text-gray-600">
              {isAfterSimpleSignup 
                ? "Complete your medical profile to get personalized healthcare services"
                : "Join our healthcare community and start your wellness journey"
              }
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between mt-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
              </div>
              <span className="ml-2 text-sm font-medium">Personal</span>
            </div>
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 2 ? <CheckCircle className="w-4 h-4" /> : "2"}
              </div>
              <span className="ml-2 text-sm font-medium">Medical</span>
            </div>
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 3 ? <CheckCircle className="w-4 h-4" /> : "3"}
              </div>
              <span className="ml-2 text-sm font-medium">Complete</span>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className={isModal ? "bg-white border shadow-none" : "bg-white/90 backdrop-blur-md shadow-xl border-0"}>
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="border-gray-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 
                    ? (isAfterSimpleSignup ? "Back" : "Back to Login") 
                    : "Previous"
                  }
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <div></div>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                    disabled={
                      (currentStep === 1 && (!formData.fullName || !formData.email || !formData.phone)) ||
                      (currentStep === 3 && (!formData.agreeTerms || !formData.agreePrivacy))
                    }
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.agreeTerms || !formData.agreePrivacy || isLoading}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  >
                    {isLoading ? "Creating Account..." : "Complete Registration"}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
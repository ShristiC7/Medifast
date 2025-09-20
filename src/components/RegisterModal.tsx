import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Shield, Heart, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { RegistrationForm } from "./RegistrationForm";
import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  isTempAccount: boolean;
}

export function RegisterModal({ isOpen, onClose, onComplete, isTempAccount }: RegisterModalProps) {
  const [showForm, setShowForm] = useState(false);

  const handleStartRegistration = () => {
    setShowForm(true);
  };

  const handleBackToPromo = () => {
    setShowForm(false);
  };

  const handleRegistrationComplete = () => {
    setShowForm(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {!showForm ? (
              <Card className="bg-white border-0 shadow-xl">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">Complete Your Profile</h2>
                        <p className="text-sm text-gray-600">Unlock personalized healthcare</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Personal Health Dashboard</h3>
                        <p className="text-sm text-gray-600">Track your health history, medications, and vitals</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Smart Appointment Management</h3>
                        <p className="text-sm text-gray-600">Get reminders and manage all your appointments</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">AI-Powered Health Insights</h3>
                        <p className="text-sm text-gray-600">Get personalized recommendations and symptom analysis</p>
                      </div>
                    </div>
                  </div>

                  {/* Trial Account Notice */}
                  {isTempAccount && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs text-amber-600">!</span>
                        </div>
                        <h4 className="font-medium text-amber-800">Trial Account Limitations</h4>
                      </div>
                      <p className="text-sm text-amber-700">
                        You're currently using basic features only. Complete registration to access your full health dashboard and personalized care.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleStartRegistration}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Complete Registration
                    </Button>
                    
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Maybe Later
                    </Button>
                  </div>

                  {/* Security Note */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      🔒 Your data is encrypted and secure. We never share personal health information.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="bg-white rounded-xl shadow-xl">
                <RegistrationForm
                  onComplete={handleRegistrationComplete}
                  onBack={handleBackToPromo}
                  isAfterSimpleSignup={true}
                  isModal={true}
                />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
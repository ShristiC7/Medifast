import { motion } from "motion/react";
import { AlertTriangle, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface TrialAccountBannerProps {
  onRegister: () => void;
}

export function TrialAccountBanner({ onRegister }: TrialAccountBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 shadow-sm"
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-amber-800 leading-tight">
              <span className="font-medium">Trial Account</span> - Complete your profile to unlock personalized features
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={onRegister}
              size="sm"
              className="h-8 px-3 bg-teal-600 hover:bg-teal-700 text-white border-none shadow-sm"
            >
              <User className="w-3 h-3 mr-1" />
              Register
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-amber-100 rounded-md transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
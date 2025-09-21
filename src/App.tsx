import { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Homepage } from "./components/Homepage";
import { LoginPage } from "./components/LoginPage";
import { RegistrationForm } from "./components/RegistrationForm";
import { PostLoginHomepage } from "./components/PostLoginHomepage";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { PatientDashboard } from "./components/PatientDashboard";
import { ProfessionalPortal } from "./components/ProfessionalPortal";
import { BottomTabBar } from "./components/BottomTabBar";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { TrialAccountBanner } from "./components/TrialAccountBanner";
import { RegisterModal } from "./components/RegisterModal";

// Direct imports for better performance
import { DoctorSearch } from "./components/DoctorSearch";
import { MedicineOrdering } from "./components/MedicineOrdering";
import { LabTestBooking } from "./components/LabTestBooking";
import { EmergencyServices } from "./components/EmergencyServices";
import { MentalHealthSupport } from "./components/MentalHealthSupport";
import { AISymptomChecker } from "./components/AISymptomChecker";
import { YogaExerciseTracker } from "./components/YogaExerciseTracker";
import { NutritionTracker } from "./components/NutritionTracker";
import { PersonalHealthDashboard } from "./components/PersonalHealthDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { PharmacistDashboard } from "./components/PharmacistDashboard";
import { LabDashboard } from "./components/LabDashboard";
import { AmbulanceDashboard } from "./components/AmbulanceDashboard";
import { SubscriptionPage } from "./components/SubscriptionPage";
import { ChatSupport } from "./components/ChatSupport";
import { ProfileManagement } from "./components/ProfileManagement";

type Screen = "homepage" | "login" | "signup" | "register" | "welcome" | "home" | "doctors" | "medicine" | "lab" | "ambulance" | "mental" | "yoga" | "nutrition" | "notifications" | "profile" | "appointments" | "wellness" | "chat" | "ai-symptom-checker" | "subscription";
type ProfessionalScreen = "professional-portal" | "doctor-dashboard" | "pharmacist-dashboard" | "lab-dashboard" | "ambulance-dashboard";

// Simple transition variants to reduce animation complexity
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const simpleTransition = { duration: 0.2, ease: "easeOut" };

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("homepage");
  const [professionalScreen, setProfessionalScreen] = useState<ProfessionalScreen | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfessionalMode, setIsProfessionalMode] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<Screen | null>(null);
  const [isTempAccount, setIsTempAccount] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setIsTempAccount(false); // Full login sets temp account to false
    if (pendingNavigation) {
      setCurrentScreen(pendingNavigation);
      setPendingNavigation(null);
    } else {
      setCurrentScreen("home");
    }
  }, [pendingNavigation]);

  const handleGoToLogin = useCallback(() => {
    setCurrentScreen("login");
  }, []);

  const handleGoToSignup = useCallback(() => {
    setCurrentScreen("signup");
  }, []);

  const handleGoToRegister = useCallback(() => {
    setCurrentScreen("register");
  }, []);

  const handleBackToHomepage = useCallback(() => {
    setCurrentScreen("homepage");
    setIsProfessionalMode(false);
    setProfessionalScreen(null);
  }, []);

  const handleRegistrationComplete = useCallback(() => {
    setIsLoggedIn(true);
    setIsTempAccount(false); // Full registration completes the account
    setShowRegisterModal(false);
    if (pendingNavigation) {
      setCurrentScreen(pendingNavigation);
      setPendingNavigation(null);
    } else {
      setCurrentScreen("home");
    }
  }, [pendingNavigation]);

  const handleNavigation = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleProfessionalPortalAccess = useCallback(() => {
    setIsProfessionalMode(true);
    setProfessionalScreen("professional-portal");
  }, []);

  const handleSimpleSignupComplete = useCallback(() => {
    setIsLoggedIn(true);
    setIsTempAccount(true); // Simple signup creates temp account
    if (pendingNavigation) {
      setCurrentScreen(pendingNavigation);
      setPendingNavigation(null);
    } else {
      setCurrentScreen("home");
    }
  }, [pendingNavigation]);

  // New handlers for trial account flow
  const handleOpenRegisterModal = useCallback(() => {
    setShowRegisterModal(true);
  }, []);

  const handleCloseRegisterModal = useCallback(() => {
    setShowRegisterModal(false);
  }, []);

  const handleTrialFeatureAccess = useCallback((featureScreen: Screen) => {
    // For trial users accessing advanced features, show register modal
    if (isTempAccount && ["appointments", "ai-symptom-checker", "wellness"].includes(featureScreen)) {
      setShowRegisterModal(true);
      return;
    }
    setCurrentScreen(featureScreen);
  }, [isTempAccount]);

  const handleNavigateToFeature = useCallback((featureType: string) => {
    const screenMap: Record<string, Screen> = {
      doctors: "doctors",
      medicine: "medicine", 
      lab: "lab",
      ambulance: "ambulance"
    };
    const targetScreen = screenMap[featureType];
    if (targetScreen) {
      setPendingNavigation(targetScreen);
      setCurrentScreen("signup");
    }
  }, []);

  const handleProfessionalPortalSelection = useCallback((portal: string) => {
    setProfessionalScreen(portal as ProfessionalScreen);
  }, []);

  const handleBackToProfessionalPortal = useCallback(() => {
    setProfessionalScreen("professional-portal");
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    const screenMap: Record<string, Screen> = {
      home: "home",
      appointments: "appointments", 
      wellness: "wellness",
      chat: "chat",
      profile: "profile"
    };
    const targetScreen = screenMap[tab] || "home";
    
    // Check if trial user is trying to access restricted features
    handleTrialFeatureAccess(targetScreen);
  }, [handleTrialFeatureAccess]);

  // Simplified professional screen renderer
  const renderProfessionalScreen = () => {
    switch (professionalScreen) {
      case "professional-portal":
        return (
          <ProfessionalPortal 
            onSelectPortal={handleProfessionalPortalSelection}
            onBack={handleBackToHomepage} 
          />
        );
      case "doctor-dashboard":
        return <DoctorDashboard onBack={handleBackToProfessionalPortal} />;
      case "pharmacist-dashboard":
        return <PharmacistDashboard onBack={handleBackToProfessionalPortal} />;
      case "lab-dashboard":
        return <LabDashboard onBack={handleBackToProfessionalPortal} />;
      case "ambulance-dashboard":
        return <AmbulanceDashboard onBack={handleBackToProfessionalPortal} />;
      default:
        return (
          <ProfessionalPortal 
            onSelectPortal={handleProfessionalPortalSelection}
            onBack={handleBackToHomepage} 
          />
        );
    }
  };

  // Simplified main screen renderer
  const renderScreen = () => {
    const backToHome = () => setCurrentScreen("home");
    
    switch (currentScreen) {
      case "home":
        return <PostLoginHomepage 
          onNavigate={handleNavigation} 
          isTempAccount={isTempAccount}
          onOpenRegisterModal={handleOpenRegisterModal}
        />;
      case "doctors":
        return <DoctorSearch onBack={backToHome} />;
      case "medicine":
        return <MedicineOrdering onBack={backToHome} />;
      case "lab":
        return <LabTestBooking onBack={backToHome} />;
      case "ambulance":
        return <EmergencyServices onBack={backToHome} />;
      case "mental":
        return <MentalHealthSupport onBack={backToHome} />;
      case "ai-symptom-checker":
        return <AISymptomChecker onBack={backToHome} />;
      case "yoga":
        return <YogaExerciseTracker onBack={backToHome} />;
      case "nutrition":
        return <NutritionTracker onBack={backToHome} />;
      case "appointments":
        return <PersonalHealthDashboard 
          onBack={backToHome} 
          onNavigate={handleNavigation}
        />;
      case "subscription":
        return <SubscriptionPage onBack={backToHome} />;
      case "chat":
        return <ChatSupport onBack={backToHome} />;
      case "profile":
        return <ProfileManagement onBack={backToHome} isTempAccount={isTempAccount} />;
      case "notifications":
      case "wellness":
        return (
          <div className="p-6 pt-20 text-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {currentScreen === "notifications" && "Notifications"}
                {currentScreen === "wellness" && "Wellness Tracking"}
              </h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <PatientDashboard onNavigate={handleNavigation} />;
    }
  };

  // Memoized tab active state
  const activeTab = useMemo(() => {
    if (currentScreen === "home") return "home";
    if (currentScreen === "appointments") return "appointments";
    if (["wellness", "mental", "yoga", "nutrition"].includes(currentScreen)) return "wellness";
    if (currentScreen === "chat") return "chat";
    if (currentScreen === "profile") return "profile";
    return "home";
  }, [currentScreen]);

  // Handle professional portal mode
  if (isProfessionalMode) {
    return (
      <div className="min-h-screen">
        <div>
          {renderProfessionalScreen()}
        </div>
      </div>
    );
  }

  // Handle non-logged-in states
  if (!isLoggedIn) {
    switch (currentScreen) {
      case "homepage":
        return (
          <>
            <Homepage 
              onLogin={handleGoToLogin} 
              onRegister={handleGoToSignup}
              onProfessionalPortal={handleProfessionalPortalAccess}
              onNavigateToFeature={handleNavigateToFeature}
            />
            <ChatbotWidget />
          </>
        );
      case "login":
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onSignup={handleGoToSignup}
            onBack={handleBackToHomepage}
          />
        );
      case "signup":
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onSignupComplete={handleSimpleSignupComplete}
            onBack={handleBackToHomepage}
            isSignupMode={true}
          />
        );
      case "register":
        return (
          <RegistrationForm 
            onComplete={handleRegistrationComplete}
            onBack={handleGoToLogin}
            isAfterSimpleSignup={true}
          />
        );
      case "welcome":
        return <WelcomeScreen onLogin={handleLogin} />;
      default:
        return (
          <>
            <Homepage 
              onLogin={handleGoToLogin} 
              onRegister={handleGoToSignup}
              onProfessionalPortal={handleProfessionalPortalAccess}
              onNavigateToFeature={handleNavigateToFeature}
            />
            <ChatbotWidget />
          </>
        );
    }
  }

  // Main logged-in app
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial Account Banner - shown on all pages for temp accounts */}
      {isTempAccount && (
        <TrialAccountBanner 
          onRegister={handleOpenRegisterModal}
        />
      )}
      
      <div>
        {renderScreen()}
      </div>
      
      <BottomTabBar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ChatbotWidget />
      
      {/* Register Modal for trial users */}
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={handleCloseRegisterModal}
        onComplete={handleRegistrationComplete}
        isTempAccount={isTempAccount}
      />
    </div>
  );
}
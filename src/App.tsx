import { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Lazy load heavy components to improve initial load time
const DoctorSearch = lazy(() => import("./components/DoctorSearch").then(module => ({ default: module.DoctorSearch })));
const MedicineOrdering = lazy(() => import("./components/MedicineOrdering").then(module => ({ default: module.MedicineOrdering })));
const LabTestBooking = lazy(() => import("./components/LabTestBooking").then(module => ({ default: module.LabTestBooking })));
const EmergencyServices = lazy(() => import("./components/EmergencyServices").then(module => ({ default: module.EmergencyServices })));
const MentalHealthSupport = lazy(() => import("./components/MentalHealthSupport").then(module => ({ default: module.MentalHealthSupport })));
const AISymptomChecker = lazy(() => import("./components/AISymptomChecker").then(module => ({ default: module.AISymptomChecker })));
const YogaExerciseTracker = lazy(() => import("./components/YogaExerciseTracker").then(module => ({ default: module.YogaExerciseTracker })));
const NutritionTracker = lazy(() => import("./components/NutritionTracker").then(module => ({ default: module.NutritionTracker })));
const PersonalHealthDashboard = lazy(() => import("./components/PersonalHealthDashboard").then(module => ({ default: module.PersonalHealthDashboard })));
const DoctorDashboard = lazy(() => import("./components/DoctorDashboard").then(module => ({ default: module.DoctorDashboard })));
const PharmacistDashboard = lazy(() => import("./components/PharmacistDashboard").then(module => ({ default: module.PharmacistDashboard })));
const LabDashboard = lazy(() => import("./components/LabDashboard").then(module => ({ default: module.LabDashboard })));
const AmbulanceDashboard = lazy(() => import("./components/AmbulanceDashboard").then(module => ({ default: module.AmbulanceDashboard })));
const SubscriptionPage = lazy(() => import("./components/SubscriptionPage").then(module => ({ default: module.SubscriptionPage })));

type Screen = "homepage" | "login" | "signup" | "register" | "welcome" | "home" | "doctors" | "medicine" | "lab" | "ambulance" | "mental" | "yoga" | "nutrition" | "notifications" | "profile" | "appointments" | "wellness" | "chat" | "ai-symptom-checker" | "subscription";
type ProfessionalScreen = "professional-portal" | "doctor-dashboard" | "pharmacist-dashboard" | "lab-dashboard" | "ambulance-dashboard";

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-teal-600">Loading...</p>
    </div>
  </div>
);

// Simple transition variants to reduce animation complexity
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const simpleTransition = { duration: 0.3, ease: "easeOut" };

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

  // Memoized professional screen renderer
  const renderProfessionalScreen = useMemo(() => {
    switch (professionalScreen) {
      case "professional-portal":
        return (
          <ProfessionalPortal 
            onSelectPortal={handleProfessionalPortalSelection}
            onBack={handleBackToHomepage} 
          />
        );
      case "doctor-dashboard":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DoctorDashboard onBack={handleBackToProfessionalPortal} />
          </Suspense>
        );
      case "pharmacist-dashboard":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <PharmacistDashboard onBack={handleBackToProfessionalPortal} />
          </Suspense>
        );
      case "lab-dashboard":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LabDashboard onBack={handleBackToProfessionalPortal} />
          </Suspense>
        );
      case "ambulance-dashboard":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AmbulanceDashboard onBack={handleBackToProfessionalPortal} />
          </Suspense>
        );
      default:
        return (
          <ProfessionalPortal 
            onSelectPortal={handleProfessionalPortalSelection}
            onBack={handleBackToHomepage} 
          />
        );
    }
  }, [professionalScreen, handleProfessionalPortalSelection, handleBackToHomepage, handleBackToProfessionalPortal]);

  // Memoized main screen renderer
  const renderScreen = useMemo(() => {
    const backToHome = () => setCurrentScreen("home");
    
    switch (currentScreen) {
      case "home":
        return <PostLoginHomepage 
          onNavigate={handleNavigation} 
          isTempAccount={isTempAccount}
          onOpenRegisterModal={handleOpenRegisterModal}
        />;
      case "doctors":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DoctorSearch onBack={backToHome} />
          </Suspense>
        );
      case "medicine":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MedicineOrdering onBack={backToHome} />
          </Suspense>
        );
      case "lab":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LabTestBooking onBack={backToHome} />
          </Suspense>
        );
      case "ambulance":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <EmergencyServices onBack={backToHome} />
          </Suspense>
        );
      case "mental":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MentalHealthSupport onBack={backToHome} />
          </Suspense>
        );
      case "ai-symptom-checker":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AISymptomChecker onBack={backToHome} />
          </Suspense>
        );
      case "yoga":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <YogaExerciseTracker onBack={backToHome} />
          </Suspense>
        );
      case "nutrition":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <NutritionTracker onBack={backToHome} />
          </Suspense>
        );
      case "appointments":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <PersonalHealthDashboard 
              onBack={backToHome} 
              onNavigate={handleNavigation}
            />
          </Suspense>
        );
      case "subscription":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SubscriptionPage onBack={backToHome} />
          </Suspense>
        );
      case "notifications":
      case "profile":
      case "wellness":
      case "chat":
        return (
          <div className="p-6 pt-20 text-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {currentScreen === "notifications" && "Notifications"}
                {currentScreen === "profile" && "Profile"}
                {currentScreen === "wellness" && "Wellness Tracking"}
                {currentScreen === "chat" && "Chat Support"}
              </h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <PatientDashboard onNavigate={handleNavigation} />;
    }
  }, [currentScreen, handleNavigation]);

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
        <motion.div
          key={professionalScreen}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={simpleTransition}
        >
          {renderProfessionalScreen}
        </motion.div>
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
      
      <motion.div
        key={currentScreen}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={simpleTransition}
      >
        {renderScreen}
      </motion.div>
      
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
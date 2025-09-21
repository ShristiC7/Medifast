import { 
  Home, 
  Calendar, 
  Activity, 
  User, 
  MessageCircle 
} from "lucide-react";
import { memo, useMemo } from "react";

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomTabBar = memo(function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = useMemo(() => [
    {
      id: "home",
      label: "Home",
      icon: Home
    },
    {
      id: "appointments",
      label: "Bookings",
      icon: Calendar
    },
    {
      id: "wellness",
      label: "Wellness",
      icon: Activity
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle
    },
    {
      id: "profile",
      label: "Profile",
      icon: User
    }
  ], []);

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex justify-around relative">
        {/* Simplified Active tab indicator */}
        <div
          className="absolute top-2 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-xl h-12 w-16 transition-all duration-300 ease-out shadow-lg"
          style={{ 
            left: `${activeIndex * 20}%`,
            transform: `translateX(-50%)`,
            marginLeft: '10%'
          }}
        />
        
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 relative z-10 hover:scale-105 active:scale-95 ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-teal-600"
            }`}
          >
            <div className="relative">
              <tab.icon className="w-6 h-6" />
              {activeTab === tab.id && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </div>
            
            <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-500"
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});

export { BottomTabBar };
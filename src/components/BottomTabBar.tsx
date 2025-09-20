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
        {/* Active tab indicator */}
        <div
          className="absolute top-2 bg-teal-600 rounded-xl h-12 w-16 transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(${activeIndex * 80 - 8}px)`,
            zIndex: 0 
          }}
        />
        
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 relative z-10 ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});

export { BottomTabBar };
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
  onClick?: () => void;
}

interface BottomNavProps {
  onCreateClick: () => void;
}

export function BottomNav({ onCreateClick }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", path: "", onClick: onCreateClick },
    { icon: Heart, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-bottom">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                  fill={isActive ? "currentColor" : "none"}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-12 h-0.5 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

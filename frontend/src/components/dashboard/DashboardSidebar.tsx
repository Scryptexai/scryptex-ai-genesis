import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { 
  Home, 
  Brain, 
  Bookmark,
  Settings,
  HelpCircle,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  Gift,
  Users,
  Star,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("EN");

  const mainNavItems = [
    { name: "Overview", path: "/dashboard/overview", icon: Home },
    { name: "Analyze AI", path: "/dashboard/AnalyzeAi", icon: Brain },
    { name: "Airdrop Update", path: "/dashboard/AirdropUpdate", icon: Gift },
    { name: "Saved Projects", path: "/dashboard/saved-projects", icon: Bookmark },
    { name: "Referral & Points", path: "/dashboard/referrals", icon: Star, disabled: false },
    { name: "Settings", path: "/dashboard/Settings", icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "FR" : "EN");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(true)}
        />
      )}

      {/* Mobile toggle button */}
      <motion.button
        className="fixed top-2 left-2 z-3 md:hidden bg-purple-900/80 backdrop-blur p-2 rounded-lg border border-purple-700/50 shadow-lg"
        onClick={toggleSidebar}
        whileTap={{ scale: 0.8 }}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-[#15123A] border-r border-purple-900/30 w-64 
                    shadow-[0_0_25px_rgba(131,56,236,0.2)] transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        initial={true}
      >
        {/* Top sidebar glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 blur-sm" />

        {/* Logo */}
        <div className="flex justify-center p-2 bg-white-0 text-white">
          <img src="/logo.png" className="h-12 w-auto" alt="Scryptex Logo" />
        </div>
       
          
        {/* Main Navigation */}
        <nav className="p-2 mt-2">
          <ul className="space-y-0.5">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.disabled ? "#" : item.path}
                  className={({ isActive }) => `
                    relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                    transition-all duration-200 overflow-hidden
                    ${isActive 
                      ? 'text-white' 
                      : item.disabled 
                        ? 'text-gray-500 cursor-not-allowed opacity-50' 
                        : 'text-gray-300 hover:bg-purple-900/20 hover:text-white'
                    }
                  `}
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                >
                  {({isActive}) => (
                    <>
                      {/* Active item background glow animation */}
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 -z-10 bg-purple-900/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layoutId="activeNavBackground"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Active item left border indicator */}
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 via-purple-600 to-blue-500"
                          layoutId="activeNavIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: isActive ? 0 : 5 }}
                        animate={isActive ? { 
                          scale: [1, 1.2, 1], 
                          rotate: [0, 0, 0],
                          transition: { repeat: 0 }
                        } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <item.icon size={18} className={isActive ? "text-purple-400" : ""} />
                      </motion.div>
                      
                      <span>{item.name}</span>
                      
                      {/* Coming soon badge */}
                      {item.disabled && (
                        <span className="absolute right-3 text-[9px] bg-purple-900/50 text-purple-300 px-1 py-0.5 rounded">
                          SOON
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Stats - Points Section */}
        <div className="px-3 py-2 mt-2">
          <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-900/30">
            <div className="text-xs text-gray-400 font-medium">MY POINTS</div>
            <div className="text-lg font-bold text-purple-300">2,450</div>
            <div className="w-full h-1.5 bg-purple-900/50 rounded-full mt-1 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: "25%" }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Level 3</span>
              <span>650 points to Level 4</span>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="absolute bottom-0 left-0 w-full border-t border-purple-900/30 p-2">
          <div className="flex flex-col gap-1">
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/20 text-xs"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
              </motion.div>
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/20 text-xs"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Globe size={14} />
              </motion.div>
              <span>Language: {language}</span>
            </button>
            
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/20 text-xs"
            >
              <motion.div
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: "spring", stiffness: 800, damping: 10 }}
              >
                <HelpCircle size={14} />
              </motion.div>
              <span>Help / Discord</span>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/20 text-xs"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users size={14} />
              </motion.div>
              <span>Invite Friends</span>
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
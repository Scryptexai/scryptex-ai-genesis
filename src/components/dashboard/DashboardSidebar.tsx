
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { 
  Home, 
  Brain, 
  Radar, 
  Wallet, 
  BarChart3, 
  PieChart,
  Bookmark,
  Settings,
  HelpCircle,
  Menu,
  X,
  Moon,
  Sun,
  Globe
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
    { name: "AI Research Hub", path: "/dashboard/ai-research-hub", icon: Brain },
    { name: "Airdrop Radar", path: "/dashboard/airdrop-radar", icon: Radar },
    { name: "Wallet Tracker", path: "/dashboard/wallet-tracker", icon: Wallet },
    { name: "Token Analyzer", path: "/dashboard/token-analyzer", icon: BarChart3 },
    { name: "DEX Scanner", path: "/dashboard/dex-scanner", icon: PieChart },
    { name: "Saved Projects", path: "/dashboard/saved-projects", icon: Bookmark },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
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
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-purple-900 p-2 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-[#15123A] border-r border-purple-900/30 w-64 z-20 
                    shadow-[0_0_15px_rgba(131,56,236,0.15)] transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        initial={false}
      >
        {/* Logo */}
        <div className="p-6 border-b border-purple-900/30">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Scryptex
          </h1>
          <p className="text-xs text-gray-400">AI-Powered Web3 Intelligence</p>
        </div>

        {/* Main Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-900/30 text-white shadow-[0_0_10px_rgba(131,56,236,0.2)]' 
                      : 'text-gray-300 hover:bg-purple-900/20'
                    }
                  `}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Controls */}
        <div className="absolute bottom-0 left-0 w-full border-t border-purple-900/30 p-4">
          <div className="flex flex-col gap-4">
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
              <span>Theme</span>
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Globe size={18} />
              </motion.div>
              <span>Language: {language}</span>
            </button>
            
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HelpCircle size={18} />
              </motion.div>
              <span>Help / Discord</span>
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;

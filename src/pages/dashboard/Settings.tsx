
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { 
  User,
  Bell,
  Moon,
  Sun,
  Monitor,
  Globe,
  Save,
  Lock,
  Key,
  ExternalLink
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const Settings = () => {
  // User Preferences
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("english");
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notifyOnAirdrops, setNotifyOnAirdrops] = useState(true);
  const [notifyOnRiskChanges, setNotifyOnRiskChanges] = useState(true);
  const [notifyOnPriceAlerts, setNotifyOnPriceAlerts] = useState(false);
  
  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  
  // API Access
  const [apiEnabled, setApiEnabled] = useState(false);
  
  const [savedPreferences, setSavedPreferences] = useState(false);
  
  const handleSavePreferences = () => {
    setSavedPreferences(true);
    setTimeout(() => {
      setSavedPreferences(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
          Settings
        </h1>
        <p className="text-gray-400">
          Customize your dashboard experience and notification preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Preferences */}
        <motion.div variants={itemVariants}>
          <DashboardCard>
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <User size={18} />
              <span>User Preferences</span>
            </h2>
            
            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Theme</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'light'
                        ? 'bg-purple-900/30 border-purple-500 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Sun size={16} />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-purple-900/30 border-purple-500 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Moon size={16} />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'system'
                        ? 'bg-purple-900/30 border-purple-500 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Monitor size={16} />
                    <span>System</span>
                  </button>
                </div>
              </div>
              
              {/* Language Selection */}
              <div>
                <label htmlFor="language" className="block text-sm text-gray-400 mb-2">Language</label>
                <div className="relative">
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Globe size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={itemVariants}>
          <DashboardCard>
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Bell size={18} />
              <span>Notification Settings</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Browser notifications for important alerts</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="mt-4 pt-4 border-t border-purple-900/30">
                <h3 className="font-medium mb-3">Notify me about:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="notifyAirdrops" 
                      checked={notifyOnAirdrops}
                      onCheckedChange={() => setNotifyOnAirdrops(!notifyOnAirdrops)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <label htmlFor="notifyAirdrops" className="text-sm">
                      New airdrop opportunities
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="notifyRisks" 
                      checked={notifyOnRiskChanges}
                      onCheckedChange={() => setNotifyOnRiskChanges(!notifyOnRiskChanges)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <label htmlFor="notifyRisks" className="text-sm">
                      Risk rating changes
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="notifyPrices" 
                      checked={notifyOnPriceAlerts}
                      onCheckedChange={() => setNotifyOnPriceAlerts(!notifyOnPriceAlerts)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <label htmlFor="notifyPrices" className="text-sm">
                      Price alerts for tracked tokens
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
        
        {/* Security Settings */}
        <motion.div variants={itemVariants}>
          <DashboardCard>
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Lock size={18} />
              <span>Security Settings</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Adds an extra layer of security</p>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Login Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified of new device logins</p>
                </div>
                <Switch 
                  checked={loginAlerts} 
                  onCheckedChange={setLoginAlerts} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="mt-4 pt-4 border-t border-purple-900/30">
                <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm">
                  <Key size={16} />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
        
        {/* API Access */}
        <motion.div variants={itemVariants}>
          <DashboardCard>
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <ExternalLink size={18} />
              <span>API Access</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable API Access</h3>
                  <p className="text-sm text-gray-400">Allow external applications to access your data</p>
                </div>
                <Switch 
                  checked={apiEnabled} 
                  onCheckedChange={setApiEnabled} 
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              {apiEnabled && (
                <div className="mt-4 p-4 bg-purple-900/10 rounded-lg border border-purple-900/30">
                  <h4 className="font-medium mb-2">Your API Key</h4>
                  <div className="flex">
                    <div className="bg-[#2A2C3E] border border-r-0 border-purple-900/30 rounded-l-lg px-4 py-2 font-mono text-sm overflow-hidden overflow-ellipsis flex-grow">
                      sk_test_51LcbGhIg8krNqYxObD7AGNfVvsbQxkH
                    </div>
                    <button className="bg-purple-600 text-white px-3 rounded-r-lg hover:bg-purple-700 transition-colors">
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-purple-300 mt-2">
                    Do not share this key with anyone. You can rotate or revoke this key at any time.
                  </p>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-purple-900/30">
                <a href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm">
                  <ExternalLink size={16} />
                  <span>View API Documentation</span>
                </a>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <ActionButton 
          icon={<Save size={18} />}
          onClick={handleSavePreferences}
        >
          {savedPreferences ? "Preferences Saved!" : "Save Preferences"}
        </ActionButton>
      </motion.div>
    </motion.div>
  );
};

export default Settings;

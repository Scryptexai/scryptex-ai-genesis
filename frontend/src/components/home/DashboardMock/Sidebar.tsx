// components/Sidebar.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  delay: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, delay }) => {
  return (
    <motion.div
      className={`p-3 flex flex-col items-center justify-center mb-2 rounded-md cursor-pointer transition-all duration-300 ${
        active ? 'bg-purple-700 bg-opacity-40' : 'bg-gray-700 hover:bg-gray-600'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`w-6 h-6 ${active ? 'bg-purple-500' : 'bg-gray-500'} rounded-full flex items-center justify-center mb-1`}>
        <span className="text-white text-xs">{icon}</span>
      </div>
      <span className="text-xs text-gray-300">{label}</span>
    </motion.div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="p-3 h-full">
      <div className="flex justify-center mb-6">
        <motion.div
          className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white font-bold text-lg">S</span>
        </motion.div>
      </div>
      
      <SidebarItem icon="🔍" label="Analyze" active={true} delay={0.3} />
      <SidebarItem icon="📋" label="Live List" delay={0.4} />
      <SidebarItem icon="💾" label="Saved" delay={0.5} />
      <SidebarItem icon="📊" label="Analytics" delay={0.6} />
      <SidebarItem icon="⚙️" label="Settings" delay={0.7} />
      
      <div className="mt-8">
        <motion.div
          className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="text-white text-xs font-medium mb-1">Pro Plan</div>
          <div className="text-gray-200 text-xs">12 days left</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
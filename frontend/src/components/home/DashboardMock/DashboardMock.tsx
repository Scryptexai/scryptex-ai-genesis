// ScryptexDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import LegitimacyScore from './LegitimacyScore';
import AnalysisSection from './AnalysisSection';
import EffortValuePredictor from './EffortValuePredictor';
import AirdropLiveList from './AirdropLiveList';

const ScryptexDashboard: React.FC = () => {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-purple-800">
        {/* Dashboard Header */}
        <Header title="Scryptex Dashboard" />
        
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-6 gap-6">
            {/* Sidebar */}
            <div className="col-span-1 bg-gray-800 rounded-lg">
              <Sidebar />
            </div>
            
            {/* Main content */}
            <div className="col-span-5">
              <h2 className="text-xl font-bold text-white mb-4">
                Airdrop Analysis
                <span className="ml-2 text-xs font-normal bg-purple-700 bg-opacity-40 px-2 py-1 rounded-full">Powered by AI</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Left column - Score */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-300 font-medium mb-3">Legitimacy Score</h3>
                  <div className="flex items-center justify-center py-4">
                    <LegitimacyScore score={87} />
                  </div>
                </div>
                
                {/* Right column - Analysis */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-300 font-medium mb-3">Risk Assessment</h3>
                  <AnalysisSection />
                </div>
              </div>
              
              {/* Effort-to-Value Calculator */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EffortValuePredictor />
                
                {/* Live Airdrops Section */}
                <AirdropLiveList />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-2xl rounded-3xl transform scale-95"></div>
    </motion.div>
  );
};

export default ScryptexDashboard;
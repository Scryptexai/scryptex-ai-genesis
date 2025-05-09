import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import LegitimacyScore from './LegitimacyScore';
import AnalysisSection from './AnalysisSection';
import EffortValuePredictor from './EffortValuePredictor';
import AirdropLiveList from './AirdropLiveList';

const DashboardMock: React.FC = () => {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-purple-800">
        {/* Dashboard Header */}
        <Header title="Scryptex Dashboard" />
        
        {/* Dashboard Content */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar - Made more compact */}
            <div className="md:w-1/6 bg-gray-800 rounded-lg">
              <Sidebar />
            </div>
            
            {/* Main content - More condensed layout */}
            <div className="md:w-5/6">
              <h2 className="text-lg font-bold text-white mb-3">
                Airdrop Analysis
                <span className="ml-2 text-xs font-normal bg-purple-700 bg-opacity-40 px-2 py-1 rounded-full">Powered by AI</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Left column - Score */}
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-sm text-gray-300 font-medium mb-2">Legitimacy Score</h3>
                  <div className="flex items-center justify-center py-2">
                    <LegitimacyScore score={87} />
                  </div>
                </div>
                
                {/* Right column - Analysis */}
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-sm text-gray-300 font-medium mb-2">Risk Assessment</h3>
                  <AnalysisSection />
                </div>
              </div>
              
              {/* Effort-to-Value Calculator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EffortValuePredictor />
                
                {/* Live Airdrops Section */}
                <AirdropLiveList />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect - Made slightly smaller */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl rounded-3xl transform scale-90"></div>
    </motion.div>
  );
};

export default DashboardMock;
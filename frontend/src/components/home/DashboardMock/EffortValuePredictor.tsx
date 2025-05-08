// components/EffortValuePredictor.tsx
import React from 'react';
import { motion } from 'framer-motion';

const EffortValuePredictor: React.FC = () => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <div className="flex items-center mb-3">
        <h3 className="text-gray-300 font-medium">Effort-to-Value Prediction</h3>
        <span className="ml-2 text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">AI Analysis</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Estimated Effort:</p>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <p className="text-white font-medium">Medium (2-3 hours)</p>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <ul className="list-disc pl-4 space-y-1">
              <li>KYC Verification</li>
              <li>Social Media Tasks</li>
              <li>Testnet Interaction</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Potential Value:</p>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              High ($50-$500)
            </p>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <div className="flex items-center justify-between mb-1">
              <span>Confidence:</span>
              <span className="font-medium text-green-400">85%</span>
            </div>
            <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <motion.div
        className="mt-4 bg-purple-900 bg-opacity-30 p-3 rounded-lg border border-purple-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <div className="flex items-start">
          <div className="text-purple-400 text-lg mr-2">💡</div>
          <div>
            <p className="text-sm text-gray-300">AI Insight:</p>
            <p className="text-xs text-gray-400">This project shows high potential based on team background, VCs involved, and tokenomics structure. The effort required is moderate and the ROI potential is above average.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EffortValuePredictor;
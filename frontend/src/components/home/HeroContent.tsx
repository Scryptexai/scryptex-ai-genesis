// HeroContent.tsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroContent: React.FC = () => {
  return (
    <div>
      {/* Logo */}
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        
      </motion.div>
      
      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span className="text-white">Find the Best Airdrops </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
          with AI Intelligence
        </span>
      </motion.h1>
      
      {/* Subheadline */}
      <motion.p
        className="mt-4 text-gray-300 text-lg max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        AI-powered platform helps you identify, analyze, and manage airdrop opportunities with high accuracy, saving time and minimizing scam risks.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div
        className="mt-8 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/dashboard" className="block w-full h-full text-center">
            Start Free Analysis
          </a>
        </motion.button>
        
        <motion.button
          className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:bg-opacity-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Watch Demo
        </motion.button>
      </motion.div>
      
      {/* Early Access Badge */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          delay: 0.9
        }}
      >
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="ml-2 text-white font-medium text-sm">Early Access Program</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
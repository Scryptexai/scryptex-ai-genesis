import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WaitlistModal from '@/components/auth/WaitlistModal';
import AnimatedBackground from './hero/AnimatedBackground';

interface TrustIndicator {
  icon: string;
  value: string;
  label: string;
}

const HeroSection: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const trustIndicators: TrustIndicator[] = [
    { icon: '👥', value: '10,000+', label: 'Active Hunters' },
    { icon: '💰', value: '$2.5M+', label: 'Airdrops Claimed' },
    { icon: '🛡️', value: '100%', label: 'Scam Protection' },
    { icon: '⚡', value: '24/7', label: 'AI Analysis' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-high">
      {/* Web3 AI Background Animation */}
      <AnimatedBackground />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[1]" />
      
      <div className="max-w-7xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Stop Wasting Time on
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"> Fake Airdrops</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Let AI do the heavy lifting. Scryptex analyzes thousands of airdrops in real-time, 
            filtering out scams and maximizing your profits automatically.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 hover:bg-purple-800/40 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{indicator.icon}</div>
              <div className="text-2xl font-bold text-white">{indicator.value}</div>
              <div className="text-sm text-gray-300">{indicator.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-lg font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <span className="relative z-10">Join Early Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button
            className="px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold text-white text-lg hover:bg-purple-500/20 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            Watch Demo (2 min)
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 border-2 border-gray-900 flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/30"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-gray-300">
            Join 1,247 hunters already on the waitlist
          </p>
        </motion.div>
      </div>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </section>
  );
};

export default HeroSection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B1E]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Larger */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* Logo SVG - Large Size */}
             <img src="/logo.png" className="h-20 w-25" alt="Scryptex Logo" />
            
            {/* Logo Text - Larger */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">Scryptex</span>
              <span className="text-xs text-gray-100">AI Airdrop Hunter</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Benefits
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Contact
            </a>
            
            
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              className={`transform transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#benefits" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Benefits
            </a>
            <a href="#contact" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Contact
            </a>
            
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
              Launch App
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
    </nav>
  );
};

export default Navbar;
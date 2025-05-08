import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const navItems = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Analyze AI', icon: <AnalyzeIcon /> },
    { name: 'Airdrops', icon: <AirdropsIcon /> },
    { name: 'Risk Decoder', icon: <RiskIcon /> },
    { name: 'Project Saver', icon: <SaverIcon /> }
  ];

  return (
    <>
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-indigo-950/90 backdrop-blur-md shadow-lg shadow-purple-900/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                S
              </div>
              <span className="text-white font-semibold text-lg">Scryptex</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center gap-8"
              variants={itemVariants}
            >
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div className="hidden md:block" variants={itemVariants}>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                Get Early Access
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div 
              className="md:hidden"
              variants={itemVariants}
            >
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 focus:outline-none"
              >
                <MenuIcon isOpen={isMobileMenuOpen} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 md:hidden pt-20 bg-gradient-to-br from-indigo-950/95 via-purple-900/95 to-blue-950/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <MobileNavItem key={index} item={item} />
                ))}
                <motion.div 
                  variants={itemVariants}
                  className="pt-4"
                >
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                    Get Early Access
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavItem = ({ item }) => {
  return (
    <motion.a
      href="#"
      className="relative flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-cyan-400 group-hover:text-purple-400 transition-colors">
        {item.icon}
      </span>
      <span>{item.name}</span>
      <motion.div 
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

const MobileNavItem = ({ item }) => {
  return (
    <motion.a
      href="#"
      className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-all"
      variants={itemVariants}
      whileHover={{ x: 5 }}
    >
      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg text-white">
        {item.icon}
      </div>
      <span className="text-lg">{item.name}</span>
    </motion.a>
  );
};

// Animated Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
    />
    <motion.polyline 
      points="9 22 9 12 15 12 15 22"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
    />
  </svg>
);

const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.circle 
      cx="12" cy="12" r="3"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.2 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
    />
    <motion.path 
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
    />
  </svg>
);

const AirdropsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M18 8h1a4 4 0 010 8h-1"
      initial={{ y: 0 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
    />
    <motion.path 
      d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
    />
    <motion.line 
      x1="6" y1="1" x2="6" y2="4"
      initial={{ y: 0 }}
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
    />
    <motion.line 
      x1="10" y1="1" x2="10" y2="4"
      initial={{ y: 0 }}
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatDelay: 5 }}
    />
    <motion.line 
      x1="14" y1="1" x2="14" y2="4"
      initial={{ y: 0 }}
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatDelay: 5 }}
    />
  </svg>
);

const RiskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
    />
    <motion.path 
      d="M8 11l3 3 5-5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
    />
  </svg>
);

const SaverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
      initial={{ fill: 'rgba(129, 140, 248, 0)' }}
      animate={{ fill: 'rgba(129, 140, 248, 0.2)' }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
    />
  </svg>
);

const MenuIcon = ({ isOpen }) => {
  return (
    <div className="w-6 h-6 relative">
      <motion.span
        initial={{ rotate: 0 }}
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute w-full h-0.5 bg-white rounded-full transform"
      />
      <motion.span
        initial={{ opacity: 1 }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute w-full h-0.5 bg-white rounded-full top-2.5"
      />
      <motion.span
        initial={{ rotate: 0 }}
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute w-full h-0.5 bg-white rounded-full top-5"
      />
    </div>
  );
};

export default Navigation;
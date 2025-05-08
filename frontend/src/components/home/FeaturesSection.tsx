import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Animation variants for consistent look with HeroSection
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// FeatureCard component for each core feature
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6,
            delay 
          } 
        }
      }}
    >
      <div className="mb-4 text-cyan-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

// EffortValueCard component
const EffortValueCard = ({ title, description, gradient, delay = 0 }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6,
            delay 
          } 
        }
      }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-20`}></div>
      
      <div className="relative p-6 border border-white/10 h-full">
        <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {title}
        </h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

// Main FeaturesSection component
const FeaturesSection = () => {
  const featuresSectionRef = useRef(null);
  
  // Animated counter for metrics
  const CounterAnimation = ({ target, label, duration = 2000, delay = 0 }) => {
    const counterRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && counterRef.current) {
              const node = counterRef.current;
              let startTime;
              let startValue = 0;
              const endValue = parseInt(target);
              
              const updateCounter = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(startValue + progress * (endValue - startValue));
                node.textContent = currentValue + (label.includes('%') ? '%' : '');
                
                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                }
              };
              
              // Delay the animation start
              setTimeout(() => {
                requestAnimationFrame(updateCounter);
              }, delay);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      if (counterRef.current) {
        observer.observe(counterRef.current);
      }
      
      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, [target, duration, delay]);
    
    return (
      <div className="text-center p-4">
        <div 
          ref={counterRef} 
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          0
        </div>
        <p className="text-gray-300 mt-2">{label}</p>
      </div>
    );
  };
  
  // Icons for features
  const AnalyzeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
  
  const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
  
  const SaverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
  
  const SignalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M5 5l2.5 2.5" />
      <path d="M2 12h4" />
      <path d="M5 19l2.5-2.5" />
      <path d="M12 22v-4" />
      <path d="M19 19l-2.5-2.5" />
      <path d="M22 12h-4" />
      <path d="M19 5l-2.5 2.5" />
    </svg>
  );
  
  return (
    <div 
      ref={featuresSectionRef}
      className="features-section relative bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white py-24"
    >
      {/* Background elements for visual consistency */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-8 opacity-5">
          {Array.from({ length: 12 }).map((_, rowIndex) => (
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className="w-full h-full border border-white/10"
              />
            ))
          ))}
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={fadeIn}
          >
            Powerful AI Features
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Our platform uses advanced AI technology to help you navigate the airdrop landscape with confidence and precision.
          </motion.p>
        </motion.div>
        
        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard 
            icon={<AnalyzeIcon />}
            title="AI Analysis Engine"
            description="Multi-factor analysis of teams, VCs, roadmap, and tokenomics with legitimacy scoring from 0-100 and risk assessment reports."
            delay={0.1}
          />
          <FeatureCard 
            icon={<ListIcon />}
            title="Airdrop Live List"
            description="AI-curated list from various sources with automatic categorization into Upcoming, Active, and Ended with filtering options."
            delay={0.2}
          />
          <FeatureCard 
            icon={<SaverIcon />}
            title="Project Saver"
            description="Custom collection management with status tracking for Interested, Applied, and Completed projects and a reminder system."
            delay={0.3}
          />
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            <CounterAnimation target="85" label="Accuracy Rate" delay={500} />
            <CounterAnimation target="10" label="Times Faster Analysis" delay={700} />
            <CounterAnimation target="90" label="Scam Detection" delay={900} />
            <CounterAnimation target="5000" label="Target Users" delay={1100} />
          </div>
        </motion.div>
        
        {/* Effort-to-Value Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 text-center"
            variants={fadeIn}
          >
            Effort-to-Value Intelligence
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EffortValueCard 
              title="Effort Estimation"
              description="AI predicts the time and complexity required to complete airdrop tasks, from simple to complex interactions."
              gradient="bg-gradient-to-br from-cyan-600 to-cyan-900"
              delay={0.1}
            />
            <EffortValueCard 
              title="Value Prediction"
              description="Based on historical data and project analysis, our AI predicts potential value ranges for upcoming airdrops."
              gradient="bg-gradient-to-br from-purple-600 to-purple-900"
              delay={0.2}
            />
            <EffortValueCard 
              title="ROI Calculation"
              description="Get clear ROI ratings to maximize your time investment and focus on the most rewarding opportunities."
              gradient="bg-gradient-to-br from-blue-600 to-blue-900"
              delay={0.3}
            />
          </div>
        </motion.div>
        
        {/* Roadmap Preview */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6"
            variants={fadeIn}
          >
            Growing With You
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Our platform evolves with the needs of the community, with exciting features on the horizon.
          </motion.p>
          
          <motion.div 
            className="inline-flex gap-4 flex-wrap justify-center"
            variants={staggerChildren}
          >
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              variants={scaleIn}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Signal Detection
              </span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              variants={scaleIn}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Multi-chain Support
              </span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              variants={scaleIn}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Wallet Integration
              </span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              variants={scaleIn}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Community Intelligence
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6"
            variants={fadeIn}
          >
            Ready to Revolutionize Your Airdrop Strategy?
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Join our Early Access Program and be among the first to experience the future of airdrop hunting.
          </motion.p>
          
          <motion.button 
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            variants={scaleIn}
          >
            Join Early Access
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
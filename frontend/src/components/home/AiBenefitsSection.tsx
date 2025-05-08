import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Animation variants
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
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Feature icons
const IconAnalyze = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10L14 14M12 5V5.01M5 12H5.01M12 19V19.01M19 12H19.01M7.05 7.05L7.11 7.11M16.95 7.05L16.89 7.11M16.95 16.95L16.89 16.89M7.05 16.95L7.11 16.89M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" 
      stroke="url(#paintAnalyze)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paintAnalyze" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

const IconEffort = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4H21M5 9L19 9M7 14H17M9 19H15" 
      stroke="url(#paintEffort)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paintEffort" x1="3" y1="4" x2="21" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

const IconSignal = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15.5V17.5H8V15.5M6 12.5V17.5M10 9.5V17.5H14V9.5M12 5.5V9.5M16 12.5V17.5H20V12.5M18 8.5V12.5" 
      stroke="url(#paintSignal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paintSignal" x1="2" y1="5.5" x2="20" y2="17.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

const IconRisk = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V11M12 15H12.01M5.07 19H18.93C19.823 19 20.413 18.109 20.035 17.336L13.065 4.33599C12.669 3.52844 11.331 3.52844 10.935 4.33599L3.965 17.336C3.587 18.109 4.177 19 5.07 19Z" 
      stroke="url(#paintRisk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paintRisk" x1="3.87" y1="4" x2="20.13" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

const AiBenefitSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <IconAnalyze />,
      title: "AI-Powered Analysis",
      description: "Our system leverages AI to analyze project data, providing a legitimacy score based on historical airdrop patterns and success factors.",
      highlight: "85% Accuracy Rate"
    },
    {
      icon: <IconEffort />,
      title: "Effort-to-Value Calculator",
      description: "Precisely predicts the potential ROI based on the required effort, helping you focus on the most rewarding opportunities.",
      highlight: "10x Faster Analysis"
    },
    {
      icon: <IconSignal />,
      title: "Signal Detection System",
      description: "Early warning system that identifies potential airdrops before official announcements, giving you a competitive edge.",
      highlight: "Early Access Advantage"
    },
    {
      icon: <IconRisk />,
      title: "Risk Decoder",
      description: "Deep analysis of smart contracts and team backgrounds to detect red flags and protect you from scams.",
      highlight: "90% Scam Detection"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 text-white relative overflow-hidden">
      {/* Background Elements */}
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
      <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              AI-Powered
            </span> Benefits
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Scryptex uses advanced artificial intelligence to revolutionize how you find, analyze, and manage airdrop opportunities.
          </motion.p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* AI Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.7 }
            }
          }}
          className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              {/* AI Brain Icon with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 4.5V2M12 22V19.5M4.5 12H2M22 12H19.5M19.07 19.07L17.24 17.24M19.07 5.93L17.24 7.76M4.93 19.07L6.76 17.24M4.93 5.93L6.76 7.76M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" 
                    stroke="url(#brainGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="brainGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                AI Continues to Improve
              </h3>
              <p className="text-gray-300">
                Our machine learning models continuously improve by analyzing historical data from successful and failed airdrops. With each airdrop you analyze, the system becomes smarter at predicting legitimacy and potential returns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Feature card component with animation
const FeatureCard = ({ icon, title, description, highlight, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5,
            delay: 0.2 * index
          }
        }
      }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-all group"
    >
      {/* Icon with hover effect */}
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      
      <p className="text-gray-300 mb-4 text-sm">
        {description}
      </p>
      
      <div className="mt-auto">
        <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-1 rounded-full text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {highlight}
        </span>
      </div>
      
      {/* Progress circle that animates when in view */}
      {isInView && (
        <div className="absolute top-4 right-4 w-2 h-2">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 * index }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="20" y2="20">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default AiBenefitSection;
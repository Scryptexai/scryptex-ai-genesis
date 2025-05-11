import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Animation variants - keeping consistent with HeroSection
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

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const slideInRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const HowItWorksSection = () => {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Steps data
  const steps = [
    {
      id: 1,
      title: "AI-Powered Analysis",
      description: "Our multi-fetcher AI engine analyzes team, VCs, roadmap, and tokenomics to provide a comprehensive legitimacy score from 0-100.",
      icon: <AiAnalysisIcon />,
      delay: 0.2
    },
    {
      id: 2,
      title: "Effort-to-Value Calculation",
      description: "We predict potential ROI based on required effort, helping you focus on airdrops with the highest value for your time.",
      icon: <EffortValueIcon />,
      delay: 0.4
    },
    {
      id: 3,
      title: "Risk Assessment",
      description: "Deep analysis of smart contracts and teams to detect red flags before you invest your time and resources.",
      icon: <RiskDecoderIcon />,
      delay: 0.6
    },
    {
      id: 4,
      title: "Project Management",
      description: "Track and manage your airdrop portfolio with status tracking, reminders, and custom collection management.",
      icon: <ProjectSaverIcon />,
      delay: 0.8
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="how-it-works-section relative bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white py-24 overflow-hidden"
    >
      {/* Background elements */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
        >
          <motion.div 
            className="inline-block mb-2"
            variants={fadeIn}
          >
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Process
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            variants={fadeIn}
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Scryptex</span> Works
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Our AI-powered platform simplifies the airdrop hunting process while maximizing your rewards and minimizing risks.
          </motion.p>
        </motion.div>
        
        {/* Process steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-600 transform -translate-x-1/2 z-0">
            <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-purple-500 transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Steps */}
          <div className="relative z-10 space-y-20 lg:space-y-0">
            {steps.map((step, index) => (
              <StepItem 
                key={step.id}
                step={step}
                index={index}
                controls={controls}
              />
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div 
          className="mt-24 text-center"
          initial="hidden"
          animate={controls}
          variants={fadeIn}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Find the Best Airdrops?</h3>
            <p className="text-gray-300 mb-6">
              Join our early access program and be among the first to experience the power of AI-driven airdrop analysis.
            </p>
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
              Join Early Access
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Step Item Component
const StepItem = ({ step, index, controls }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
      initial="hidden"
      animate={controls}
      variants={staggerChildren}
    >
      {/* Step Number */}
      <motion.div 
        className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold"
        variants={fadeIn}
      >
        {step.id}
      </motion.div>
      
      {/* Step Content */}
      <motion.div 
        className="flex-1 lg:max-w-lg"
        variants={isEven ? slideInRight : slideInLeft}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 text-cyan-400">
            {step.icon}
          </div>
          <h3 className="text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-gray-300">{step.description}</p>
        
        {/* Feature Illustration */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-hidden">
          <FeatureIllustration step={step.id} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Background elements
const BackgroundElements = () => {
  return (
    <>
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
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
          <path d="M40,40 L160,40 L160,160 L40,160 Z" stroke="white" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>
    </>
  );
};

// Feature Illustrations
const FeatureIllustration = ({ step }) => {
  switch(step) {
    case 1:
      return (
        <div className="relative h-48">
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800/50 rounded-lg border border-white/10 p-4">
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/5 h-36 w-1/2 rounded-md p-2">
                <div className="h-4 w-3/4 bg-cyan-500/20 rounded mb-2"></div>
                <div className="h-3 w-full bg-white/10 rounded mb-1"></div>
                <div className="h-3 w-full bg-white/10 rounded mb-1"></div>
                <div className="h-3 w-4/5 bg-white/10 rounded mb-1"></div>
                <div className="h-6 w-1/3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded mt-4"></div>
              </div>
              <div className="flex-1">
                <div className="h-8 w-8 mb-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold">AI</div>
                <div className="h-4 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-16 w-full bg-white/5 rounded flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-700">
                    <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">87</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="relative h-48">
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800/50 rounded-lg border border-white/10 p-4">
            <div className="mb-4 h-6 w-1/2 bg-white/10 rounded"></div>
            <div className="flex justify-between mb-2">
              <div className="h-5 w-24 bg-white/5 rounded flex items-center px-2">
                <div className="h-3 w-3 rounded-full bg-cyan-500 mr-2"></div>
                <div className="h-2 w-12 bg-white/20 rounded"></div>
              </div>
              <div className="h-5 w-20 bg-white/10 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden mb-4">
              <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="flex gap-6 justify-between">
              <div className="text-center">
                <div className="h-5 w-full bg-white/5 rounded mb-1"></div>
                <div className="h-8 w-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md flex items-center justify-center">
                  <div className="h-4 w-4/5 bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="h-5 w-full bg-white/5 rounded mb-1"></div>
                <div className="h-8 w-full bg-white/5 rounded-md flex items-center justify-center">
                  <div className="h-4 w-4/5 bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="h-5 w-full bg-white/5 rounded mb-1"></div>
                <div className="h-8 w-full bg-white/5 rounded-md flex items-center justify-center">
                  <div className="h-4 w-4/5 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="relative h-48">
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800/50 rounded-lg border border-white/10 p-4">
            <div className="flex justify-between mb-4">
              <div className="h-6 w-1/3 bg-white/10 rounded"></div>
              <div className="h-6 w-8 bg-red-500/30 rounded-md flex items-center justify-center text-xs font-bold text-red-300">!</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-4/5 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-red-500/20 rounded mb-2 border border-red-500/30"></div>
                <div className="h-4 w-full bg-white/10 rounded"></div>
              </div>
              <div className="w-1/2 bg-white/5 rounded-lg p-2">
                <div className="h-6 flex items-center justify-between mb-2">
                  <div className="h-4 w-16 bg-white/10 rounded"></div>
                  <div className="h-5 w-5 rounded-full bg-red-500/30"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/10 rounded"></div>
                  <div className="h-3 w-full bg-white/10 rounded"></div>
                  <div className="h-3 w-full bg-red-500/20 rounded"></div>
                  <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="relative h-48">
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800/50 rounded-lg border border-white/10 p-4">
            <div className="flex justify-between mb-4">
              <div className="h-6 w-2/5 bg-white/10 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-white/10 rounded flex items-center justify-center">
                  <div className="h-3 w-3 bg-cyan-500 rounded-sm"></div>
                </div>
                <div className="h-6 w-6 bg-white/10 rounded flex items-center justify-center">
                  <div className="h-3 w-3 bg-white/20 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-full bg-white/5 rounded-md p-2 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <div className="h-3 w-12 bg-green-500/30 rounded"></div>
                </div>
              </div>
              <div className="h-12 w-full bg-white/5 rounded-md p-2 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                  <div className="h-4 w-32 bg-white/10 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <div className="h-3 w-12 bg-yellow-500/30 rounded"></div>
                </div>
              </div>
              <div className="h-12 w-full bg-white/5 rounded-md p-2 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="h-6 w-6 rounded-md bg-white/10"></div>
                  <div className="h-4 w-20 bg-white/10 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-500/20 rounded-full flex items-center justify-center">
                  <div className="h-3 w-12 bg-gray-500/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Icons
const AiAnalysisIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16H12.01M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7M5 9H19C19.5523 9 20 9.44772 20 10V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V10C4 9.44772 4.44772 9 5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const EffortValueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H21M9 21V9M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 15C15 14.4477 15.4477 14 16 14C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15Z" fill="currentColor"/>
  </svg>
);

const RiskDecoderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectSaverIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default HowItWorksSection;
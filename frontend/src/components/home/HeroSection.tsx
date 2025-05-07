import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Wallet, Gift, Database, PieChart } from "lucide-react";
import Lottie from 'react-lottie-player';
import web3analyst from '@components/animations/web3-analyst.json';

const ImprovedHeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const [animationData, setAnimationData] = useState(aiCharacterAnimation);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12 
      }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (custom: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: custom * 0.1,
        type: "spring", 
        stiffness: 70, 
        damping: 8 
      }
    })
  };

  const networkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  };

  // Control animation based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (animationData && isAnimationLoaded) {
        // Here you could control animation playback based on scroll position
        // For example, modifying frame position
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimationLoaded, animationData]);

  const featureItems = [
    { 
      icon: <Wallet className="h-5 w-5 text-scryptex-lightpurple" />,
      title: "Smart Wallet Tracking",
      description: "Monitor top wallets and their transaction patterns"
    },
    { 
      icon: <Gift className="h-5 w-5 text-scryptex-lightpurple" />,
      title: "Airdrop Predictions",
      description: "ML-powered airdrop predictions and eligibility checks"
    },
    { 
      icon: <Database className="h-5 w-5 text-scryptex-lightpurple" />,
      title: "On-Chain Analytics",
      description: "Real-time data analysis across multiple chains"
    },
    { 
      icon: <PieChart className="h-5 w-5 text-scryptex-lightpurple" />,
      title: "Investment Insights",
      description: "AI-generated insights for optimal on-chain decisions"
    }
  ];

  // Random token bubbles animation
  const generateTokenPositions = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20
    }));
  };

  const [tokenBubbles] = useState(generateTokenPositions());

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#0D0D0D] to-[#15082A]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0" 
        style={{ y, opacity }}
      >
        {/* Hexagonal grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M25,0 L50,14.3 L50,38.7 L25,53 L0,38.7 L0,14.3 Z" fill="none" stroke="#a855f7" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Animated Token Bubbles */}
        {tokenBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-r from-scryptex-purple/30 to-scryptex-lightpurple/30 backdrop-blur-md"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Network connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100,300 C200,200 300,600 400,400 C500,200 600,500 700,300 C800,100 900,400 950,300" 
            stroke="url(#purpleGradient)"
            strokeWidth="1"
            fill="none"
            variants={networkVariants}
          />
          <motion.path
            d="M100,500 C250,400 300,700 450,600 C600,500 750,800 900,700" 
            stroke="url(#purpleGradient)" 
            strokeWidth="1" 
            fill="none"
            variants={networkVariants}
          />
          <motion.path
            d="M200,100 C300,300 400,200 500,400 C600,600 700,300 800,500" 
            stroke="url(#purpleGradient)" 
            strokeWidth="1" 
            fill="none"
            variants={networkVariants}
          />
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#d8b4fe" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">
        <div className="lg:col-span-6 space-y-8">
          <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
            <div className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
            </div>
            <span className="text-sm font-medium text-scryptex-lightpurple">AI-POWERED WEB3 INTELLIGENCE</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-scryptex-purple via-scryptex-lightpurple to-white text-transparent bg-clip-text">
              Your AI Partner for Web3 Success
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-xl"
            variants={itemVariants}
          >
            Scryptex empowers airdrop hunters, project analysts, and on-chain investors with AI-driven tools that automate research and maximize your Web3 opportunities.
          </motion.p>
          
          {/* Feature grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6"
            variants={itemVariants}
          >
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-scryptex-purple/40 transition-all group"
                custom={index}
                variants={featureVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="w-8 h-8 rounded-md bg-black/50 flex items-center justify-center group-hover:bg-scryptex-purple/20 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="flex flex-wrap gap-4 pt-4" variants={itemVariants}>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Start Hunting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-white border-white/20 hover:bg-white/10 transition-all rounded-lg"
            >
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6 pt-4"
            variants={itemVariants}
          >
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full ring-2 ring-[#0D0D0D] bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="w-10 h-10 rounded-full ring-2 ring-[#0D0D0D] bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="w-10 h-10 rounded-full ring-2 ring-[#0D0D0D] bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
              <div className="w-10 h-10 rounded-full ring-2 ring-[#0D0D0D] bg-gradient-to-r from-red-500 to-red-600"></div>
              <div className="w-10 h-10 rounded-full ring-2 ring-[#0D0D0D] flex items-center justify-center bg-black text-xs font-medium text-white">5k+</div>
            </div>
            <div>
              <div className="text-white font-medium">10,000+ Hunters</div>
              <div className="text-xs text-gray-400">Finding airdrops daily</div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="lg:col-span-6 flex justify-center"
          variants={itemVariants}
        >
          {/* AI Character Animation Container */}
          <div className="relative w-full max-w-lg">
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-scryptex-purple/20 to-scryptex-lightpurple/20 rounded-2xl blur-2xl"
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            <div className="relative w-full aspect-square rounded-xl overflow-hidden gradient-border bg-black/50 backdrop-blur-sm p-4">
              {/* This is where we'd place the Lottie animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: '100%', height: '100%' }}
                  onLoad={() => setIsAnimationLoaded(true)}
                />
              </div>
              
              {/* HUD Elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div className="px-3 py-1 bg-black/70 rounded-full border border-scryptex-purple/30 text-xs text-scryptex-lightpurple flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Analysis
                </div>
                <div className="px-3 py-1 bg-black/70 rounded-full border border-scryptex-purple/30 text-xs text-white">
                  Gas: 24 Gwei
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="px-3 py-1 bg-black/70 rounded-full border border-scryptex-purple/30 text-xs text-white">
                  ETH: $3,852
                </div>
                <motion.div 
                  className="px-3 py-1 bg-scryptex-purple/80 rounded-full text-xs text-white font-medium flex items-center gap-1"
                  animate={{
                    scale: [1, 1.05, 1],
                    backgroundColor: ["rgba(168,85,247,0.8)", "rgba(216,180,254,0.8)", "rgba(168,85,247,0.8)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  <Gift className="w-3 h-3" /> 12 Airdrops Found
                </motion.div>
              </div>
              
              {/* Metamask-inspired interaction */}
              <AnimatePresence>
                {isAnimationLoaded && (
                  <motion.div
                    className="absolute top-1/4 right-4 p-2 bg-[#F6851B]/90 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        repeatDelay: 4
                      }}
                    >
                      <svg viewBox="0 0 318.6 318.6" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M274.1 35.5l-99.5 73.9L193 65.8z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M44.4 35.5l98.7 74.6-17.5-44.3zm193.9 171.3l-26.5 40.6 56.7 15.6 16.3-55.3z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M33.9 207.7L50 263l56.7-15.6-26.5-40.6z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-2">EXPLORE</div>
          <div className="w-5 h-10 rounded-full border border-gray-500 flex justify-center pt-1">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-scryptex-lightpurple"
              animate={{
                y: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ImprovedHeroSection;
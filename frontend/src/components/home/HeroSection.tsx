
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  const gridItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  const networkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.2,
      transition: { 
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background network lines */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-10 z-0" 
        style={{ y, opacity }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100,300 C200,200 300,600 400,400 C500,200 600,500 700,300 C800,100 900,400 950,300" 
            stroke="#a855f7"
            strokeWidth="1"
            fill="none"
            variants={networkVariants}
          />
          <motion.path
            d="M100,500 C250,400 300,700 450,600 C600,500 750,800 900,700" 
            stroke="#a855f7" 
            strokeWidth="1" 
            fill="none"
            variants={networkVariants}
          />
          <motion.path
            d="M200,100 C300,300 400,200 500,400 C600,600 700,300 800,500 C900,700 950,500 980,600" 
            stroke="#a855f7" 
            strokeWidth="1" 
            fill="none"
            variants={networkVariants}
          />
          <motion.path
            d="M150,400 C250,450 350,350 450,450 C550,550 650,350 750,450 C850,550 950,450 980,500" 
            stroke="#a855f7" 
            strokeWidth="1" 
            fill="none"
            variants={networkVariants}
          />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        <div>
          <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
            <div className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
            </div>
            <span className="text-sm font-medium text-scryptex-lightpurple">AI-POWERED INTELLIGENCE</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-scryptex-purple via-scryptex-lightpurple to-white text-transparent bg-clip-text">
              AI-Powered Web3 Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
            variants={itemVariants}
          >
            Scryptex empowers project analysts, airdrop farmers, and on-chain investors with smart tools that automate research and maximize opportunities.
          </motion.p>
          
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-black border-purple/20 hover:bg-purple/10 transition-all rounded-lg"
            >
            Explore Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex items-center gap-6"
            variants={itemVariants}
          >
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border border-[#0D0D0D]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 border border-[#0D0D0D]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 border border-[#0D0D0D]"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 border border-[#0D0D0D]"></div>
            </div>
            <span className="text-sm text-gray-400">Trusted by <span className="text-white font-medium">10,000+</span> researchers</span>
          </motion.div>
        </div>
        
        <motion.div className="relative" variants={itemVariants}>
          {/* 3D Sphere Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-scryptex-purple/20 to-scryptex-lightpurple/20 rounded-lg blur-2xl"></div>
          <div className="w-full max-w-lg mx-auto rounded-lg overflow-hidden gradient-border">
            <div className="bg-black/80 p-1">
              <div className="relative rounded-md overflow-hidden">
                {/* AI Brain Visualization */}
                <div className="bg-black/80 rounded-md p-4 backdrop-blur">
                  <div className="h-96 w-full rounded flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Neural Network Visualization */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-scryptex-purple/30"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 20,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      />
                      <motion.div 
                        className="absolute inset-4 rounded-full border-2 border-scryptex-lightpurple/40"
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 15,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      />
                      <motion.div 
                        className="absolute inset-8 rounded-full border-2 border-white/20"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 25,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      />
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.8,
                          type: "spring",
                          stiffness: 100,
                          damping: 10
                        }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-scryptex-purple to-scryptex-lightpurple rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                          <div className="w-20 h-20 bg-[#0D0D0D] rounded-full flex items-center justify-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">AI</div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Connection lines and nodes */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full bg-scryptex-lightpurple"
                          style={{
                            top: `${30 + Math.random() * 60}%`,
                            left: `${30 + Math.random() * 60}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.8, scale: 1 }}
                          transition={{ 
                            delay: 1 + i * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="text-xs text-gray-400 mb-2">SCROLL</div>
          <div className="w-5 h-10 rounded-full border border-gray-500 flex justify-center pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-scryptex-lightpurple"></div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;

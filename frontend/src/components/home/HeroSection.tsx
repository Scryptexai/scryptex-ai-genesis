import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Brain } from "lucide-react";

const ModernHeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX / innerWidth) - 0.5,
      y: (clientY / innerHeight) - 0.5
    });
  };

  // Scroll parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Spring-based smooth animations
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);
  
  const xSpring = useSpring(xMotion, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(yMotion, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    xMotion.set(mousePosition.x * 30);
    yMotion.set(mousePosition.y * 30);
  }, [mousePosition]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 40, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      }
    }
  };

  const gradientVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.6
      }
    }
  };

  const networkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3,
      transition: { 
        duration: 3,
        ease: "easeInOut",
        delay: 0.8
      }
    }
  };

  const nodeVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Generate random particle positions
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10
  }));

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0D0D]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseMove={handleMouseMove}
    >
      {/* Neural network background with gradient glow effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-scryptex-purple/20 blur-[120px]"
          style={{ x: xSpring, y: ySpring, opacity }}
          variants={gradientVariants}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-scryptex-lightpurple/20 blur-[100px]"
          style={{ x: xSpring, y: ySpring, opacity, scale }}
          variants={gradientVariants}
        />
        
        {/* Neural network lines */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-20 z-0"
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
              stroke="#9333ea" 
              strokeWidth="1.5" 
              fill="none"
              variants={networkVariants}
            />
            <motion.path
              d="M200,100 C300,300 400,200 500,400 C600,600 700,300 800,500 C900,700 950,500 980,600" 
              stroke="#a855f7" 
              strokeWidth="1.5" 
              fill="none"
              variants={networkVariants}
            />
            <motion.path
              d="M150,400 C250,450 350,350 450,450 C550,550 650,350 750,450 C850,550 950,450 980,500" 
              stroke="#7e22ce" 
              strokeWidth="1" 
              fill="none"
              variants={networkVariants}
            />
            {/* Additional curved paths */}
            <motion.path
              d="M100,150 C200,50 300,200 400,100 C500,50 600,200 700,100 C800,50 900,200 950,150" 
              stroke="#a855f7"
              strokeWidth="0.7"
              fill="none"
              variants={networkVariants}
            />
            <motion.path
              d="M50,650 C150,700 250,600 350,700 C450,800 550,600 650,700 C750,800 850,700 950,750" 
              stroke="#9333ea" 
              strokeWidth="0.7" 
              fill="none"
              variants={networkVariants}
            />
          </svg>
          
          {/* Animated network nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-scryptex-lightpurple"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${15 + Math.random() * 70}%`,
                boxShadow: '0 0 8px #a855f7'
              }}
              variants={nodeVariants}
              animate="pulse"
              transition={{ delay: i * 0.2 }}
            />
          ))}
          
          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [`${particle.y}%`, `${particle.y - 10}%`, `${particle.y}%`],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        <div>
          <motion.div 
            className="flex items-center gap-2 mb-6 bg-gradient-to-r from-scryptex-purple/20 to-scryptex-lightpurple/20 backdrop-blur-sm py-2 px-3 rounded-full w-fit"
            variants={itemVariants}
          >
            <div className="w-6 h-6 bg-scryptex-purple/30 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-scryptex-lightpurple" />
            </div>
            <span className="text-xs font-medium text-scryptex-lightpurple tracking-wider">AI-POWERED INTELLIGENCE</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-scryptex-purple via-scryptex-lightpurple to-white text-transparent bg-clip-text">
              AI-Powered Web3 Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed"
            variants={itemVariants}
          >
            Scryptex empowers project analysts, airdrop farmers, and on-chain investors with smart tools that automate research and maximize opportunities.
          </motion.p>
          
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Link to="/dashboard" className="flex items-center gap-2 py-6">
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-purple-500/20 hover:bg-purple-500/10 text-white transition-all rounded-lg py-6"
            >
              Explore Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex items-center gap-6"
            variants={itemVariants}
          >
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-[#0D0D0D] shadow-lg"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-[#0D0D0D] shadow-lg"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 border-2 border-[#0D0D0D] shadow-lg"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 border-[#0D0D0D] shadow-lg"></div>
            </div>
            <span className="text-sm text-gray-400">Trusted by <span className="font-medium text-white">10,000+</span> researchers</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="relative flex items-center justify-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {/* Web3 Airdrop Hunter Character Visual */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-scryptex-purple/30 to-scryptex-lightpurple/30 rounded-2xl blur-3xl opacity-70"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          />
          
          <div className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden relative">
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple opacity-50 blur-sm"></div>
            
            <div className="bg-black/80 backdrop-blur-lg p-1 rounded-2xl relative">
              <div className="relative rounded-xl overflow-hidden bg-black/90">
                {/* Web3 Hunter Visualization */}
                <div className="bg-[#0D0D0D]/90 rounded-xl p-4 backdrop-blur-sm">
                  <div className="h-96 w-full rounded-lg flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Futuristic Grid Background */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          {/* Horizontal lines */}
                          {[...Array(10)].map((_, i) => (
                            <motion.line 
                              key={`h-line-${i}`}
                              x1="0" 
                              y1={10 * i} 
                              x2="100" 
                              y2={10 * i}
                              stroke="#a855f7"
                              strokeWidth="0.2"
                              initial={{ opacity: 0, pathLength: 0 }}
                              animate={{ opacity: 0.4, pathLength: 1 }}
                              transition={{ duration: 1.5, delay: i * 0.1 }}
                            />
                          ))}
                          {/* Vertical lines */}
                          {[...Array(10)].map((_, i) => (
                            <motion.line 
                              key={`v-line-${i}`}
                              x1={10 * i} 
                              y1="0" 
                              x2={10 * i} 
                              y2="100"
                              stroke="#a855f7"
                              strokeWidth="0.2"
                              initial={{ opacity: 0, pathLength: 0 }}
                              animate={{ opacity: 0.4, pathLength: 1 }}
                              transition={{ duration: 1.5, delay: i * 0.1 }}
                            />
                          ))}
                        </svg>
                      </div>

                      {/* AI Hunter Character */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="relative w-48 h-64"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          {/* Character head with VR headset */}
                          <motion.div 
                            className="absolute w-20 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full top-0 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {/* VR Headset */}
                            <div className="absolute inset-0 rounded-full border-2 border-scryptex-purple overflow-hidden">
                              <div className="absolute top-1/4 left-0 right-0 h-8 bg-scryptex-lightpurple/50 backdrop-blur-sm"></div>
                              
                              {/* Glowing HUD elements */}
                              <motion.div 
                                className="absolute top-1/3 left-1/4 w-10 h-4 bg-scryptex-lightpurple/40 rounded-sm"
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                          </motion.div>
                          
                          {/* Character body */}
                          <motion.div 
                            className="absolute w-32 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl top-16 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, 2, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                          >
                            {/* Circuitry lines on body */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                              <motion.path 
                                d="M5,5 L15,5 L15,15 L25,15 L25,30" 
                                stroke="#a855f7" 
                                strokeWidth="0.5" 
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.8 }}
                                transition={{ duration: 2, delay: 1 }}
                              />
                              <motion.path 
                                d="M27,5 L17,5 L17,20 L10,20 L10,30" 
                                stroke="#a855f7" 
                                strokeWidth="0.5" 
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.8 }}
                                transition={{ duration: 2, delay: 1.3 }}
                              />
                            </svg>
                            
                            {/* Digital HUD display */}
                            <motion.div 
                              className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-12 border border-scryptex-purple/70 rounded bg-black/50 overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5, duration: 0.6 }}
                            >
                              {/* HUD Content - Transaction Data */}
                              <div className="p-1 text-xs">
                                <motion.div 
                                  className="h-1 w-full bg-scryptex-purple/50 mb-1 rounded-full overflow-hidden"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: 1.8, delay: 1.8 }}
                                >
                                  <motion.div 
                                    className="h-full bg-scryptex-lightpurple"
                                    animate={{ 
                                      x: ['-100%', '0%', '100%'] 
                                    }}
                                    transition={{ 
                                      duration: 2, 
                                      repeat: Infinity,
                                      ease: "easeInOut" 
                                    }}
                                  />
                                </motion.div>
                                
                                <motion.div 
                                  className="flex items-center gap-1"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.9 }}
                                  transition={{ delay: 2, duration: 0.4 }}
                                >
                                  <div className="w-1 h-1 bg-scryptex-lightpurple rounded-full" />
                                  <div className="text-[6px] text-scryptex-lightpurple">SCANNING CHAIN</div>
                                </motion.div>
                                
                                <motion.div 
                                  className="mt-1 text-[5px] text-gray-400"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
                                >
                                  <div>0xF3...A7B2</div>
                                  <div>AIR: 215.5</div>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      {/* Floating Tokens/Coins */}
                      {[...Array(6)].map((_, i) => {
                        const size = 8 + Math.random() * 10;
                        const angle = (i / 6) * Math.PI * 2;
                        const distance = 80 + Math.random() * 40;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        return (
                          <motion.div
                            key={`token-${i}`}
                            className="absolute rounded-full flex items-center justify-center"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              left: "50%",
                              top: "50%",
                              marginLeft: "-4px",
                              marginTop: "-4px",
                              x,
                              y,
                              boxShadow: '0 0 8px rgba(168,85,247,0.7)',
                              background: `linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)`
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 360],
                              boxShadow: [
                                '0 0 4px rgba(168,85,247,0.5)', 
                                '0 0 12px rgba(168,85,247,0.8)', 
                                '0 0 4px rgba(168,85,247,0.5)'
                              ]
                            }}
                            transition={{
                              duration: 5 + i,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <div className="text-[8px] text-white font-bold">
                              {['ETH', 'SOL', 'AIR', 'NFT', 'BTC', 'APT'][i]}
                            </div>
                          </motion.div>
                        );
                      })}
                      
                      {/* Airdrop Boxes */}
                      {[...Array(2)].map((_, i) => {
                        const offsetX = i === 0 ? -100 : 100;
                        const offsetY = i === 0 ? -70 : 70;
                        const delay = i * 4;
                        
                        return (
                          <motion.div
                            key={`airdrop-${i}`}
                            className="absolute w-14 h-14 rounded-md flex items-center justify-center overflow-hidden"
                            style={{
                              left: "50%",
                              top: "50%",
                              marginLeft: "-20px",
                              marginTop: "-20px",
                              x: offsetX,
                              y: offsetY,
                              background: 'linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(126,34,206,0.3) 100%)',
                              border: '1px solid rgba(168,85,247,0.5)',
                              boxShadow: '0 0 20px rgba(168,85,247,0.2)'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 1, 0],
                              scale: [0, 1, 1, 0],
                              y: [offsetY, offsetY, offsetY - 30, offsetY - 30]
                            }}
                            transition={{
                              duration: 3,
                              delay: delay,
                              repeat: Infinity,
                              repeatDelay: 8,
                              times: [0, 0.1, 0.9, 1],
                              ease: "easeInOut"
                            }}
                          >
                            <motion.div 
                              className="text-lg font-bold text-white"
                              animate={{ y: [10, 0, 0, -10], opacity: [0, 1, 1, 0] }}
                              transition={{
                                duration: 3,
                                delay: delay,
                                repeat: Infinity,
                                repeatDelay: 8,
                                times: [0, 0.1, 0.9, 1],
                                ease: "easeInOut"
                              }}
                            >
                              🎁
                            </motion.div>
                          </motion.div>
                        );
                      })}
                      
                      {/* Animated Transaction Lines */}
                      {[...Array(8)].map((_, i) => {
                        const startAngle = (i / 8) * Math.PI * 2;
                        const endAngle = ((i + 2) / 8) * Math.PI * 2;
                        const startRadius = 120;
                        const endRadius = 50;
                        
                        const startX = Math.cos(startAngle) * startRadius;
                        const startY = Math.sin(startAngle) * startRadius;
                        const endX = Math.cos(endAngle) * endRadius;
                        const endY = Math.sin(endAngle) * endRadius;
                        
                        return (
                          <svg 
                            key={`tx-line-${i}`} 
                            className="absolute left-1/2 top-1/2 w-full h-full" 
                            style={{ width: '100%', height: '100%', transform: 'translate(-50%, -50%)' }}
                            viewBox="-150 -150 300 300"
                          >
                            <motion.circle
                              cx={startX}
                              cy={startY}
                              r="3"
                              fill="#a855f7"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.4, 0.7, 0.4] }}
                              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                            />
                            
                            <motion.path
                              d={`M ${startX},${startY} Q 0,0 ${endX},${endY}`}
                              stroke="#a855f7"
                              strokeWidth="0.5"
                              strokeDasharray="2 2"
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ 
                                pathLength: [0, 1, 1, 0], 
                                opacity: [0, 0.5, 0.5, 0] 
                              }}
                              transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                repeatDelay: 2,
                                delay: i * 0.5,
                                times: [0, 0.3, 0.7, 1]
                              }}
                            />
                          </svg>
                        );
                      })}
                      
                      {/* Wallet Icons */}
                      {[...Array(3)].map((_, i) => {
                        const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
                        const distance = 130;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        return (
                          <motion.div
                            key={`wallet-${i}`}
                            className="absolute rounded-lg flex items-center justify-center"
                            style={{
                              width: "24px",
                              height: "24px",
                              left: "50%",
                              top: "50%",
                              marginLeft: "-12px",
                              marginTop: "-12px",
                              x,
                              y,
                              background: 'rgba(30,30,30,0.8)',
                              border: '1px solid rgba(168,85,247,0.4)',
                              boxShadow: '0 0 10px rgba(168,85,247,0.3)'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 2 + i * 0.3,
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }}
                          >
                            <div className="text-[8px] font-bold">
                              {i === 0 ? (
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">M</div>
                              ) : i === 1 ? (
                                <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">P</div>
                              ) : (
                                <div className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">W</div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                      
                      {/* Blockchain Connection Nodes */}
                      {[...Array(4)].map((_, i) => {
                        const angle = (i / 4) * Math.PI * 2;
                        const radius = 140;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                          <motion.div
                            key={`node-${i}`}
                            className="absolute rounded-full"
                            style={{
                              width: "8px",
                              height: "8px",
                              left: "50%",
                              top: "50%",
                              marginLeft: "-4px",
                              marginTop: "-4px",
                              x,
                              y,
                              background: `linear-gradient(135deg, rgba(168,85,247,0.5) 0%, rgba(126,34,206,0.5) 100%)`,
                              boxShadow: '0 0 10px rgba(168,85,247,0.5)'
                            }}
                            animate={{
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                '0 0 5px rgba(168,85,247,0.4)', 
                                '0 0 15px rgba(168,85,247,0.7)', 
                                '0 0 5px rgba(168,85,247,0.4)'
                              ]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.7,
                              ease: "easeInOut"
                            }}
                          />
                        );
                      })}
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
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-2 tracking-wider font-light">SCROLL</div>
          <div className="w-5 h-10 rounded-full border border-scryptex-purple/50 flex justify-center pt-1">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-scryptex-lightpurple"
              animate={{ 
                y: [0, 4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ boxShadow: '0 0 5px rgba(168,85,247,0.7)' }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ModernHeroSection;
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation, useTransform, useSpring } from "framer-motion";
import {
  Search,
  Wallet,
  Rocket,
  Database,
  ArrowRight,
  Cpu,
  Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize(); // Initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Update mouse position for particle effects
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const features = [
    {
      icon: Search,
      iconColor: "#a855f7",
      title: "AI Project Analyzer",
      description: "Instantly analyze any Web3 project's tokenomics, team history, and contract security with our AI-powered research tools."
    },
    {
      icon: Wallet,
      iconColor: "#38bdf8",
      title: "Wallet Activity Tracker",
      description: "Monitor and analyze on-chain activity across multiple wallets. Get real-time alerts on whale movements and token transfers."
    },
    {
      icon: Rocket,
      iconColor: "#fb7185",
      title: "Farming Automation Agent",
      description: "Let our AI agents handle DeFi farming strategies, gas optimization, and position management to maximize your yields."
    },
    {
      icon: Database,
      iconColor: "#4ade80",
      title: "Multi-chain Wallet Tools",
      description: "One platform for all your Web3 needs across any blockchain. Track, analyze, and optimize your entire portfolio."
    }
  ];

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
    hidden: { y: 60, opacity: 0 },
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

  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.4,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };

  // Circle animation for feature icons
  const circleVariants = {
    initial: {
      scale: 1,
      opacity: 0.5
    },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Pulse animation for feature cards
  const pulseVariants = {
    initial: {
      boxShadow: "0 0 0 rgba(168, 85, 247, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)"
    },
    hover: {
      boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
      borderColor: "rgba(168, 85, 247, 0.5)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Neural network connections
  const getConnectionPath = (index1: number, index2: number, cols: number, offset: {x: number, y: number}) => {
    const row1 = Math.floor(index1 / cols);
    const col1 = index1 % cols;
    const row2 = Math.floor(index2 / cols);
    const col2 = index2 % cols;
    
    // Approximate card positions in grid
    const x1 = offset.x + col1 * (250 + 30) + 125;
    const y1 = offset.y + row1 * (350 + 30) + 175;
    const x2 = offset.x + col2 * (250 + 30) + 125;
    const y2 = offset.y + row2 * (350 + 30) + 175;
    
    // Control points for curve
    const cpx = (x1 + x2) / 2;
    const cpy = (y1 + y2) / 2 - 30;
    
    return `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`;
  };

  // Generate particles for hover effect
  const generateParticles = (count: number, cardIndex: number) => {
    const particles = [];
    const cardsBounds = document.querySelectorAll('.feature-card');
    
    if (cardsBounds.length === 0 || cardIndex === null) return [];
    
    const cardBound = cardsBounds[cardIndex].getBoundingClientRect();
    const centerX = cardBound.left + cardBound.width / 2;
    const centerY = cardBound.top + cardBound.height / 2;
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 20;
      
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 4 + 1,
        color: features[cardIndex].iconColor,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 0.5
      });
    }
    
    return particles;
  };

  // Determine the grid columns based on window width
  const getGridCols = () => {
    if (windowSize.width < 768) return 1;
    if (windowSize.width < 1024) return 2;
    return 4;
  };

  // Calculate card width based on grid columns
  const getCardWidth = () => {
    const cols = getGridCols();
    if (cols === 1) return "100%";
    if (cols === 2) return "calc(50% - 16px)";
    return "calc(25% - 24px)";
  };

  const gridCols = getGridCols();
  const cardWidth = getCardWidth();

  return (
    <section id="features" ref={ref} className="py-32 relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-scryptex-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl" />
      
      {/* Animated particles */}
      {hoverIndex !== null && isInView && generateParticles(20, hoverIndex).map((particle, i) => (
        <motion.div
          key={`particle-${hoverIndex}-${i}`}
          className="absolute rounded-full pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
            x: [particle.x, particle.x + (Math.random() * 40 - 20)],
            y: [particle.y, particle.y + (Math.random() * 40 - 20)]
          }}
          transition={{ 
            duration: 1.5 + Math.random() * 0.5,
            delay: particle.delay,
            ease: "easeOut"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
      
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-scryptex-purple/20 to-scryptex-purple/10 rounded-full backdrop-blur-sm border border-scryptex-purple/20 text-scryptex-lightpurple text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Cpu className="h-4 w-4" />
            <span>INTELLIGENT FEATURES</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-scryptex-lightpurple to-white bg-clip-text text-transparent">
            Supercharge Your Web3 Research
          </h2>
          
          <p className="text-gray-300 md:text-lg">
            Advanced AI tools that bring clarity and automation to your Web3 research and strategy.
          </p>
        </motion.div>
        
        {/* Neural network connections */}
        <div className="relative">
          {isInView && windowSize.width > 768 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Horizontal connection */}
              <motion.path
                d={getConnectionPath(0, 1, gridCols, {x: 0, y: 0})}
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
                strokeDasharray="5,5"
              />
              
              {/* Vertical connection */}
              <motion.path
                d={getConnectionPath(0, 2, gridCols, {x: 0, y: 0})}
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
                strokeDasharray="5,5"
              />
              
              {/* Diagonal connection */}
              <motion.path
                d={getConnectionPath(0, 3, gridCols, {x: 0, y: 0})}
                stroke="url(#gradient3)"
                strokeWidth="1.5"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
                strokeDasharray="5,5"
              />
              
              {/* Bottom horizontal connection */}
              <motion.path
                d={getConnectionPath(2, 3, gridCols, {x: 0, y: 0})}
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
                strokeDasharray="5,5"
              />
              
              {/* Right vertical connection */}
              <motion.path
                d={getConnectionPath(1, 3, gridCols, {x: 0, y: 0})}
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                fill="none"
                variants={connectionVariants}
                initial="hidden"
                animate="visible"
                strokeDasharray="5,5"
              />
              
              {/* Moving particles along connections */}
              {[0, 1, 2, 3, 4].map((_, i) => (
                <motion.circle
                  key={`particle-connection-${i}`}
                  r="3"
                  fill="white"
                  filter="drop-shadow(0 0 3px rgba(168, 85, 247, 0.8))"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    pathOffset: [0, 1],
                    pathLength: 1
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.8,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <animateMotion
                    path={getConnectionPath(i % 2 === 0 ? 0 : 2, i % 2 === 0 ? 3 : 1, gridCols, {x: 0, y: 0})}
                    dur="3s"
                    begin={`${i * 0.8}s`}
                    repeatCount="indefinite"
                  />
                </motion.circle>
              ))}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="feature-card relative overflow-hidden backdrop-blur-md rounded-2xl transition-all duration-500 h-[350px]"
                style={{
                  background: `radial-gradient(circle at center, rgba(13, 13, 13, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)`,
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                variants={pulseVariants}
                initial="initial"
                whileHover="hover"
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
              >
                {/* Card inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent border border-white/10 rounded-2xl group-hover:border-scryptex-purple/30 transition-all duration-500 overflow-hidden">
                  {/* Glowing border effect on hover */}
                  {hoverIndex === index && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `linear-gradient(to bottom right, transparent, transparent), linear-gradient(to bottom left, ${feature.iconColor}20, transparent)`,
                        borderRadius: "16px",
                        padding: "1px",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "xor",
                      }}
                    />
                  )}
                </div>
                
                <div className="p-8 h-full flex flex-col relative z-10">
                  {/* Animated icon */}
                  <div className="mb-8 relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle at center, ${feature.iconColor}40 0%, ${feature.iconColor}10 70%, transparent 100%)` 
                      }}
                      variants={circleVariants}
                      initial="initial"
                      animate="animate"
                    />
                    
                    <div className="relative z-10 p-4 rounded-full bg-[#111827]/80 border border-[#1e293b] backdrop-blur-md w-fit">
                      <feature.icon 
                        className="h-8 w-8" 
                        style={{ color: feature.iconColor }}
                      />
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full blur-md" 
                      style={{ 
                        background: `radial-gradient(circle at center, ${feature.iconColor}20 0%, transparent 70%)`,
                        opacity: hoverIndex === index ? 0.8 : 0.4,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{feature.title}</h3>
                  <p className="text-gray-400 flex-1 mb-6">{feature.description}</p>
                  
                  <motion.div 
                    className="flex items-center text-scryptex-lightpurple transition-transform duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                  
                  {/* Hover effects */}
                  {hoverIndex === index && (
                    <>
                      {/* Pulsing glow */}
                      <motion.div 
                        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
                        style={{
                          background: `radial-gradient(circle at center, ${feature.iconColor}30 0%, transparent 70%)`,
                          filter: 'blur(20px)'
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      
                      {/* Sparkling dots */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${index}-${i}`}
                          className="absolute"
                          style={{
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            boxShadow: `0 0 5px ${feature.iconColor}`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1 + Math.random(),
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2,
                            delay: Math.random()
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom fluid particle animation */}
        <motion.div
          className="mt-16 h-16 relative overflow-hidden rounded-full mx-auto w-3/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isInView && [...Array(30)].map((_, i) => (
              <motion.div
                key={`fluid-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  backgroundColor: i % 4 === 0 ? '#a855f7' : 
                                   i % 4 === 1 ? '#38bdf8' : 
                                   i % 4 === 2 ? '#fb7185' : '#4ade80',
                  filter: 'blur(1px)',
                  boxShadow: `0 0 6px ${i % 4 === 0 ? '#a855f7' : 
                                        i % 4 === 1 ? '#38bdf8' : 
                                        i % 4 === 2 ? '#fb7185' : '#4ade80'}`
                }}
                animate={{
                  x: [
                    Math.random() * windowSize.width - windowSize.width / 2, 
                    Math.random() * windowSize.width - windowSize.width / 2
                  ],
                  y: [
                    Math.random() * 50 - 25, 
                    Math.random() * 50 - 25
                  ],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
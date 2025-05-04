
import { motion } from 'framer-motion';
import { Cpu, Network, Sparkles } from 'lucide-react';

const WelcomeBanner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Fixed icon animation variants - using correct enum value for repeatType
  const iconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 rounded-2xl mb-6 p-6 border border-purple-800/30 relative overflow-hidden"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: `${i * 100}px`,
              height: `${i * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex items-center">
        <div className="flex-grow">
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-1"
          >
            Explore AI-Powered Web3 Projects
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-purple-200/80"
          >
            Uncover insights, discover opportunities, and stay ahead with Scryptex AI
          </motion.p>
        </div>
        
        <motion.div 
          className="flex items-center space-x-3 hidden md:flex"
          variants={containerVariants}
        >
          <motion.div 
            className="h-10 w-10 rounded-full bg-purple-900/50 flex items-center justify-center"
            variants={iconVariants}
            animate="animate"
          >
            <Cpu size={20} className="text-purple-300" />
          </motion.div>
          <motion.div 
            className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center"
            variants={iconVariants}
            animate="animate"
          >
            <Network size={20} className="text-blue-300" />
          </motion.div>
          <motion.div 
            className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center"
            variants={iconVariants}
            animate="animate"
          >
            <Sparkles size={20} className="text-indigo-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;

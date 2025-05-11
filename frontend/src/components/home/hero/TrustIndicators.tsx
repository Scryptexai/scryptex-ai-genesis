import React from 'react';
import { motion } from 'framer-motion';
import LiveCounter from './LiveCounter';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      value: 8743,
      label: 'Hunters Waitlisted',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-500/10',
      icon: '👥',
      decimals: 0
    },
    {
      value: 1.2,
      label: 'Airdrops Claimed',
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/20 to-cyan-500/10',
      icon: '💰',
      decimals: 1,
      prefix: '$',
      suffix: 'M+'
    },
    {
      value: 247,
      label: 'Protocols Tracked',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-500/10',
      icon: '🔗',
      decimals: 0
    },
    {
      value: 99.7,
      label: 'Success Rate',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-yellow-500/10',
      icon: '🎯',
      decimals: 1,
      suffix: '%'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
    >
      {indicators.map((indicator, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 10 }
          }}
          className="relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
            className={`bg-gradient-to-r ${indicator.bgColor} backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center group`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Icon with animation */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="text-2xl mb-2"
            >
              {indicator.icon}
            </motion.div>
            
            {/* Value with counter animation */}
            <div className={`text-2xl font-bold ${indicator.color} mb-1`}>
              {indicator.prefix}
              <LiveCounter 
                end={indicator.value} 
                duration={2} 
                decimals={indicator.decimals}
              />
              {indicator.suffix}
            </div>
            
            {/* Label */}
            <div className="text-xs text-gray-400">
              {indicator.label}
            </div>
            
            {/* Pulse effect on hover */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.2 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-2xl ${indicator.bgColor} blur-xl`}
            />
          </motion.div>
          
          {/* Floating particles effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -40, -20],
                x: [0, 10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: index * 0.3 + i * 0.5,
                ease: "easeInOut"
              }}
              className={`absolute bottom-0 left-1/2 w-1 h-1 rounded-full ${
                indicator.color.replace('text-', 'bg-')
              }`}
              style={{
                left: `${30 + i * 20}%`
              }}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrustIndicators;
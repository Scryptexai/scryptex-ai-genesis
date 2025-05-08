// TokenIcons.tsx
import React from 'react';
import { motion } from 'framer-motion';
import CryptoIcons from './CryptoIcons';

type TokenProps = {
  icon: string; // URL of the icon
  x: string;
  y: string;
  size: string;
  delay: number;
};

const Token: React.FC<TokenProps> = ({ icon, x, y, size, delay }) => {
  // Animation for floating effect
  const floatingAnimation = {
    y: ['-10px', '10px', '-10px'],
    transition: {
      duration: 4,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      delay
    }
  };
  
  // Animation for pulsing glow effect
  const glowAnimation = {
    boxShadow: [
      '0 0 5px rgba(139, 92, 246, 0.3)',
      '0 0 15px rgba(139, 92, 246, 0.7)',
      '0 0 5px rgba(139, 92, 246, 0.3)'
    ],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      delay: delay + 0.5
    }
  };
  
  return (
    <motion.div
      className={`absolute ${size} rounded-full bg-purple-900 bg-opacity-80 flex items-center justify-center shadow-lg`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 0.9, 
        scale: 1,
        ...floatingAnimation,
        ...glowAnimation
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay }
      }}
    >
      <img src={icon} alt="" className="w-full h-full object-contain" />
    </motion.div>
  );
};

const TokenIcons: React.FC = () => {
  // Token configuration
  const tokens = [
    { icon: CryptoIcons.ETH, x: '70%', y: '15%', size: 'w-12 h-12', delay: 0.2 },
    { icon: CryptoIcons.SOL, x: '80%', y: '25%', size: 'w-10 h-10', delay: 0.4 },
    { icon: CryptoIcons.ARB, x: '75%', y: '70%', size: 'w-14 h-14', delay: 0.6 },
    { icon: CryptoIcons.OP, x: '85%', y: '80%', size: 'w-9 h-9', delay: 0.8 },
    { icon: CryptoIcons.APT, x: '15%', y: '75%', size: 'w-11 h-11', delay: 1.0 }
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {tokens.map((token, index) => (
        <Token
          key={index}
          icon={token.icon}
          x={token.x}
          y={token.y}
          size={token.size}
          delay={token.delay}
        />
      ))}
    </div>
  );
};

export default TokenIcons;
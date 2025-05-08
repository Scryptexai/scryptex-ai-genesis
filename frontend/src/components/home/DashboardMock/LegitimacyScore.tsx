// components/LegitimacyScore.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface LegitimacyScoreProps {
  score: number;
}

const LegitimacyScore: React.FC<LegitimacyScoreProps> = ({ score }) => {
  // Calculate the color based on score
  const getScoreColor = (score: number) => {
    if (score < 50) return "from-red-500 to-orange-500"; 
    if (score < 75) return "from-yellow-500 to-green-500";
    return "from-purple-500 to-blue-500";
  };

  // Calculate the percentage of the complete circle
  const pathLength = score / 100;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background circle */}
      <div className="w-32 h-32 rounded-full border-4 border-gray-700 flex items-center justify-center">
        {/* Animated progress arc */}
        <svg className="absolute top-0 left-0" width="130" height="130" viewBox="0 0 130 130">
          <motion.path
            d="M 65 10 A 55 55 0 1 1 65 120 A 55 55 0 1 1 65 10"
            fill="none"
            stroke={`url(#legitimacyGradient-${score})`}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={`legitimacyGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" className={`text-${getScoreColor(score).split(' ')[0]}`} />
              <stop offset="100%" stopColor="currentColor" className={`text-${getScoreColor(score).split(' ')[1]}`} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-3xl font-bold text-white">{score}</div>
          <p className="text-sm text-gray-300">Legitimacy</p>
          <div className="text-xs mt-1 text-gray-400">AI Verified</div>
        </motion.div>
      </div>
      
      {/* Score details */}
      <motion.div
        className="absolute -bottom-8 text-xs text-center w-full text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        {score >= 80 ? "Highly Legitimate" : score >= 60 ? "Medium Risk" : "High Risk"}
      </motion.div>
    </div>
  );
};

export default LegitimacyScore;
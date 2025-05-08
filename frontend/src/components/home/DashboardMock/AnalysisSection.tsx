// components/AnalysisSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisBarProps {
  title: string;
  percentage: number;
  delay: number;
}

const AnalysisBar: React.FC<AnalysisBarProps> = ({ title, percentage, delay }) => {
  // Choose color based on percentage
  const getBarColor = () => {
    if (percentage < 50) return "from-red-500 to-orange-500";
    if (percentage < 75) return "from-yellow-500 to-green-500";
    return "from-purple-500 to-blue-500";
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{title}</span>
        <span className="text-sm font-bold text-gray-200">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const AnalysisSection: React.FC = () => {
  return (
    <div>
      <AnalysisBar title="Team Verification" percentage={80} delay={0.3} />
      <AnalysisBar title="Smart Contract Audit" percentage={90} delay={0.5} />
      <AnalysisBar title="Tokenomics" percentage={75} delay={0.7} />
      <AnalysisBar title="Community Engagement" percentage={85} delay={0.9} />
      <AnalysisBar title="Risk Assessment" percentage={70} delay={1.1} />
      
      <motion.div
        className="mt-4 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
          <span>Analysis based on 240+ data points</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisSection;
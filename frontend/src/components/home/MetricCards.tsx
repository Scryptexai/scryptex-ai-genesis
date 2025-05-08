// MetricCards.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type MetricCardProps = {
  value: string;
  label: string;
  delay: number;
};

const MetricCard: React.FC<MetricCardProps> = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  
  useEffect(() => {
    if (numericValue > 0) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < numericValue) {
            return Math.min(prevCount + Math.ceil(numericValue / 20), numericValue);
          }
          clearInterval(interval);
          return numericValue;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [numericValue]);
  
  const displayValue = value.includes('%') 
    ? `${count}%` 
    : value.includes('x') 
      ? `${count}x` 
      : count.toString();
  
  return (
    <motion.div
      className="bg-purple-900 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-purple-500 border-opacity-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: delay
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)"
      }}
    >
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          {displayValue}
        </span>
        <span className="text-sm text-gray-300 mt-1">{label}</span>
      </div>
    </motion.div>
  );
};

const MetricCards: React.FC = () => {
  const metrics = [
    { value: '85%', label: 'Accuracy Rate' },
    { value: '10x', label: 'Faster Analysis' },
    { value: '90%', label: 'Scam Detection' }
  ];
  
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          value={metric.value}
          label={metric.label}
          delay={0.3 + index * 0.1}
        />
      ))}
    </div>
  );
};

export default MetricCards;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Chart } from 'lucide-react';

interface StatsWidgetProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatsWidget = ({
  title,
  value,
  icon,
  trend = 'neutral',
  trendValue,
  className = '',
}: StatsWidgetProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate count up
  useEffect(() => {
    const animateValue = () => {
      const step = value / 20;
      let current = 0;
      
      const interval = setInterval(() => {
        current += step;
        if (current >= value) {
          clearInterval(interval);
          setDisplayValue(value);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, 50);
      
      return () => clearInterval(interval);
    };
    
    animateValue();
  }, [value]);
  
  return (
    <motion.div 
      className={`${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <DashboardCard className="h-full">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-purple-900/30 p-3 text-purple-400">
            {icon || <Chart size={24} />}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{displayValue}</span>
              
              {trendValue && (
                <span className={`text-xs ${
                  trend === 'up' ? 'text-green-400' : 
                  trend === 'down' ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {trendValue}
                </span>
              )}
            </div>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};

export default StatsWidget;

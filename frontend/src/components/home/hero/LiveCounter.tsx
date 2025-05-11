import React, { useEffect, useState } from 'react';

interface LiveCounterProps {
  end: number;
  duration: number;
  decimals?: number;
}

const LiveCounter: React.FC<LiveCounterProps> = ({ end, duration, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end * Math.pow(10, decimals)) / Math.pow(10, decimals));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, decimals]);

  return <>{count.toLocaleString()}</>;
};

export default LiveCounter;
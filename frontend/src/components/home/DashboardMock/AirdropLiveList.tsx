// components/AirdropLiveList.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AirdropItemProps {
  name: string;
  category: string;
  score: number;
  status: 'upcoming' | 'active' | 'ended';
  deadline: string;
  index: number;
}

const AirdropItem: React.FC<AirdropItemProps> = ({ name, category, score, status, deadline, index }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming': return 'bg-blue-600 text-blue-200';
      case 'active': return 'bg-green-600 text-green-200';
      case 'ended': return 'bg-gray-600 text-gray-200';
    }
  };
  
  const getScoreColor = () => {
    if (score < 50) return 'text-red-200';
    if (score < 75) return 'text-yellow-200';
    return 'text-green-200';
  };

  return (
    <motion.div 
      className="p-2 bg-gray-700 rounded-lg mb-2 flex items-center justify-between"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 * index }}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
          <span className="text-xs font-bold text-gray-300">{name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div>
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-xs text-gray-400">{category}</div>
        </div>
      </div>
      <div className="flex items-center">
        <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()} mr-3`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold ${getScoreColor()}`}>{score}</div>
          <div className="text-xs text-gray-400">{deadline}</div>
        </div>
      </div>
    </motion.div>
  );
};

const AirdropLiveList: React.FC = () => {
  const airdrops = [
    { name: 'EtherFlow', category: 'DeFi', score: 92, status: 'active' as const, deadline: '2d 5h left' },
    { name: 'Nebula', category: 'GameFi', score: 78, status: 'upcoming' as const, deadline: 'Apr 12' },
    { name: 'ZKSync', category: 'L2 Protocol', score: 95, status: 'active' as const, deadline: '5d left' },
    { name: 'MetaSwap', category: 'Exchange', score: 65, status: 'ended' as const, deadline: 'Completed' }
  ];

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-300 font-medium">AI-Curated Airdrops</h3>
        <span className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer">View All</span>
      </div>
      
      <div className="space-y-2">
        {airdrops.map((airdrop, index) => (
          <AirdropItem
            key={index}
            name={airdrop.name}
            category={airdrop.category}
            score={airdrop.score}
            status={airdrop.status}
            deadline={airdrop.deadline}
            index={index}
          />
        ))}
      </div>
      
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <button className="text-xs text-gray-400 hover:text-gray-300 border border-gray-600 px-3 py-1 rounded-full">
          Load More Airdrops
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AirdropLiveList;
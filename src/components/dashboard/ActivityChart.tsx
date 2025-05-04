
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import DashboardCard from '@/components/dashboard/DashboardCard';

const activityData = [
  { day: 'Mon', analyses: 12, saved: 5 },
  { day: 'Tue', analyses: 19, saved: 7 },
  { day: 'Wed', analyses: 15, saved: 9 },
  { day: 'Thu', analyses: 23, saved: 11 },
  { day: 'Fri', analyses: 18, saved: 8 },
  { day: 'Sat', analyses: 14, saved: 6 },
  { day: 'Sun', analyses: 10, saved: 4 },
];

const categoryData = [
  { name: 'DeFi', value: 38 },
  { name: 'GameFi', value: 22 },
  { name: 'NFT', value: 17 },
  { name: 'Layer 1', value: 25 },
  { name: 'Layer 2', value: 30 },
  { name: 'DAO', value: 15 },
  { name: 'AI', value: 42 },
];

type ChartType = 'activity' | 'category';

const ActivityChart = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('activity');
  
  return (
    <DashboardCard className="p-0 overflow-hidden">
      <div className="p-4 border-b border-purple-900/20">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Platform Analytics</h3>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeChart === 'activity' 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveChart('activity')}
            >
              Activity
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeChart === 'category' 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveChart('category')}
            >
              Categories
            </button>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="p-4 h-64"
        key={activeChart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeChart === 'activity' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activityData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2A4A" />
              <XAxis dataKey="day" stroke="#9D9DB5" />
              <YAxis stroke="#9D9DB5" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  borderColor: '#4F4A9E', 
                  color: '#fff' 
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="analyses" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="saved" 
                stroke="#82ca9d" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2A4A" />
              <XAxis dataKey="name" stroke="#9D9DB5" />
              <YAxis stroke="#9D9DB5" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  borderColor: '#4F4A9E', 
                  color: '#fff' 
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
                background={{ fill: '#2D2A4A' }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </DashboardCard>
  );
};

export default ActivityChart;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Chart, Users, Bookmark, Sparkles } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsWidget from "@/components/dashboard/StatsWidget";
import ActivityChart from "@/components/dashboard/ActivityChart";
import ActionButton from "@/components/dashboard/ActionButton";

const Overview = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Trending projects data (kept from original)
  const trendingProjects = [
    { 
      name: "Celestia", 
      logo: "https://cryptologos.cc/logos/celestia-tia-logo.png", 
      trend: "up", 
      score: 92, 
      note: "L1 blockchain focused on data availability showing promising growth" 
    },
    { 
      name: "Arbitrum", 
      logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png", 
      trend: "up", 
      score: 88, 
      note: "Layer 2 solution gaining significant adoption with new ecosystem projects" 
    },
    { 
      name: "Solana", 
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png", 
      trend: "down", 
      score: 76, 
      note: "Recent network stability issues, but still strong developer activity" 
    },
    { 
      name: "Ethereum", 
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", 
      trend: "up", 
      score: 95, 
      note: "Upcoming protocol upgrade expected to improve transaction throughput" 
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants}>
        <WelcomeBanner />
      </motion.div>

      {/* Stats Widgets */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsWidget 
            title="Total Projects Analyzed" 
            value={356} 
            trend="up" 
            trendValue="+24% this month" 
            icon={<Chart size={24} />}
          />
          <StatsWidget 
            title="Most Active Users" 
            value={42} 
            trend="up" 
            trendValue="+7 new today" 
            icon={<Users size={24} />}
          />
          <StatsWidget 
            title="Projects Saved" 
            value={189} 
            trend="neutral" 
            trendValue="Across 38 users" 
            icon={<Bookmark size={24} />}
          />
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <ActivityChart />
        </motion.div>

        {/* AI Insights Card */}
        <motion.div variants={itemVariants}>
          <DashboardCard title="Your AI Insights">
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <p className="text-gray-300 leading-relaxed">
                ETH has increased 4.3% in the last 24h, outperforming your portfolio average. 
                Three new airdrops detected for wallets you're tracking. 
                Consider moving some assets to Arbitrum ecosystem based on recent volume trends.
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-purple-300">Updated 17 minutes ago</span>
              <motion.button 
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm"
                whileHover={{ x: 5 }}
              >
                Full Analysis →
              </motion.button>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Trending Projects */}
      <motion.div variants={itemVariants}>
        <DashboardCard title="Trending Projects">
          <div className="space-y-2">
            {trendingProjects.map((project, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-900/20 transition-colors cursor-pointer"
                whileHover={{ x: 4, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
              >
                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                  {project.logo ? (
                    <img src={project.logo} alt={project.name} className="w-6 h-6 object-contain" />
                  ) : (
                    <span className="text-lg">{project.name.charAt(0)}</span>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{project.name}</span>
                    {project.trend === 'up' ? (
                      <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">Rising</span>
                    ) : (
                      <span className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full">Falling</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{project.note}</p>
                </div>
                
                {/* Score */}
                <div className="w-12 flex flex-col items-center">
                  <span className={`text-sm font-medium ${
                    project.score > 85 ? 'text-green-400' : 
                    project.score > 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {project.score}
                  </span>
                  <div className="w-full h-1 bg-gray-700 rounded-full mt-1">
                    <motion.div 
                      className={`h-full rounded-full ${
                        project.score > 85 ? 'bg-green-400' : 
                        project.score > 70 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${project.score}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <ActionButton 
              icon={<Sparkles size={18} />} 
              variant="outline"
              className="mt-2"
            >
              Explore More Projects
            </ActionButton>
          </div>
        </DashboardCard>
      </motion.div>
    </motion.div>
  );
};

export default Overview;

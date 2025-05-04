
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { 
  ChevronRight, 
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Sparkles,
  LineChart,
  Scan
} from "lucide-react";

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome back, Alex");
  
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

  // Simulate loading action
  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  // Time-based greeting
  useEffect(() => {
    const hours = new Date().getHours();
    const name = "Alex"; // Would come from auth in a real app
    
    let greeting;
    if (hours < 12) greeting = "Good morning";
    else if (hours < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    setWelcomeMessage(`${greeting}, ${name}`);
  }, []);

  // Trending projects data
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
        <DashboardCard className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{welcomeMessage}</h1>
              <p className="text-gray-300 mt-1">Let's decode today's crypto landscape</p>
            </div>
            <motion.div 
              className="h-16 w-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <span className="text-2xl">🧠</span>
            </motion.div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Insights Card */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <DashboardCard title="Your AI Insights">
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <p className="text-gray-300 leading-relaxed">
                ETH has increased 4.3% in the last 24h, outperforming your portfolio average. 
                Three new airdrops detected for wallets you're tracking. 
                Consider moving some assets to Arbitrum ecosystem based on recent volume trends.
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-xs text-purple-300">Updated 17 minutes ago</span>
              <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm">
                Full Analysis 
                <ChevronRight size={16} />
              </button>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Airdrop Radar Preview Card */}
        <motion.div variants={itemVariants}>
          <DashboardCard title="Airdrop Radar">
            <div className="h-40 relative flex items-center justify-center">
              {/* Radar animation circles */}
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="absolute rounded-full border border-purple-500/30"
                  style={{ width: `${i * 25}%`, height: `${i * 25}%` }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">12</div>
                <div className="text-sm text-gray-400">New Opportunities</div>
              </div>
            </div>
            
            <button className="w-full mt-2 text-center text-purple-400 hover:text-purple-300 text-sm py-2">
              View All Airdrops
            </button>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Trending Projects */}
      <motion.div variants={itemVariants}>
        <DashboardCard title="Trending Projects">
          <div className="space-y-4">
            {trendingProjects.map((project, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-900/20 transition-colors"
                whileHover={{ x: 4 }}
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
                      <ArrowUpRight size={16} className="text-green-400" />
                    ) : (
                      <ArrowDownRight size={16} className="text-red-400" />
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
                    <div 
                      className={`h-full rounded-full ${
                        project.score > 85 ? 'bg-green-400' : 
                        project.score > 70 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${project.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-medium mb-4 text-white/90">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ActionButton 
            icon={<Search size={18} />} 
            variant="primary" 
            onClick={handleAction}
            loading={loading}
            className="h-16"
          >
            Run Wallet Analysis
          </ActionButton>
          
          <ActionButton 
            icon={<Sparkles size={18} />} 
            variant="secondary"
            onClick={handleAction}
            className="h-16"
          >
            Check Airdrop Eligibility
          </ActionButton>
          
          <ActionButton 
            icon={<Scan size={18} />} 
            variant="outline"
            onClick={handleAction}
            className="h-16"
          >
            Launch DEX Scanner
          </ActionButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;

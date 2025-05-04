
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Search, ChevronDown, ChevronUp, Database, BarChart3, PieChart } from "lucide-react";
import ActionButton from "@/components/dashboard/ActionButton";

const AiResearchHub = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isPastSearchesOpen, setIsPastSearchesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName && !projectAddress) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults({
        name: projectName || "Unknown Project",
        address: projectAddress || "0x1234...5678",
        sentiment: 78,
        activity: [65, 72, 68, 74, 82, 79],
        tokenomics: {
          team: 15,
          treasury: 25,
          community: 35,
          investors: 25,
        },
        highlights: [
          "Innovative Layer 2 solution with cross-chain bridges",
          "Strong developer activity with 120+ commits in last month",
          "Backed by high quality VCs including Paradigm and a16z",
          "Tokenomics favors long term community incentives",
        ],
        history: [
          { date: "2023-05-01", name: "Celestia", score: 86 },
          { date: "2023-05-03", name: "Arbitrum", score: 75 },
          { date: "2023-05-10", name: "Optimism", score: 88 },
        ],
        liveProjects: [
          { name: "Solana", score: 92, comment: "Exceptionally strong ecosystem growth" },
          { name: "Sui", score: 84, comment: "Novel consensus mechanism showing promise" },
          { name: "Avalanche", score: 79, comment: "Growing institutional adoption" },
        ],
      });
      setIsLoading(false);
    }, 1500);
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
          AI Research Hub
        </h1>
        <p className="text-gray-400">
          Analyze any Web3 project with our AI engine. Get comprehensive insights on tokenomics, team, and potential.
        </p>
      </motion.div>

      {/* Search Form */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <h2 className="text-xl font-medium">Research a Project</h2>
            {isSearchOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
          
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSearch} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="projectName" className="block text-sm text-gray-400">
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="e.g. Ethereum, Celestia, Arbitrum"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="projectAddress" className="block text-sm text-gray-400">
                    Website / Contract Address
                  </label>
                  <input
                    id="projectAddress"
                    type="text"
                    className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="e.g. https://ethereum.org or 0x123..."
                    value={projectAddress}
                    onChange={(e) => setProjectAddress(e.target.value)}
                  />
                </div>
                
                <div className="pt-2">
                  <ActionButton 
                    type="submit" 
                    icon={<Search size={18} />}
                    loading={isLoading}
                  >
                    Analyze Project
                  </ActionButton>
                </div>
              </form>
            </motion.div>
          )}
        </DashboardCard>
      </motion.div>

      {/* Past Searches */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPastSearchesOpen(!isPastSearchesOpen)}>
            <h2 className="text-xl font-medium">Past Searches</h2>
            {isPastSearchesOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
          
          {isPastSearchesOpen && searchResults?.history && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="space-y-2">
                {searchResults.history.map((item: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="bg-purple-900/20 p-3 rounded-lg flex justify-between items-center"
                    whileHover={{ x: 5 }}
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm ${
                        item.score > 85 ? 'text-green-400' : 
                        item.score > 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        Score: {item.score}
                      </div>
                      <button className="text-purple-400 hover:text-purple-300">View</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </DashboardCard>
      </motion.div>

      {/* Results Section */}
      {searchResults && (
        <>
          {/* Project Highlights */}
          <motion.div variants={itemVariants}>
            <DashboardCard title="Project Highlights">
              <div className="space-y-3">
                {searchResults.highlights.map((highlight: string, index: number) => (
                  <motion.div 
                    key={index} 
                    className="bg-purple-900/20 p-3 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {highlight}
                  </motion.div>
                ))}
              </div>
            </DashboardCard>
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sentiment Chart */}
            <DashboardCard title="Sentiment Analysis">
              <div className="flex flex-col items-center justify-center h-40">
                <div className="relative w-32 h-32">
                  {/* Circular progress background */}
                  <div className="absolute inset-0 rounded-full border-8 border-purple-900/30"></div>
                  
                  {/* Circular progress indicator */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="transparent"
                      stroke="url(#sentimentGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(searchResults.sentiment / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8338EC" />
                        <stop offset="100%" stopColor="#3A86FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">{searchResults.sentiment}%</span>
                    <span className="text-xs text-gray-400">sentiment</span>
                  </div>
                </div>
              </div>
            </DashboardCard>

            {/* GitHub Activity Chart */}
            <DashboardCard title="GitHub Activity">
              <div className="flex items-end justify-between h-40 px-2">
                {searchResults.activity.map((value: number, index: number) => (
                  <motion.div
                    key={index}
                    className="w-8 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t"
                    style={{ height: `${value}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </DashboardCard>

            {/* Tokenomics Chart */}
            <DashboardCard title="Tokenomics">
              <div className="flex flex-col items-center justify-center h-40">
                {/* Simple Pie Chart Visualization */}
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Team */}
                    <circle 
                      cx="50" cy="50" r="45" fill="transparent"
                      stroke="#9333EA" strokeWidth="10"
                      strokeDasharray={`${searchResults.tokenomics.team * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Treasury */}
                    <circle 
                      cx="50" cy="50" r="45" fill="transparent"
                      stroke="#6366F1" strokeWidth="10"
                      strokeDasharray={`${searchResults.tokenomics.treasury * 2.83} 283`}
                      strokeDashoffset={`${-searchResults.tokenomics.team * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Community */}
                    <circle 
                      cx="50" cy="50" r="45" fill="transparent"
                      stroke="#2DD4BF" strokeWidth="10"
                      strokeDasharray={`${searchResults.tokenomics.community * 2.83} 283`}
                      strokeDashoffset={`${-(searchResults.tokenomics.team + searchResults.tokenomics.treasury) * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Investors */}
                    <circle 
                      cx="50" cy="50" r="45" fill="transparent"
                      stroke="#38BDF8" strokeWidth="10"
                      strokeDasharray={`${searchResults.tokenomics.investors * 2.83} 283`}
                      strokeDashoffset={`${-(searchResults.tokenomics.team + searchResults.tokenomics.treasury + searchResults.tokenomics.community) * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-1"></span>
                    <span>Team: {searchResults.tokenomics.team}%</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></span>
                    <span>Treasury: {searchResults.tokenomics.treasury}%</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-teal-500 rounded-full mr-1"></span>
                    <span>Community: {searchResults.tokenomics.community}%</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-sky-500 rounded-full mr-1"></span>
                    <span>Investors: {searchResults.tokenomics.investors}%</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          {/* Live Feed */}
          <motion.div variants={itemVariants}>
            <DashboardCard title="Live Feed: Latest Projects Auto-Analyzed">
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 w-max">
                  {searchResults.liveProjects.map((project: any, index: number) => (
                    <motion.div 
                      key={index}
                      className="w-80 bg-purple-900/20 p-4 rounded-lg"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{project.name}</h3>
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                          project.score > 85 ? 'bg-green-900/30 text-green-400' : 
                          project.score > 70 ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'
                        }`}>
                          {project.score}/100
                        </div>
                      </div>
                      <div className="mt-3 relative">
                        <div className="absolute left-3 top-0 w-1 h-full bg-purple-500/30 rounded-full"></div>
                        <p className="pl-8 text-gray-300 text-sm italic">{project.comment}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AiResearchHub;

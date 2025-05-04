
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { Search, ArrowRight, Info } from "lucide-react";

const TokenAnalyzer = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractAddress) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTokenData({
        name: "Example Token",
        symbol: "EXT",
        price: "$1.24",
        change: "+3.5%",
        marketCap: "$124.5M",
        holderDistribution: [
          { name: "Top 10 Wallets", value: 45, color: "#8338EC" },
          { name: "Top 11-100", value: 30, color: "#3A86FF" },
          { name: "Top 101-1000", value: 15, color: "#5E60CE" },
          { name: "Remaining", value: 10, color: "#7209B7" }
        ],
        movementHeatmap: [
          [12, 4, 8, 15],
          [9, 22, 6, 3],
          [5, 11, 18, 7],
          [2, 9, 13, 21]
        ],
        similarTokens: [
          { name: "Similar Token 1", correlation: 0.89 },
          { name: "Similar Token 2", correlation: 0.76 },
          { name: "Similar Token 3", correlation: 0.65 },
        ],
        aiInsight: "This token shows relatively high concentration among top holders (45%) which presents centralization risks. Recent volume patterns suggest possible accumulation phase. The token has moderate correlation with several DeFi governance tokens, suggesting its utility in a similar ecosystem."
      });
      setIsLoading(false);
    }, 1500);
  };

  const networks = [
    { id: "ethereum", name: "Ethereum" },
    { id: "bsc", name: "BNB Chain" },
    { id: "polygon", name: "Polygon" },
    { id: "avalanche", name: "Avalanche" },
    { id: "arbitrum", name: "Arbitrum" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
          Token Analyzer
        </h1>
        <p className="text-gray-400">
          Analyze any token's holder distribution, movements, and AI-generated insights.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contractAddress" className="block text-sm text-gray-400">
                Token Contract Address
              </label>
              <input
                id="contractAddress"
                type="text"
                className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="0x..."
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">
                Network
              </label>
              <div className="flex flex-wrap gap-2">
                {networks.map(network => (
                  <button
                    key={network.id}
                    type="button"
                    onClick={() => setSelectedNetwork(network.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedNetwork === network.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-[#2A2C3E] text-gray-300 hover:bg-purple-900/30'
                    }`}
                  >
                    {network.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <ActionButton 
                type="submit" 
                icon={<Search size={18} />}
                loading={isLoading}
              >
                Analyze Token
              </ActionButton>
            </div>
          </form>
        </DashboardCard>
      </motion.div>

      {/* Results */}
      {tokenData && (
        <>
          {/* Token Overview */}
          <motion.div variants={itemVariants}>
            <DashboardCard>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium">{tokenData.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400">{tokenData.symbol}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400">{selectedNetwork}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-medium">{tokenData.price}</span>
                  <span className={`text-sm ${tokenData.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {tokenData.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-400">
                  Market Cap: <span className="text-gray-300">{tokenData.marketCap}</span>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Holder Distribution */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Holder Distribution">
                <div className="h-64 flex items-center justify-center">
                  {/* Donut Chart */}
                  <div className="relative w-52 h-52">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {tokenData.holderDistribution.map((segment: any, index: number) => {
                        // Calculate starting position for each segment
                        const prevSegments = tokenData.holderDistribution
                          .slice(0, index)
                          .reduce((acc: number, curr: any) => acc + curr.value, 0);
                        
                        const startPercent = prevSegments;
                        const dashArray = segment.value * 2.64; // 264 is approx circumference of circle with r=42
                        const dashOffset = 264 - (startPercent * 2.64);
                        
                        return (
                          <motion.circle 
                            key={index}
                            cx="50" cy="50" r="42" fill="transparent"
                            stroke={segment.color}
                            strokeWidth="16"
                            strokeDasharray={`${dashArray} 264`}
                            strokeDashoffset={dashOffset}
                            transform="rotate(-90 50 50)"
                            initial={{ strokeDasharray: "0 264" }}
                            animate={{ strokeDasharray: `${dashArray} 264` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="26" fill="#1A1F2C" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-lg font-medium">{tokenData.holderDistribution[0].value}%</span>
                      <span className="text-xs text-gray-400">Top 10</span>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {tokenData.holderDistribution.map((segment: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                      <div className="text-xs">
                        {segment.name}: {segment.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </motion.div>

            {/* Token Movement Heatmap */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Token Movement Heatmap (24h)">
                <div className="h-64 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                    {tokenData.movementHeatmap.map((row: number[], rowIndex: number) => (
                      row.map((value: number, colIndex: number) => {
                        // Calculate a color based on the value (0-25)
                        const intensity = Math.min(255, Math.floor((value / 25) * 255));
                        const color = `rgba(131, 56, 236, ${value / 25})`;
                        
                        return (
                          <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            className="aspect-square rounded-md flex items-center justify-center"
                            style={{ backgroundColor: color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: (rowIndex * 4 + colIndex) * 0.05 }}
                          >
                            <span className="text-xs font-medium">{value}</span>
                          </motion.div>
                        );
                      })
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Higher values (darker color) indicate more token movements between wallets
                </p>
              </DashboardCard>
            </motion.div>
            
            {/* AI Insight */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="AI Insight">
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Info size={20} className="text-purple-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {tokenData.aiInsight}
                  </p>
                </div>
              </DashboardCard>
            </motion.div>

            {/* Similar Tokens */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Similar Tokens">
                <div className="space-y-3">
                  {tokenData.similarTokens.map((token: any, index: number) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg"
                      whileHover={{ x: 4 }}
                    >
                      <span>{token.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-700 rounded-full">
                          <motion.div 
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${token.correlation * 100}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${token.correlation * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{Math.round(token.correlation * 100)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm">
                    View Full Report <ArrowRight size={14} />
                  </button>
                </div>
              </DashboardCard>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TokenAnalyzer;

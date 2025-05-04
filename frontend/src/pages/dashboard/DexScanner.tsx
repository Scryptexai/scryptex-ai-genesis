
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { Search, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const DexScanner = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [selectedDex, setSelectedDex] = useState("uniswap");
  const [isLoading, setIsLoading] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);

  const dexOptions = [
    { id: "uniswap", name: "Uniswap" },
    { id: "sushiswap", name: "SushiSwap" },
    { id: "pancakeswap", name: "PancakeSwap" },
    { id: "curve", name: "Curve" },
    { id: "balancer", name: "Balancer" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAddress) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setScanResults({
        token: {
          name: "Example Token",
          symbol: "EXT",
          address: tokenAddress
        },
        dex: selectedDex,
        liquidity: {
          total: "$4.52M",
          change24h: "+2.3%",
          isPositive: true,
          chartData: [42, 45, 48, 46, 50, 53, 58, 56, 59, 62, 60, 65, 68]
        },
        volume: {
          total: "$1.24M",
          change24h: "-5.2%",
          isPositive: false,
          highest: "$245K",
          lowest: "$52K",
          sliderValue: 65
        },
        opportunity: {
          type: "alert", // can be "alert" or "opportunity"
          message: "Sharp liquidity increase detected in the last hour. Potential token launch or market maker activity.",
          severity: "medium" // low, medium, high
        }
      });
      setIsLoading(false);
    }, 1500);
  };

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
          DEX Scanner
        </h1>
        <p className="text-gray-400">
          Monitor liquidity, volume, and trading activity across decentralized exchanges.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tokenAddress" className="block text-sm text-gray-400">
                Token Address
              </label>
              <input
                id="tokenAddress"
                type="text"
                className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">
                DEX Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {dexOptions.map(dex => (
                  <button
                    key={dex.id}
                    type="button"
                    onClick={() => setSelectedDex(dex.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedDex === dex.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-[#2A2C3E] text-gray-300 hover:bg-purple-900/30'
                    }`}
                  >
                    {dex.name}
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
                Scan DEX
              </ActionButton>
            </div>
          </form>
        </DashboardCard>
      </motion.div>

      {/* Results */}
      {scanResults && (
        <>
          {/* Overview Card */}
          <motion.div variants={itemVariants}>
            <DashboardCard>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium">{scanResults.token.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400">{scanResults.token.symbol}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 capitalize">{scanResults.dex}</span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-900/30 text-sm text-purple-300">
                  {scanResults.token.address.slice(0, 6)}...{scanResults.token.address.slice(-4)}
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Liquidity Chart */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Liquidity Chart">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl font-medium">{scanResults.liquidity.total}</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      scanResults.liquidity.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {scanResults.liquidity.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {scanResults.liquidity.change24h}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    24h Change
                  </div>
                </div>
                
                {/* Line Chart */}
                <div className="h-40 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 100">
                    {/* Grid Lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line 
                        key={`grid-${y}`}
                        x1="0" 
                        y1={y} 
                        x2="300" 
                        y2={y} 
                        stroke="rgba(131, 56, 236, 0.1)" 
                        strokeDasharray="4 4" 
                      />
                    ))}
                    
                    {/* Create the line path from data points */}
                    {(() => {
                      const data = scanResults.liquidity.chartData;
                      // Normalize data between 0-100 for SVG height
                      const max = Math.max(...data);
                      const min = Math.min(...data);
                      const range = max - min;
                      
                      // Create points with even horizontal spacing
                      const points = data.map((val: number, i: number) => {
                        const x = (i / (data.length - 1)) * 300;
                        // Invert Y value for SVG (0 is top)
                        const y = 100 - ((val - min) / range) * 85;
                        return `${x},${y}`;
                      }).join(" ");
                      
                      return (
                        <g>
                          {/* Area under the curve */}
                          <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgba(131, 56, 236, 0.5)" />
                              <stop offset="100%" stopColor="rgba(131, 56, 236, 0)" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            d={`M0,100 L0,${100 - ((data[0] - min) / range) * 85} ${points} ${300},${100 - ((data[data.length-1] - min) / range) * 85} L300,100 Z`}
                            fill="url(#areaGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                          />
                          
                          {/* Line */}
                          <motion.polyline
                            points={points}
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                          <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8338EC" />
                              <stop offset="100%" stopColor="#3A86FF" />
                            </linearGradient>
                          </defs>
                          
                          {/* Data points */}
                          {data.map((val: number, i: number) => {
                            const x = (i / (data.length - 1)) * 300;
                            const y = 100 - ((val - min) / range) * 85;
                            return (
                              <motion.circle
                                key={`point-${i}`}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#8338EC"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                              />
                            );
                          })}
                        </g>
                      );
                    })()}
                  </svg>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </DashboardCard>
            </motion.div>
            
            {/* Volume Slider */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Trade Volume">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl font-medium">{scanResults.volume.total}</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      scanResults.volume.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {scanResults.volume.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {scanResults.volume.change24h}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    24h Change
                  </div>
                </div>
                
                {/* Volume Slider */}
                <div className="my-8">
                  <div className="relative h-8">
                    {/* Slider track */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-gray-700 rounded-full">
                      {/* Slider fill */}
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                        style={{ width: `${scanResults.volume.sliderValue}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${scanResults.volume.sliderValue}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    
                    {/* Slider thumb */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                      style={{ left: `calc(${scanResults.volume.sliderValue}% - 12px)` }}
                      initial={{ left: "0%", scale: 0 }}
                      animate={{ left: `calc(${scanResults.volume.sliderValue}% - 12px)`, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-gray-400">Lowest: {scanResults.volume.lowest}</span>
                    <span className="text-gray-400">Highest: {scanResults.volume.highest}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-center text-sm text-gray-300">
                    Current volume is at {scanResults.volume.sliderValue}% of daily peak
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          </div>

          {/* AI Opportunity Alert */}
          <motion.div variants={itemVariants}>
            <DashboardCard 
              className={`border-l-4 ${
                scanResults.opportunity.type === "alert"
                  ? scanResults.opportunity.severity === "high" 
                    ? "border-l-red-500" 
                    : scanResults.opportunity.severity === "medium"
                      ? "border-l-yellow-500"
                      : "border-l-blue-500"
                  : "border-l-green-500"
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <motion.div
                    animate={
                      scanResults.opportunity.severity === "high"
                        ? { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1 } }
                        : {}
                    }
                  >
                    <AlertTriangle size={24} className={`
                      ${scanResults.opportunity.severity === "high" 
                        ? "text-red-400" 
                        : scanResults.opportunity.severity === "medium"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }
                    `} />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">
                    {scanResults.opportunity.type === "alert" ? "AI Alert" : "Trading Opportunity"}
                  </h3>
                  <p className="text-gray-300">
                    {scanResults.opportunity.message}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-900/30 text-gray-300">
                      {new Date().toLocaleTimeString()}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      scanResults.opportunity.severity === "high"
                        ? "bg-red-900/30 text-red-400"
                        : scanResults.opportunity.severity === "medium"
                          ? "bg-yellow-900/30 text-yellow-400" 
                          : "bg-blue-900/30 text-blue-400"
                    }`}>
                      {scanResults.opportunity.severity.charAt(0).toUpperCase() + scanResults.opportunity.severity.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default DexScanner;

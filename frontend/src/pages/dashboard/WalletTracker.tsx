
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Clock,
  Wallet as WalletIcon
} from "lucide-react";

const WalletTracker = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWalletData({
        address: walletAddress,
        balance: "14.28 ETH",
        usdValue: "$32,450",
        change24h: "+3.2%",
        positive: true,
        riskRating: 82,
        tokens: [
          { name: "Ethereum", symbol: "ETH", amount: "14.28", value: "$32,450", change: "+2.1%", positive: true },
          { name: "Uniswap", symbol: "UNI", amount: "450", value: "$1,845", change: "+5.3%", positive: true },
          { name: "Chainlink", symbol: "LINK", amount: "320", value: "$4,512", change: "-1.2%", positive: false },
          { name: "Aave", symbol: "AAVE", amount: "12", value: "$1,030", change: "+0.5%", positive: true },
        ],
        transactions: {
          total: 145,
          last30Days: 28,
          types: {
            swaps: 45,
            transfers: 65,
            nftPurchases: 15,
            airdrops: 8,
            others: 12
          },
          trend: [15, 12, 18, 22, 14, 19, 28]
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
          Wallet Tracker
        </h1>
        <p className="text-gray-400">
          Track any wallet's assets, transactions, and risk profile with AI insights.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="walletAddress" className="block text-sm text-gray-400">
                Wallet Address
              </label>
              <input
                id="walletAddress"
                type="text"
                className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <p className="text-xs text-gray-500">Enter any Ethereum or compatible blockchain address</p>
            </div>
            
            <div className="pt-2">
              <ActionButton 
                type="submit" 
                icon={<Search size={18} />}
                loading={isLoading}
              >
                Track Wallet
              </ActionButton>
            </div>
          </form>
        </DashboardCard>
      </motion.div>

      {/* Results */}
      {walletData && (
        <>
          {/* Wallet Overview */}
          <motion.div variants={itemVariants}>
            <DashboardCard>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Left Side - Wallet Info */}
                <div className="space-y-3">
                  <h2 className="text-lg font-medium">Wallet Overview</h2>
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Address</div>
                    <div className="flex items-center gap-2">
                      <WalletIcon size={16} className="text-purple-400" />
                      <span className="font-mono">{walletData.address.slice(0, 8)}...{walletData.address.slice(-6)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Balance</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-medium">{walletData.balance}</span>
                      <div className={`text-sm flex items-center ${walletData.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {walletData.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {walletData.change24h}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">{walletData.usdValue}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Last Activity</div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-purple-400" />
                      <span>Today at 14:36</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Risk Rating */}
                <div className="md:border-l md:border-purple-900/30 md:pl-6 flex-shrink-0">
                  <h3 className="text-lg font-medium mb-3">Risk Rating</h3>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      {/* Risk gauge background */}
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#2A2C3E"
                          strokeWidth="10"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={walletData.riskRating > 70 ? "#22c55e" : walletData.riskRating > 40 ? "#eab308" : "#ef4444"}
                          strokeWidth="10"
                          strokeDasharray={`${walletData.riskRating * 2.83} 283`}
                          initial={{ strokeDasharray: "0 283" }}
                          animate={{ strokeDasharray: `${walletData.riskRating * 2.83} 283` }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{walletData.riskRating}</span>
                        <span className="text-xs text-gray-400">Safety Score</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <ShieldAlert size={16} className="text-green-400" />
                      <span className="text-sm">
                        {walletData.riskRating > 70 
                          ? "Low Risk" 
                          : walletData.riskRating > 40
                            ? "Medium Risk"
                            : "High Risk"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          {/* Top Performing Tokens */}
          <motion.div variants={itemVariants}>
            <DashboardCard title="Token Holdings">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-purple-900/20">
                      <th className="pb-2 font-medium">Token</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Value</th>
                      <th className="pb-2 font-medium">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletData.tokens.map((token: any, index: number) => (
                      <motion.tr
                        key={index}
                        className="border-b border-purple-900/10 last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ backgroundColor: "rgba(131, 56, 236, 0.05)" }}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-xs">
                              {token.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-gray-400">{token.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 font-mono">{token.amount}</td>
                        <td className="py-3">{token.value}</td>
                        <td className="py-3">
                          <div className={`flex items-center gap-1 ${token.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {token.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            {token.change}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction Types */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Transaction Types">
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    {Object.entries(walletData.transactions.types).map(([type, count]: [string, any], index: number) => {
                      const percentage = Math.round((count / walletData.transactions.total) * 100);
                      return (
                        <div key={type} className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm capitalize">{type}</span>
                            <span className="text-sm text-gray-400">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Total Transactions: {walletData.transactions.total}
                </div>
              </DashboardCard>
            </motion.div>

            {/* Transaction Trends */}
            <motion.div variants={itemVariants}>
              <DashboardCard title="Transaction Trends (Last 7 Days)">
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full h-40 flex items-end justify-between gap-4 px-4">
                    {walletData.transactions.trend.map((count: number, i: number) => {
                      const maxCount = Math.max(...walletData.transactions.trend);
                      const height = (count / maxCount) * 100;
                      
                      return (
                        <motion.div
                          key={i}
                          className="relative flex-1 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t"
                          style={{ height: `${height}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">{count}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </DashboardCard>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default WalletTracker;

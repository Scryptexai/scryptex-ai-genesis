
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { Check, X, AlertTriangle, Wallet } from "lucide-react";

const AirdropRadar = () => {
  const [wallet, setWallet] = useState("");
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        wallet: wallet,
        chain: selectedChain,
        airdrops: [
          { 
            id: 1, 
            name: "Arbitrum", 
            status: "eligible",
            logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png", 
            estimate: "500-1000 ARB", 
            deadline: "May 30, 2024" 
          },
          { 
            id: 2, 
            name: "LayerZero", 
            status: "eligible",
            logo: "https://cryptologos.cc/logos/stargate-finance-stg-logo.png", 
            estimate: "~2000 ZRO", 
            deadline: "June 15, 2024" 
          },
          { 
            id: 3, 
            name: "Optimism", 
            status: "pending",
            logo: "https://cryptologos.cc/logos/optimism-op-logo.png", 
            estimate: "Pending Qualification", 
            deadline: "July 10, 2024" 
          },
          { 
            id: 4, 
            name: "zkSync", 
            status: "not_eligible",
            logo: "https://cryptologos.cc/logos/zksync-logo.png", 
            estimate: "N/A", 
            deadline: "N/A" 
          }
        ]
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

  // Available networks
  const networks = [
    { id: "ethereum", name: "Ethereum" },
    { id: "optimism", name: "Optimism" },
    { id: "arbitrum", name: "Arbitrum" },
    { id: "base", name: "Base" },
    { id: "polygon", name: "Polygon" }
  ];

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
          Airdrop Radar
        </h1>
        <p className="text-gray-400">
          Scan the crypto ecosystem for potential airdrops and check your wallet's eligibility.
        </p>
      </motion.div>

      {/* Live Airdrop Map */}
      <motion.div variants={itemVariants}>
        <DashboardCard title="Live Airdrop Map" className="overflow-hidden">
          <div className="h-64 relative">
            {/* Animated network graph */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central node */}
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(131, 56, 236, 0.4)", 
                    "0 0 20px rgba(131, 56, 236, 0.7)", 
                    "0 0 0 rgba(131, 56, 236, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>
              
              {/* Orbiting nodes */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i * Math.PI * 2) / 6;
                const distance = 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 rounded-full bg-purple-900/80 flex items-center justify-center"
                    style={{ left: "calc(50% - 20px)", top: "calc(50% - 20px)" }}
                    animate={{
                      x: [x * 0.8, x, x * 1.2, x],
                      y: [y * 1.2, y, y * 0.8, y],
                      boxShadow: ["0 0 0 rgba(131, 56, 236, 0.4)", "0 0 10px rgba(131, 56, 236, 0.7)"]
                    }}
                    transition={{ 
                      duration: 10 + i, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  >
                    <span>{["🪙", "💎", "🔮", "🚀", "💸", "🌟"][i]}</span>
                    
                    {/* Connection line */}
                    <motion.div
                      className="absolute left-5 top-5 bg-gradient-to-r from-purple-500 to-transparent h-px"
                      style={{ 
                        width: `${Math.sqrt(x*x + y*y)}px`,
                        transform: `rotate(${angle}rad)`,
                        transformOrigin: "left center"
                      }}
                      animate={{
                        opacity: [0.1, 0.5, 0.1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center text-gray-400 mt-2 text-sm">
            <p>6 active airdrop campaigns detected across multiple networks</p>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Check Eligibility */}
      <motion.div variants={itemVariants}>
        <DashboardCard title="Check My Eligibility">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="wallet" className="block text-sm text-gray-400">
                  Wallet Address
                </label>
                <input
                  id="wallet"
                  type="text"
                  className="w-full bg-[#2A2C3E] border border-purple-900/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="0x..."
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">
                  Select Network
                </label>
                <div className="flex flex-wrap gap-2">
                  {networks.map(network => (
                    <button
                      key={network.id}
                      type="button"
                      onClick={() => setSelectedChain(network.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedChain === network.id 
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
                  icon={<Wallet size={18} />}
                  loading={isLoading}
                >
                  Check Eligibility
                </ActionButton>
              </div>
            </div>
          </form>

          {/* Results */}
          {results && (
            <motion.div
              className="mt-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium">Results for {results.wallet.slice(0, 6)}...{results.wallet.slice(-4)}</h3>
              
              <div className="space-y-3">
                {results.airdrops.map((airdrop: any) => (
                  <motion.div
                    key={airdrop.id}
                    className="bg-[#1A1F2C]/60 border border-purple-900/20 rounded-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-full bg-[#2A2C3E] flex items-center justify-center overflow-hidden">
                        {airdrop.logo ? (
                          <img src={airdrop.logo} alt={airdrop.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <span className="text-2xl">{airdrop.name.charAt(0)}</span>
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{airdrop.name}</h4>
                          <div className={`
                            text-xs px-2 py-0.5 rounded-full
                            ${airdrop.status === 'eligible' 
                              ? 'bg-green-900/30 text-green-400'
                              : airdrop.status === 'pending'
                                ? 'bg-yellow-900/30 text-yellow-400'
                                : 'bg-red-900/30 text-red-400'
                            }
                          `}>
                            {airdrop.status === 'eligible' 
                              ? 'Eligible'
                              : airdrop.status === 'pending'
                                ? 'Pending'
                                : 'Not Eligible'
                            }
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                          <p className="text-sm text-gray-400">Est. Reward: <span className="text-gray-300">{airdrop.estimate}</span></p>
                          <p className="text-sm text-gray-400">Deadline: <span className="text-gray-300">{airdrop.deadline}</span></p>
                        </div>
                      </div>
                      
                      {/* Status Icon */}
                      <div className="w-8 h-8 flex items-center justify-center">
                        {airdrop.status === 'eligible' && (
                          <motion.div
                            className="w-8 h-8 bg-green-900/30 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Check size={18} className="text-green-400" />
                          </motion.div>
                        )}
                        {airdrop.status === 'pending' && (
                          <motion.div
                            className="w-8 h-8 bg-yellow-900/30 rounded-full flex items-center justify-center"
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                          >
                            <AlertTriangle size={18} className="text-yellow-400" />
                          </motion.div>
                        )}
                        {airdrop.status === 'not_eligible' && (
                          <motion.div
                            className="w-8 h-8 bg-red-900/30 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <X size={18} className="text-red-400" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </DashboardCard>
      </motion.div>
    </motion.div>
  );
};

export default AirdropRadar;

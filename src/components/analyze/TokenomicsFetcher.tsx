
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ChevronUp, ChevronDown } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { TokenomicsResponse } from "@/api/analyze/handlers";

interface TokenomicsFetcherProps {
  isLoading: boolean;
  data: TokenomicsResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const TokenomicsFetcher = ({ isLoading, data, expanded, onToggle }: TokenomicsFetcherProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardCard className={`transition-all duration-300 ${expanded ? '' : 'hover:bg-purple-900/10'}`}>
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
              <BarChart3 size={20} className="text-green-400" />
            </div>
            <h3 className="font-medium text-lg">Tokenomics</h3>
          </div>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <AnimatePresence>
          {expanded && data && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-purple-900/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-400 mb-1">Symbol</h4>
                      <p className="text-lg font-bold">{data.symbol}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-400 mb-1">Total Supply</h4>
                      <p className="text-lg">{data.totalSupply}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Token Utility</h4>
                      <p className="text-gray-300">{data.useCase}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Token Distribution</h4>
                    <div className="h-60 flex flex-col">
                      {/* Simple pie chart visualization */}
                      <div className="flex-grow relative">
                        {data.distribution.map((segment, index) => {
                          const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#14b8a6"];
                          const startPercent = data.distribution
                            .slice(0, index)
                            .reduce((sum, item) => sum + item.value, 0);
                          const segmentPercent = segment.value;
                          
                          return (
                            <motion.div
                              key={index}
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.2 }}
                            >
                              <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <motion.circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="transparent"
                                  stroke={colors[index % colors.length]}
                                  strokeWidth="20"
                                  strokeDasharray={`${segmentPercent * 2.51} 251`}
                                  strokeDashoffset={`${-startPercent * 2.51}`}
                                  transform="rotate(-90, 50, 50)"
                                  initial={{ strokeDasharray: `0 251` }}
                                  animate={{ strokeDasharray: `${segmentPercent * 2.51} 251` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </svg>
                            </motion.div>
                          );
                        })}
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[40%] h-[40%] rounded-full bg-[#242938] flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-300">
                              {data.symbol}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {data.distribution.map((segment, index) => {
                          const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#14b8a6"];
                          
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: colors[index % colors.length] }}
                              />
                              <span className="text-sm">
                                {segment.label}: {segment.value}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {expanded && isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-purple-900/20 flex items-center justify-center p-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing tokenomics data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default TokenomicsFetcher;

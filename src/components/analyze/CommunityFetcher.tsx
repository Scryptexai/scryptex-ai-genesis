
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronUp, ChevronDown } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { CommunityResponse } from "@/api/analyze/handlers";

interface CommunityFetcherProps {
  isLoading: boolean;
  data: CommunityResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const CommunityFetcher = ({ isLoading, data, expanded, onToggle }: CommunityFetcherProps) => {
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
            <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center">
              <Users size={20} className="text-yellow-400" />
            </div>
            <h3 className="font-medium text-lg">Community & Sentiment</h3>
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
                      <h4 className="text-sm text-gray-400 mb-2">Overall Community Score</h4>
                      <div className="flex items-center gap-3">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24" viewBox="0 0 100 100">
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="transparent"
                              stroke="#2A2C3E"
                              strokeWidth="12"
                            />
                            <motion.circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="transparent"
                              stroke={
                                data.score > 80 ? "#4ade80" :
                                data.score > 60 ? "#facc15" :
                                "#f87171"
                              }
                              strokeWidth="12"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 - (251.2 * data.score / 100)}
                              strokeLinecap="round"
                              transform="rotate(-90, 50, 50)"
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (251.2 * data.score / 100) }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <motion.span
                              className="text-2xl font-bold"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {data.score}
                            </motion.span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="bg-green-900/20 text-green-400 inline-block px-2.5 py-1 rounded-full text-xs">
                            {data.sentiment} Sentiment
                          </div>
                          <p className="text-sm text-gray-400 mt-2">
                            Overall community assessment based on multiple factors
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Risk Assessment</h4>
                      <div className={`
                        inline-block px-3 py-1.5 rounded-full text-sm
                        ${data.riskAssessment === 'Low' 
                          ? 'bg-green-900/30 text-green-400' 
                          : data.riskAssessment === 'Medium'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-red-900/30 text-red-400'
                        }
                      `}>
                        {data.riskAssessment} Risk
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-3">Community Metrics</h4>
                    <div className="space-y-3">
                      {data.metrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{metric.name}</span>
                            <span className={
                              metric.score > 80 ? 'text-green-400' :
                              metric.score > 60 ? 'text-yellow-400' :
                              'text-red-400'
                            }>
                              {metric.score}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                metric.score > 80 ? 'bg-green-400' :
                                metric.score > 60 ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}
                              initial={{ width: '0%' }}
                              animate={{ width: `${metric.score}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
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
                <div className="w-8 h-8 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing community data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default CommunityFetcher;

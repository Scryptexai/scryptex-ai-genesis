
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, ChevronUp, ChevronDown } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { InvestorsResponse } from "@/api/analyze/handlers";

interface InvestorsFetcherProps {
  isLoading: boolean;
  data: InvestorsResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const InvestorsFetcher = ({ isLoading, data, expanded, onToggle }: InvestorsFetcherProps) => {
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
            <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center">
              <DollarSign size={20} className="text-teal-400" />
            </div>
            <h3 className="font-medium text-lg">Investors & Funding</h3>
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
                <div className="mb-4 flex justify-between items-center">
                  <h4 className="text-sm text-gray-400">Major Investors</h4>
                  <div className="bg-teal-900/20 text-teal-400 inline-block px-2.5 py-1 rounded-full text-sm">
                    Total Funding: {data.totalFunding}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {data.investors.map((investor, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-900/30 rounded-lg p-4 flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-3">
                        <img 
                          src={investor.logo} 
                          alt={investor.name} 
                          className="w-10 h-10 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placekitten.com/100/100"; // Fallback image
                          }} 
                        />
                      </div>
                      <p className="font-medium text-sm">{investor.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{investor.round}</p>
                    </motion.div>
                  ))}
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
                <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing investor data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default InvestorsFetcher;


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { AboutResponse } from "@/api/analyze/handlers";

interface AboutFetcherProps {
  isLoading: boolean;
  data: AboutResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const AboutFetcher = ({ isLoading, data, expanded, onToggle }: AboutFetcherProps) => {
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DashboardCard className={`transition-all duration-300 ${expanded ? '' : 'hover:bg-purple-900/10'}`}>
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
              <FileCheck size={20} className="text-purple-400" />
            </div>
            <h3 className="font-medium text-lg">Project Overview</h3>
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
                    <h4 className="text-sm text-gray-400 mb-2">Description</h4>
                    <p className="text-gray-300">{data.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="text-sm text-gray-400 mb-2">Key Features</h4>
                      <ul className="list-inside space-y-1">
                        {data.keyFeatures.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center gap-2 text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Category</h4>
                      <div className="bg-purple-900/20 text-purple-300 inline-block px-3 py-1 rounded-full text-sm">
                        {data.category}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Launch Date</h4>
                      <p className="text-gray-300">{data.launchDate}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Score</h4>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center" 
                          style={{
                            background: `conic-gradient(rgb(139, 92, 246) ${data.score * 10}%, transparent ${data.score * 10}%, transparent 100%)`,
                          }}
                        >
                          <div className="h-6 w-6 rounded-full bg-[#1A1F2C] flex items-center justify-center">
                            <span className="text-xs font-semibold text-purple-300">{data.score}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-300">out of 10</span>
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
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing project overview...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default AboutFetcher;

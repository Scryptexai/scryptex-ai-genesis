
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronUp, ChevronDown, FileCheck } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { RoadmapResponse } from "@/api/analyze/handlers";

interface RoadmapFetcherProps {
  isLoading: boolean;
  data: RoadmapResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const RoadmapFetcher = ({ isLoading, data, expanded, onToggle }: RoadmapFetcherProps) => {
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
            <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
              <Calendar size={20} className="text-blue-400" />
            </div>
            <h3 className="font-medium text-lg">Project Roadmap</h3>
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
                <div className="space-y-6 relative">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500/30" />
                  
                  {data.roadmap.map((milestone, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 
                        ${milestone.completed 
                          ? 'bg-blue-500 border-blue-400 text-white' 
                          : 'bg-gray-900 border-gray-700 text-gray-400'}`}
                      >
                        {milestone.completed ? (
                          <FileCheck size={14} />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                        )}
                      </div>
                      
                      <div className="pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className="text-xs bg-blue-900/30 text-blue-400 px-2.5 py-1 rounded-full">
                            {milestone.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{milestone.description}</p>
                      </div>
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
                <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing project roadmap...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default RoadmapFetcher;

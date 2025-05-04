
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronUp, ChevronDown } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { TeamResponse } from "@/api/analyze/handlers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamFetcherProps {
  isLoading: boolean;
  data: TeamResponse | null;
  expanded: boolean;
  onToggle: () => void;
}

const TeamFetcher = ({ isLoading, data, expanded, onToggle }: TeamFetcherProps) => {
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
            <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
              <Users size={20} className="text-indigo-400" />
            </div>
            <h3 className="font-medium text-lg">Team Analysis</h3>
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
                <h4 className="text-sm text-gray-400 mb-4">Core Team Members</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.coreTeam.map((member, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4 bg-gray-900/30 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Avatar className="w-16 h-16 rounded-full">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-indigo-900 text-white text-lg">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h5 className="font-medium">{member.name}</h5>
                        <p className="text-sm text-indigo-300 mb-1">{member.role}</p>
                        <p className="text-xs text-gray-400">{member.background}</p>
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
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-gray-400">Analyzing team data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </motion.div>
  );
};

export default TeamFetcher;

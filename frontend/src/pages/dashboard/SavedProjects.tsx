
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { 
  Bookmark, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical,
  Trash2,
  Edit,
  Bell
} from "lucide-react";

const SavedProjects = () => {
  const [savedProjects, setSavedProjects] = useState([
    { 
      id: 1, 
      name: "Ethereum", 
      category: "Layer 1", 
      starred: true,
      tracked: true,
      score: 95, 
      change: "+2.3%", 
      positive: true,
      lastUpdated: "2 hours ago",
      notes: "Core blockchain, monitoring for ETH 2.0 updates and network improvements."
    },
    { 
      id: 2, 
      name: "Arbitrum", 
      category: "Layer 2", 
      starred: true,
      tracked: true,
      score: 88, 
      change: "+5.6%", 
      positive: true,
      lastUpdated: "1 day ago",
      notes: "Promising L2 solution with growing ecosystem. Tracking for potential airdrop."
    },
    { 
      id: 3, 
      name: "Uniswap", 
      category: "DeFi", 
      starred: false,
      tracked: true,
      score: 86, 
      change: "-1.2%", 
      positive: false,
      lastUpdated: "12 hours ago",
      notes: "Leading DEX, monitoring governance proposals and v4 development."
    },
    { 
      id: 4, 
      name: "Celestia", 
      category: "Infrastructure", 
      starred: false,
      tracked: false,
      score: 82, 
      change: "+8.7%", 
      positive: true,
      lastUpdated: "3 days ago",
      notes: "Modular blockchain focused on data availability. New project with high potential."
    },
    { 
      id: 5, 
      name: "Aave", 
      category: "DeFi", 
      starred: false,
      tracked: true,
      score: 84, 
      change: "+0.5%", 
      positive: true,
      lastUpdated: "1 day ago",
      notes: "Lending protocol, monitoring for new market deployments and governance."
    },
  ]);
  
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Toggle star status
  const toggleStar = (id: number) => {
    setSavedProjects(savedProjects.map(project => 
      project.id === id ? { ...project, starred: !project.starred } : project
    ));
  };
  
  // Toggle tracking status
  const toggleTracking = (id: number) => {
    setSavedProjects(savedProjects.map(project => 
      project.id === id ? { ...project, tracked: !project.tracked } : project
    ));
  };
  
  // Remove project
  const removeProject = (id: number) => {
    setSavedProjects(savedProjects.filter(project => project.id !== id));
    setOpenMenuId(null);
  };
  
  // Filter projects
  const filteredProjects = savedProjects.filter(project => {
    if (activeFilter === "all") return true;
    if (activeFilter === "starred") return project.starred;
    if (activeFilter === "tracked") return project.tracked;
    return project.category.toLowerCase() === activeFilter.toLowerCase();
  });
  
  // Get unique categories
  const categories = ["all", "starred", "tracked", ...new Set(savedProjects.map(p => p.category.toLowerCase()))];

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
          Saved Projects
        </h1>
        <p className="text-gray-400">
          View and manage all your tracked crypto projects in one place.
        </p>
      </motion.div>

      {/* Filter Categories */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                activeFilter === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#1A1F2C] text-gray-300 hover:bg-purple-900/30'
              }`}
            >
              {category === "starred" ? (
                <div className="flex items-center gap-2">
                  <Star size={14} />
                  <span>Starred</span>
                </div>
              ) : category === "tracked" ? (
                <div className="flex items-center gap-2">
                  <Bell size={14} />
                  <span>Tracked</span>
                </div>
              ) : (
                category
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 gap-4"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <DashboardCard className="transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Project Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-purple-900/30 rounded-full text-purple-300">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {project.notes}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="text-gray-400">
                        Last Updated: <span className="text-gray-300">{project.lastUpdated}</span>
                      </div>
                      
                      <div className={`flex items-center gap-1 ${project.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {project.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {project.change}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Score and Actions */}
                  <div className="flex items-center gap-6">
                    {/* Score */}
                    <div className="flex flex-col items-center">
                      <div className={`text-lg font-medium ${
                        project.score > 85 ? 'text-green-400' : 
                        project.score > 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {project.score}
                      </div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStar(project.id)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                          project.starred ? 'bg-yellow-400/20 text-yellow-400' : 'bg-gray-800 text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        <Star size={16} fill={project.starred ? "currentColor" : "none"} />
                      </button>
                      
                      <button 
                        onClick={() => toggleTracking(project.id)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                          project.tracked ? 'bg-purple-400/20 text-purple-400' : 'bg-gray-800 text-gray-400 hover:text-purple-400'
                        }`}
                      >
                        <Bell size={16} fill={project.tracked ? "currentColor" : "none"} />
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                          className="h-8 w-8 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-gray-700"
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenuId === project.id && (
                          <motion.div 
                            className="absolute right-0 top-full mt-2 bg-[#1A1F2C] rounded-lg shadow-xl border border-purple-900/30 w-40 z-10"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <div className="py-1">
                              <button 
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 w-full text-left"
                                onClick={() => {
                                  // Edit functionality would go here
                                  setOpenMenuId(null);
                                }}
                              >
                                <Edit size={14} />
                                <span>Edit Notes</span>
                              </button>
                              <button 
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-purple-900/30 w-full text-left"
                                onClick={() => removeProject(project.id)}
                              >
                                <Trash2 size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))
        ) : (
          <DashboardCard>
            <div className="py-12 text-center">
              <Bookmark size={48} className="mx-auto text-purple-400/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved projects found</h3>
              <p className="text-gray-400">
                {activeFilter !== "all" 
                  ? `No projects match the "${activeFilter}" filter.` 
                  : "Start tracking projects by saving them from the dashboard."}
              </p>
            </div>
          </DashboardCard>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SavedProjects;

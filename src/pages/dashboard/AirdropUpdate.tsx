
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Wallet, 
  Filter, 
  PlusCircle, 
  Clock, 
  Sparkles, 
  TrendingUp,
  X,
  Check,
  BookmarkPlus,
  AlertTriangle,
  Calendar
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for airdrops
const airdrops = [
  { 
    id: 1, 
    name: "Arbitrum", 
    status: "live",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png", 
    reward: "300-1200 ARB", 
    endDate: "2024-08-15",
    category: "Layer 2", 
    eligibility: "Hold ETH on Arbitrum for 3+ months",
    description: "Complete objectives to qualify for the Arbitrum token airdrop."
  },
  { 
    id: 2, 
    name: "LayerZero", 
    status: "upcoming",
    logo: "https://cryptologos.cc/logos/stargate-finance-stg-logo.png", 
    reward: "~2000 ZRO", 
    endDate: "2024-09-01",
    category: "Infrastructure", 
    eligibility: "Bridge assets via LayerZero protocol",
    description: "Bridge assets between chains using LayerZero protocol"
  },
  { 
    id: 3, 
    name: "Celestia", 
    status: "live",
    logo: "https://cryptologos.cc/logos/celestia-tia-logo.png", 
    reward: "100-500 TIA", 
    endDate: "2024-07-20",
    category: "Layer 1", 
    eligibility: "Test network validators and early testers",
    description: "Modular blockchain for scalable data availability"
  },
  { 
    id: 4, 
    name: "Base", 
    status: "upcoming",
    logo: "https://cryptologos.cc/logos/base-coin-base-logo.png", 
    reward: "TBA", 
    endDate: "2024-10-10",
    category: "Layer 2", 
    eligibility: "Early users of Base network",
    description: "Layer 2 by Coinbase, focused on mainstream adoption"
  },
  { 
    id: 5, 
    name: "Sui", 
    status: "ending",
    logo: "https://cryptologos.cc/logos/sui-sui-logo.png", 
    reward: "250-1000 SUI", 
    endDate: "2024-06-05",
    category: "Layer 1", 
    eligibility: "Contributed to testnets and owned specific NFTs",
    description: "Layer 1 blockchain built with Move language"
  },
  { 
    id: 6, 
    name: "zkSync", 
    status: "live",
    logo: "https://cryptologos.cc/logos/zksync-logo.png", 
    reward: "500-2000 ZK", 
    endDate: "2024-08-30",
    category: "Layer 2", 
    eligibility: "Used zkSync Era for transactions",
    description: "ZK Rollup solution for scaling Ethereum"
  }
];

const AirdropUpdate = () => {
  const [activeTab, setActiveTab] = useState<'top' | 'latest' | 'ending'>('top');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Filter airdrops based on active tab, search query, and category
  const filteredAirdrops = airdrops
    .filter(airdrop => {
      if (activeTab === 'top') return true;
      if (activeTab === 'latest') return airdrop.status === 'upcoming';
      if (activeTab === 'ending') return airdrop.status === 'ending';
      return true;
    })
    .filter(airdrop => {
      if (!searchQuery) return true;
      return airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             airdrop.category.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(airdrop => {
      if (!selectedCategory) return true;
      return airdrop.category === selectedCategory;
    });
  
  // Get unique categories for filter
  const categories = [...new Set(airdrops.map(airdrop => airdrop.category))];
  
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'live':
        return (
          <motion.div 
            className="flex items-center gap-1 bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            <span className="text-xs">Live</span>
          </motion.div>
        );
      case 'upcoming':
        return (
          <div className="flex items-center gap-1 bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full">
            <Calendar size={12} />
            <span className="text-xs">Upcoming</span>
          </div>
        );
      case 'ending':
        return (
          <motion.div 
            className="flex items-center gap-1 bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Clock size={12} />
            <span className="text-xs">Ending Soon</span>
          </motion.div>
        );
      default:
        return null;
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
          Airdrop Update
        </h1>
        <p className="text-gray-400">
          Track live and upcoming airdrops, save projects, and discover new opportunities
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search airdrops..."
              className="pl-10 bg-[#1A1F2C] border-purple-900/30 text-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 border-purple-900/30 bg-[#1A1F2C]"
              >
                <Filter size={14} />
                <span>Filter</span>
              </Button>
              
              {/* Filter dropdown would go here */}
            </div>
            
            <ActionButton
              icon={<PlusCircle size={16} />}
              variant="primary"
              onClick={() => setIsSubmitModalOpen(true)}
              className="h-9"
            >
              Submit Airdrop
            </ActionButton>
          </div>
        </div>
      </motion.div>
      
      {/* Category Filters */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              !selectedCategory ? 'bg-purple-600 text-white' : 'bg-[#1A1F2C] text-gray-300 hover:bg-purple-900/30'
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-[#1A1F2C] text-gray-300 hover:bg-purple-900/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <div className="border-b border-purple-900/30 pb-2">
          <div className="flex space-x-6">
            <button
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'top' 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('top')}
            >
              <div className="flex items-center gap-1.5">
                <TrendingUp size={16} />
                <span>Top</span>
              </div>
              {activeTab === 'top' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400" 
                  layoutId="activeTab"
                />
              )}
            </button>
            
            <button
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'latest' 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('latest')}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles size={16} />
                <span>Latest</span>
              </div>
              {activeTab === 'latest' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400" 
                  layoutId="activeTab"
                />
              )}
            </button>
            
            <button
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'ending' 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('ending')}
            >
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>Ending Soon</span>
              </div>
              {activeTab === 'ending' && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400"
                  layoutId="activeTab" 
                />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Airdrop Cards */}
      {filteredAirdrops.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {filteredAirdrops.map((airdrop) => (
            <motion.div
              key={airdrop.id}
              variants={itemVariants}
              className="h-full"
            >
              <DashboardCard className="h-full">
                <motion.div 
                  className="flex flex-col h-full"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2A2C3E] flex items-center justify-center overflow-hidden">
                        {airdrop.logo ? (
                          <img src={airdrop.logo} alt={airdrop.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <span className="text-xl">{airdrop.name.charAt(0)}</span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{airdrop.name}</h3>
                        <span className="text-xs text-gray-400">{airdrop.category}</span>
                      </div>
                    </div>
                    
                    {getStatusIcon(airdrop.status)}
                  </div>
                  
                  <div className="space-y-3 flex-grow">
                    <div>
                      <span className="text-xs text-gray-400">Reward Estimate</span>
                      <p className="text-sm font-medium text-green-400">{airdrop.reward}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-400">Eligibility</span>
                      <p className="text-sm text-gray-300 line-clamp-2">{airdrop.eligibility}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-400">End Date</span>
                      <p className="text-sm">{new Date(airdrop.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-purple-900/20">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full bg-transparent border-purple-500/50 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
                    >
                      <BookmarkPlus size={16} className="mr-2" />
                      Save Project
                    </Button>
                  </div>
                </motion.div>
              </DashboardCard>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <DashboardCard>
            <div className="py-12 text-center">
              <AlertTriangle size={48} className="mx-auto text-purple-400/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No airdrops found</h3>
              <p className="text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          </DashboardCard>
        </motion.div>
      )}
      
      {/* Submit Airdrop Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="bg-[#1A1F2C] text-white border border-purple-900/30 max-w-md">
          <DialogHeader>
            <DialogTitle>Submit New Airdrop</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Project Name</label>
              <Input className="bg-[#242938] border-purple-900/30" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Website URL</label>
              <Input className="bg-[#242938] border-purple-900/30" placeholder="https://" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Category</label>
                <select className="w-full bg-[#242938] border border-purple-900/30 rounded-md p-2 text-sm">
                  <option>Layer 1</option>
                  <option>Layer 2</option>
                  <option>DeFi</option>
                  <option>GameFi</option>
                  <option>NFT</option>
                  <option>DAO</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">End Date</label>
                <Input type="date" className="bg-[#242938] border-purple-900/30" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Eligibility Requirements</label>
              <Textarea className="bg-[#242938] border-purple-900/30" placeholder="How can users qualify for this airdrop?" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Reward Estimate</label>
              <Input className="bg-[#242938] border-purple-900/30" placeholder="e.g., 100-500 TOKEN" />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitModalOpen(false)}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={() => {
                // Handle submission
                setIsSubmitModalOpen(false);
              }}
            >
              <Check size={16} className="mr-2" />
              Submit Airdrop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AirdropUpdate;


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  FileCheck, 
  Calendar, 
  BarChart3, 
  Users, 
  BookmarkPlus,
  ArrowRight
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/dashboard/ActionButton";
import { useToast } from "@/hooks/use-toast";

// Define result sections
type ResultSection = "about" | "roadmap" | "tokenomics" | "community";

// Define mock data for test results
const mockAnalysisResults = {
  about: {
    name: "Celestia",
    url: "https://celestia.org",
    description: "Celestia is a modular blockchain architecture that decouples consensus from execution, allowing for a more scalable and efficient blockchain ecosystem. As a modular data availability layer, Celestia enables developers to deploy their own blockchain with minimal overhead.",
    category: "Layer 1",
    launchDate: "2023-10-31",
    keyFeatures: [
      "Modular blockchain architecture",
      "Data availability sampling",
      "Scalable consensus mechanism",
      "Optimistic rollup compatibility"
    ]
  },
  roadmap: [
    { date: "2023-Q2", title: "Mainnet Beta", completed: true, description: "Launch of beta version with limited features" },
    { date: "2023-Q4", title: "Mainnet Launch", completed: true, description: "Official launch of Celestia mainnet" },
    { date: "2024-Q1", title: "Developer Tools", completed: true, description: "Expanded SDK and developer documentation" },
    { date: "2024-Q2", title: "Ecosystem Growth", completed: false, description: "Partnerships and application development" },
    { date: "2024-Q4", title: "Advanced Features", completed: false, description: "Advanced data availability sampling" }
  ],
  tokenomics: {
    symbol: "TIA",
    totalSupply: "1,000,000,000",
    distribution: [
      { label: "Community", value: 40 },
      { label: "Team", value: 20 },
      { label: "Ecosystem Fund", value: 25 },
      { label: "Investors", value: 15 }
    ],
    useCase: "TIA is used for staking, governance, and paying for data availability services on Celestia."
  },
  community: {
    score: 82,
    sentiment: "Positive",
    metrics: [
      { name: "Github Activity", score: 87 },
      { name: "Social Media Growth", score: 75 },
      { name: "Developer Adoption", score: 82 },
      { name: "User Engagement", score: 80 }
    ],
    riskAssessment: "Medium"
  }
};

// Mock data for top and latest analyzed projects
const projectData = [
  { 
    id: 1, 
    name: "Celestia", 
    category: "Layer 1", 
    score: 82, 
    date: "2024-05-02",
    logo: "https://cryptologos.cc/logos/celestia-tia-logo.png"
  },
  { 
    id: 2, 
    name: "Arbitrum", 
    category: "Layer 2", 
    score: 88, 
    date: "2024-04-28",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png"
  },
  { 
    id: 3, 
    name: "Solana", 
    category: "Layer 1", 
    score: 76, 
    date: "2024-04-25",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png"
  },
  { 
    id: 4, 
    name: "Ethereum", 
    category: "Layer 1", 
    score: 95, 
    date: "2024-04-22",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
  },
  { 
    id: 5, 
    name: "Sui", 
    category: "Layer 1", 
    score: 79, 
    date: "2024-04-20",
    logo: "https://cryptologos.cc/logos/sui-sui-logo.png"
  }
];

const AnalyzeAI = () => {
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<typeof mockAnalysisResults | null>(null);
  const [expandedSections, setExpandedSections] = useState<ResultSection[]>(["about"]);
  
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !projectUrl) {
      toast({
        title: "Missing information",
        description: "Please provide both project name and website URL.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setAnalysisResults(null);
    
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults);
      setIsLoading(false);
      setExpandedSections(["about"]);
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${projectName}`,
      });
    }, 3000);
  };
  
  // Toggle section expansion
  const toggleSection = (section: ResultSection) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
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
  
  const resultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const isSectionExpanded = (section: ResultSection) => expandedSections.includes(section);

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
          Analyze AI
        </h1>
        <p className="text-gray-400">
          Analyze any crypto or blockchain project with our AI-powered research tool
        </p>
      </motion.div>
      
      {/* Input Form */}
      <motion.div variants={itemVariants}>
        <DashboardCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Project Name</label>
                <Input 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-[#242938] border-purple-900/30"
                  placeholder="Enter project name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Website URL</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="pl-10 bg-[#242938] border-purple-900/30"
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <ActionButton
                type="submit"
                icon={<Send size={16} />}
                loading={isLoading}
              >
                Analyze Project
              </ActionButton>
            </div>
          </form>
        </DashboardCard>
      </motion.div>

      {/* Results Section */}
      {isLoading && (
        <motion.div 
          variants={itemVariants}
          className="py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="inline-block w-20 h-20 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-purple-300 border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="mt-6 space-y-2">
            <motion.p 
              className="text-lg font-medium text-purple-300"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Analyzing {projectName}...
            </motion.p>
            <p className="text-sm text-gray-400">Our AI is gathering data and generating insights</p>
          </div>
        </motion.div>
      )}
      
      {analysisResults && !isLoading && (
        <motion.div
          variants={resultContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <DashboardCard className={`transition-all duration-300 ${isSectionExpanded('about') ? '' : 'hover:bg-purple-900/10'}`}>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('about')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <FileCheck size={20} className="text-purple-400" />
                  </div>
                  <h3 className="font-medium text-lg">Project Overview</h3>
                </div>
                
                <button className="text-gray-400 hover:text-white transition-colors">
                  {isSectionExpanded('about') ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              
              <AnimatePresence>
                {isSectionExpanded('about') && (
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
                          <p className="text-gray-300">{analysisResults.about.description}</p>
                          
                          <div className="mt-4">
                            <h4 className="text-sm text-gray-400 mb-2">Key Features</h4>
                            <ul className="list-inside space-y-1">
                              {analysisResults.about.keyFeatures.map((feature, index) => (
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
                              {analysisResults.about.category}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Launch Date</h4>
                            <p className="text-gray-300">{analysisResults.about.launchDate}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Website</h4>
                            <a 
                              href={analysisResults.about.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              {analysisResults.about.url}
                              <ArrowRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </DashboardCard>
          </motion.div>
          
          {/* Roadmap Section */}
          <motion.div variants={itemVariants}>
            <DashboardCard className={`transition-all duration-300 ${isSectionExpanded('roadmap') ? '' : 'hover:bg-purple-900/10'}`}>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('roadmap')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <Calendar size={20} className="text-blue-400" />
                  </div>
                  <h3 className="font-medium text-lg">Project Roadmap</h3>
                </div>
                
                <button className="text-gray-400 hover:text-white transition-colors">
                  {isSectionExpanded('roadmap') ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              
              <AnimatePresence>
                {isSectionExpanded('roadmap') && (
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
                        
                        {analysisResults.roadmap.map((milestone, index) => (
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
              </AnimatePresence>
            </DashboardCard>
          </motion.div>
          
          {/* Tokenomics Section */}
          <motion.div variants={itemVariants}>
            <DashboardCard className={`transition-all duration-300 ${isSectionExpanded('tokenomics') ? '' : 'hover:bg-purple-900/10'}`}>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('tokenomics')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                    <BarChart3 size={20} className="text-green-400" />
                  </div>
                  <h3 className="font-medium text-lg">Tokenomics</h3>
                </div>
                
                <button className="text-gray-400 hover:text-white transition-colors">
                  {isSectionExpanded('tokenomics') ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              
              <AnimatePresence>
                {isSectionExpanded('tokenomics') && (
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
                            <p className="text-lg font-bold">{analysisResults.tokenomics.symbol}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm text-gray-400 mb-1">Total Supply</h4>
                            <p className="text-lg">{analysisResults.tokenomics.totalSupply}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Token Utility</h4>
                            <p className="text-gray-300">{analysisResults.tokenomics.useCase}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-400 mb-2">Token Distribution</h4>
                          <div className="h-60 flex flex-col">
                            {/* Simple pie chart visualization */}
                            <div className="flex-grow relative">
                              {analysisResults.tokenomics.distribution.map((segment, index) => {
                                const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#14b8a6"];
                                const startPercent = analysisResults.tokenomics.distribution
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
                                    {analysisResults.tokenomics.symbol}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {analysisResults.tokenomics.distribution.map((segment, index) => {
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
              </AnimatePresence>
            </DashboardCard>
          </motion.div>
          
          {/* Community & Sentiment Section */}
          <motion.div variants={itemVariants}>
            <DashboardCard className={`transition-all duration-300 ${isSectionExpanded('community') ? '' : 'hover:bg-purple-900/10'}`}>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('community')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center">
                    <Users size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="font-medium text-lg">Community & Sentiment</h3>
                </div>
                
                <button className="text-gray-400 hover:text-white transition-colors">
                  {isSectionExpanded('community') ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              
              <AnimatePresence>
                {isSectionExpanded('community') && (
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
                                      analysisResults.community.score > 80 ? "#4ade80" :
                                      analysisResults.community.score > 60 ? "#facc15" :
                                      "#f87171"
                                    }
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * analysisResults.community.score / 100)}
                                    strokeLinecap="round"
                                    transform="rotate(-90, 50, 50)"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 251.2 - (251.2 * analysisResults.community.score / 100) }}
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
                                    {analysisResults.community.score}
                                  </motion.span>
                                </div>
                              </div>
                              
                              <div>
                                <div className="bg-green-900/20 text-green-400 inline-block px-2.5 py-1 rounded-full text-xs">
                                  {analysisResults.community.sentiment} Sentiment
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
                              ${analysisResults.community.riskAssessment === 'Low' 
                                ? 'bg-green-900/30 text-green-400' 
                                : analysisResults.community.riskAssessment === 'Medium'
                                ? 'bg-yellow-900/30 text-yellow-400'
                                : 'bg-red-900/30 text-red-400'
                              }
                            `}>
                              {analysisResults.community.riskAssessment} Risk
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-400 mb-3">Community Metrics</h4>
                          <div className="space-y-3">
                            {analysisResults.community.metrics.map((metric, index) => (
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
              </AnimatePresence>
            </DashboardCard>
          </motion.div>
          
          {/* Save Project Button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <Button 
              variant="outline" 
              className="px-6 py-6 bg-transparent border-purple-500/50 text-purple-400 hover:bg-purple-900/30 hover:text-purple-300"
            >
              <BookmarkPlus size={18} className="mr-2" />
              Save Project
            </Button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Top & Latest Projects Sections */}
      {!isLoading && (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {/* Top Analyzed Projects */}
          <motion.div variants={itemVariants}>
            <DashboardCard title="Top Analyzed Projects">
              <div className="space-y-2">
                {projectData.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-900/20 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2A2C3E] flex items-center justify-center overflow-hidden">
                      {project.logo ? (
                        <img src={project.logo} alt={project.name} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="text-lg">{project.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        project.score > 85 ? 'text-green-400' : 
                        project.score > 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {project.score}
                      </div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-2 text-purple-400 hover:text-purple-300">
                View All
              </Button>
            </DashboardCard>
          </motion.div>
          
          {/* Latest Analyzed Projects */}
          <motion.div variants={itemVariants}>
            <DashboardCard title="Latest Analyzed Projects">
              <div className="space-y-2">
                {projectData.slice(2, 5).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-900/20 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2A2C3E] flex items-center justify-center overflow-hidden">
                      {project.logo ? (
                        <img src={project.logo} alt={project.name} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="text-lg">{project.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Analyzed: {new Date(project.date).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        project.score > 85 ? 'text-green-400' : 
                        project.score > 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {project.score}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-2 text-purple-400 hover:text-purple-300">
                View History
              </Button>
            </DashboardCard>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyzeAI;


import { useState } from "react";
import { motion } from "framer-motion";
import { BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalyzeHandler from "@/components/analyze/AnalyzeHandler";
import AboutFetcher from "@/components/analyze/AboutFetcher";
import RoadmapFetcher from "@/components/analyze/RoadmapFetcher";
import TokenomicsFetcher from "@/components/analyze/TokenomicsFetcher";
import CommunityFetcher from "@/components/analyze/CommunityFetcher";
import InvestorsFetcher from "@/components/analyze/InvestorsFetcher";
import TeamFetcher from "@/components/analyze/TeamFetcher";
import { AboutResponse, RoadmapResponse, TokenomicsResponse, CommunityResponse, InvestorsResponse, TeamResponse } from "@/api/analyze/handlers";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["about"]);
  
  // State for fetcher results
  const [aboutData, setAboutData] = useState<AboutResponse | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapResponse | null>(null);
  const [tokenomicsData, setTokenomicsData] = useState<TokenomicsResponse | null>(null);
  const [communityData, setCommunityData] = useState<CommunityResponse | null>(null);
  const [investorsData, setInvestorsData] = useState<InvestorsResponse | null>(null);
  const [teamData, setTeamData] = useState<TeamResponse | null>(null);
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  // Handle analysis start/completion
  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setAboutData(null);
    setRoadmapData(null);
    setTokenomicsData(null);
    setCommunityData(null);
    setInvestorsData(null);
    setTeamData(null);
    setExpandedSections(["about"]);
  };
  
  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setAnalysisCompleted(true);
  };
  
  // Check if a section is expanded
  const isSectionExpanded = (section: string) => expandedSections.includes(section);
  
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
        <AnalyzeHandler
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
          onAboutComplete={setAboutData}
          onRoadmapComplete={setRoadmapData}
          onTokenomicsComplete={setTokenomicsData}
          onCommunityComplete={setCommunityData}
          onInvestorsComplete={setInvestorsData}
          onTeamComplete={setTeamData}
        />
      </motion.div>

      {/* Results Section */}
      {isAnalyzing && !aboutData && (
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
              Analyzing project...
            </motion.p>
            <p className="text-sm text-gray-400">Our AI is gathering data and generating insights</p>
          </div>
        </motion.div>
      )}
      
      {(aboutData || roadmapData || tokenomicsData || communityData || investorsData || teamData) && (
        <motion.div
          variants={resultContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* About Section */}
          <AboutFetcher
            isLoading={isAnalyzing && !aboutData}
            data={aboutData}
            expanded={isSectionExpanded('about')}
            onToggle={() => toggleSection('about')}
          />
          
          {/* Roadmap Section */}
          <RoadmapFetcher
            isLoading={isAnalyzing && !roadmapData}
            data={roadmapData}
            expanded={isSectionExpanded('roadmap')}
            onToggle={() => toggleSection('roadmap')}
          />
          
          {/* Tokenomics Section */}
          <TokenomicsFetcher
            isLoading={isAnalyzing && !tokenomicsData}
            data={tokenomicsData}
            expanded={isSectionExpanded('tokenomics')}
            onToggle={() => toggleSection('tokenomics')}
          />
          
          {/* Community Section */}
          <CommunityFetcher
            isLoading={isAnalyzing && !communityData}
            data={communityData}
            expanded={isSectionExpanded('community')}
            onToggle={() => toggleSection('community')}
          />
          
          {/* Investors Section */}
          <InvestorsFetcher
            isLoading={isAnalyzing && !investorsData}
            data={investorsData}
            expanded={isSectionExpanded('investors')}
            onToggle={() => toggleSection('investors')}
          />
          
          {/* Team Section */}
          <TeamFetcher
            isLoading={isAnalyzing && !teamData}
            data={teamData}
            expanded={isSectionExpanded('team')}
            onToggle={() => toggleSection('team')}
          />
          
          {/* Save Project Button */}
          {analysisCompleted && (
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
          )}
        </motion.div>
      )}
      
      {/* Top & Latest Projects Sections */}
      {!isAnalyzing && (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {/* Top Analyzed Projects */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#1A1F2C] rounded-lg border border-purple-900/20 overflow-hidden p-4">
              <h3 className="text-lg font-medium mb-3">Top Analyzed Projects</h3>
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
            </div>
          </motion.div>
          
          {/* Latest Analyzed Projects */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#1A1F2C] rounded-lg border border-purple-900/20 overflow-hidden p-4">
              <h3 className="text-lg font-medium mb-3">Latest Analyzed Projects</h3>
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyzeAI;


import { useState } from "react";
import { Globe, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ActionButton from "@/components/dashboard/ActionButton";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { useToast } from "@/hooks/use-toast";
import { fetchAI, AboutResponse, RoadmapResponse, TokenomicsResponse, CommunityResponse, InvestorsResponse, TeamResponse } from "@/api/analyze/handlers";

interface AnalyzeHandlerProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: () => void;
  onAboutComplete: (data: AboutResponse) => void;
  onRoadmapComplete: (data: RoadmapResponse) => void;
  onTokenomicsComplete: (data: TokenomicsResponse) => void;
  onCommunityComplete: (data: CommunityResponse) => void;
  onInvestorsComplete: (data: InvestorsResponse) => void;
  onTeamComplete: (data: TeamResponse) => void;
}

interface LoadingStates {
  about: boolean;
  roadmap: boolean;
  tokenomics: boolean;
  community: boolean;
  investors: boolean;
  team: boolean;
}

const AnalyzeHandler = ({
  onAnalysisStart,
  onAnalysisComplete,
  onAboutComplete,
  onRoadmapComplete,
  onTokenomicsComplete,
  onCommunityComplete,
  onInvestorsComplete,
  onTeamComplete
}: AnalyzeHandlerProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    about: false,
    roadmap: false,
    tokenomics: false,
    community: false,
    investors: false,
    team: false
  });
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !projectUrl) {
      toast({
        title: "Missing information",
        description: "Please provide both project name and website URL.",
        variant: "destructive"
      });
      return;
    }
    
    // Start analysis process
    setIsAnalyzing(true);
    onAnalysisStart();
    
    try {
      // About Project Analysis
      setLoadingStates(prev => ({ ...prev, about: true }));
      const aboutPrompt = `Give a clear and concise summary about ${projectName} at ${projectUrl}. Focus on what the project does, the problem it solves, and its unique value proposition.`;
      const aboutResponse = await fetchAI(aboutPrompt);
      const aboutData = (aboutResponse as any).data as AboutResponse;
      onAboutComplete(aboutData);
      setLoadingStates(prev => ({ ...prev, about: false }));
      
      // Roadmap Analysis
      setLoadingStates(prev => ({ ...prev, roadmap: true }));
      const roadmapPrompt = `What is the roadmap or future plan of ${projectName}? List it in a structured timeline format.`;
      const roadmapResponse = await fetchAI(roadmapPrompt, 2000);
      const roadmapData = (roadmapResponse as any).data as RoadmapResponse;
      onRoadmapComplete(roadmapData);
      setLoadingStates(prev => ({ ...prev, roadmap: false }));
      
      // Tokenomics Analysis
      setLoadingStates(prev => ({ ...prev, tokenomics: true }));
      const tokenomicsPrompt = `Explain the tokenomics of ${projectName}. Include token supply, utility, distribution, and vesting schedule.`;
      const tokenomicsResponse = await fetchAI(tokenomicsPrompt, 1800);
      const tokenomicsData = (tokenomicsResponse as any).data as TokenomicsResponse;
      onTokenomicsComplete(tokenomicsData);
      setLoadingStates(prev => ({ ...prev, tokenomics: false }));
      
      // Community Analysis
      setLoadingStates(prev => ({ ...prev, community: true }));
      const communityPrompt = `How active and strong is the community of ${projectName}? Analyze social media presence, community engagement, and sentiment.`;
      const communityResponse = await fetchAI(communityPrompt, 2200);
      const communityData = (communityResponse as any).data as CommunityResponse;
      onCommunityComplete(communityData);
      setLoadingStates(prev => ({ ...prev, community: false }));
      
      // Investors Analysis
      setLoadingStates(prev => ({ ...prev, investors: true }));
      const investorsPrompt = `Who are the known investors or VCs backing ${projectName}? Include firm names and logos.`;
      const investorsResponse = await fetchAI(investorsPrompt, 1500);
      const investorsData = (investorsResponse as any).data as InvestorsResponse;
      onInvestorsComplete(investorsData);
      setLoadingStates(prev => ({ ...prev, investors: false }));
      
      // Team Analysis
      setLoadingStates(prev => ({ ...prev, team: true }));
      const teamPrompt = `Who are the core team members of ${projectName}? List names, roles, and a short background on each.`;
      const teamResponse = await fetchAI(teamPrompt, 1700);
      const teamData = (teamResponse as any).data as TeamResponse;
      onTeamComplete(teamData);
      setLoadingStates(prev => ({ ...prev, team: false }));
      
      // All analyses completed
      setIsAnalyzing(false);
      onAnalysisComplete();
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${projectName}`,
      });
      
    } catch (error) {
      console.error("Analysis error:", error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing this project. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
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
              disabled={isAnalyzing}
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
                disabled={isAnalyzing}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <ActionButton
            type="submit"
            icon={<Send size={16} />}
            loading={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Project"}
          </ActionButton>
        </div>
      </form>
    </DashboardCard>
  );
};

export default AnalyzeHandler;

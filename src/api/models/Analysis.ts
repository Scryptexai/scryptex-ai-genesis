
/**
 * Analysis Model
 * 
 * Blueprint for Analysis data model
 * NOT FOR EXECUTION - Structure representation only
 */

interface ProjectAbout {
  name: string;
  url: string;
  description: string;
  category: string;
  launchDate?: string;
  keyFeatures: string[];
}

interface RoadmapMilestone {
  date: string;
  title: string;
  completed: boolean;
  description: string;
}

interface TokenDistribution {
  label: string;
  value: number;
}

interface Tokenomics {
  symbol: string;
  totalSupply: string;
  distribution: TokenDistribution[];
  useCase: string;
}

interface CommunityMetric {
  name: string;
  score: number;
}

interface Community {
  score: number;
  sentiment: string;
  metrics: CommunityMetric[];
  riskAssessment: 'Low' | 'Medium' | 'High' | 'Very High';
}

interface Analysis {
  id: string;
  userId: string;
  projectId: string;
  createdAt: Date;
  about: ProjectAbout;
  roadmap: RoadmapMilestone[];
  tokenomics: Tokenomics;
  community: Community;
}

// Schema definition would go here in a real implementation

export type { 
  Analysis, 
  ProjectAbout, 
  RoadmapMilestone, 
  Tokenomics, 
  TokenDistribution,
  Community,
  CommunityMetric
};


/**
 * Analysis Model
 * 
 * Blueprint for Analysis data model
 * NOT FOR EXECUTION - Structure representation only
 */

type AnalysisStatus = "pending" | "processing" | "completed" | "error";
type SentimentScore = -2 | -1 | 0 | 1 | 2; // -2 very negative, 2 very positive
type ProjectStrength = "strong" | "moderate" | "weak" | "unknown";
type TrustLevel = "high" | "medium" | "low" | "unknown";
type InvestmentRisk = "low" | "medium" | "high" | "very-high";
type TokenUtility = "utility" | "governance" | "security" | "payment" | "store-of-value" | "multi-purpose" | "unknown";
type TeamExpertise = "expert" | "experienced" | "novice" | "unknown";

interface Analysis {
  id: string;
  projectId: string;
  userId: string;
  createdAt: Date;
  completedAt?: Date;
  status: AnalysisStatus;
  
  // General information
  projectName: string;
  projectURL: string;
  projectDescription?: string;
  
  // Analysis results
  sentiment?: {
    overall: SentimentScore;
    community: SentimentScore;
    developers: SentimentScore;
    investors: SentimentScore;
  };
  
  roadmap?: {
    clarity: ProjectStrength;
    feasibility: ProjectStrength;
    milestones: string[];
    completedMilestones: string[];
    timeline: {
      past: {
        milestone: string;
        date: Date;
        completed: boolean;
      }[];
      upcoming: {
        milestone: string;
        estimatedDate: Date;
      }[];
    };
  };
  
  tokenomics?: {
    tokenSymbol?: string;
    totalSupply?: number;
    circulatingSupply?: number;
    distribution: {
      category: string;
      percentage: number;
    }[];
    utility: TokenUtility[];
    vesting?: {
      team: string;
      investors: string;
      community: string;
    };
    inflationRate?: number;
  };
  
  team?: {
    size?: number;
    public?: boolean;
    expertise: TeamExpertise;
    keyMembers: {
      name: string;
      role: string;
      background: string;
      linkedIn?: string;
      twitter?: string;
    }[];
    previousProjects?: string[];
  };
  
  risk?: {
    overall: InvestmentRisk;
    technical: InvestmentRisk;
    market: InvestmentRisk;
    regulatory: InvestmentRisk;
    notes?: string[];
  };
  
  recommendation?: string;
}

// Schema definition would go here in a real implementation

export type { 
  Analysis, 
  AnalysisStatus, 
  SentimentScore, 
  ProjectStrength, 
  TrustLevel, 
  InvestmentRisk, 
  TokenUtility, 
  TeamExpertise 
};

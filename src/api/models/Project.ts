
/**
 * Project Model
 * 
 * Blueprint for Project data model
 * NOT FOR EXECUTION - Structure representation only
 */

type ProjectCategory = "DeFi" | "GameFi" | "NFT" | "Layer 1" | "Layer 2" | "DAO" | "Infrastructure" | "AI" | "Other";
type TrendDirection = "rising" | "falling" | "stable";
type RiskLevel = "Low" | "Medium" | "High" | "Very High";

interface Project {
  id: string;
  name: string;
  url: string;
  category: ProjectCategory;
  description?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  analysisCount: number;
  savedCount: number;
  averageSentiment?: number;
  trend?: TrendDirection;
  risk?: RiskLevel;
  isAirdrop?: boolean;
  airdropDetails?: {
    startDate?: Date;
    endDate?: Date;
    tokenSymbol?: string;
    eligibilityRequirements?: string[];
    rewardEstimate?: string;
  };
}

// Schema definition would go here in a real implementation

export type { Project, ProjectCategory, TrendDirection, RiskLevel };

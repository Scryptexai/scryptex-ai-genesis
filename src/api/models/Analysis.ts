
/**
 * Analysis Model
 * 
 * Blueprint for Analysis data model
 * NOT FOR EXECUTION - Structure representation only
 */

type AnalysisType = "about" | "roadmap" | "tokenomics" | "team" | "sentiment";

interface Analysis {
  id: string;
  userId: string;
  projectId: string;
  type: AnalysisType;
  creditsUsed: number;
  date: Date;
  result: Record<string, any>; // Varies based on analysis type
  aiConfidence: number;
}

interface AboutAnalysis extends Analysis {
  result: {
    summary: string;
    keyPoints: string[];
    sentiment: number;
    concerns: string[];
  };
}

interface RoadmapAnalysis extends Analysis {
  result: {
    milestones: Array<{
      title: string;
      date: string;
      analysis: string;
      feasibility: number;
    }>;
    completionRisk: number;
    timeline: string;
  };
}

interface TokenomicsAnalysis extends Analysis {
  result: {
    distribution: Array<{
      category: string;
      percentage: number;
      analysis: string;
    }>;
    supplyModel: string;
    tokenUtility: string;
    concerns: string[];
    positives: string[];
  };
}

interface TeamAnalysis extends Analysis {
  result: {
    teamMembers: Array<{
      name: string;
      role: string;
      background: string;
      linkedProjects: string[];
      riskFactors: string[];
      confidence: number;
    }>;
    overallAssessment: string;
    transparencyScore: number;
    concerns: string[];
  };
}

interface SentimentAnalysis extends Analysis {
  result: {
    overallSentiment: number;
    communityMetrics: {
      twitter?: Record<string, any>;
      discord?: Record<string, any>;
      telegram?: Record<string, any>;
      github?: Record<string, any>;
    };
    marketAnalysis: {
      competitivePosition: string;
      uniqueSellingPoints: string[];
      marketPotential: number;
    };
  };
}

// Schema definition would go here in a real implementation

export { 
  Analysis, 
  AnalysisType, 
  AboutAnalysis, 
  RoadmapAnalysis, 
  TokenomicsAnalysis, 
  TeamAnalysis, 
  SentimentAnalysis 
};


// Mock function to simulate AI API calls
export async function fetchAI(prompt: string, delay = 1500) {
  // This simulates an API call to an AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: generateMockResponse(prompt)
      });
    }, delay);
  });
}

// Mock response generator based on prompt type
function generateMockResponse(prompt: string) {
  if (prompt.includes("summary about")) {
    return {
      description: "Celestia is a modular blockchain architecture that decouples consensus from execution, allowing for a more scalable and efficient blockchain ecosystem. As a modular data availability layer, Celestia enables developers to deploy their own blockchain with minimal overhead.",
      category: "Layer 1",
      launchDate: "2023-10-31",
      score: 8.5,
      keyFeatures: [
        "Modular blockchain architecture",
        "Data availability sampling",
        "Scalable consensus mechanism",
        "Optimistic rollup compatibility"
      ]
    };
  }
  
  if (prompt.includes("roadmap or future plan")) {
    return {
      roadmap: [
        { date: "2023-Q2", title: "Mainnet Beta", completed: true, description: "Launch of beta version with limited features" },
        { date: "2023-Q4", title: "Mainnet Launch", completed: true, description: "Official launch of Celestia mainnet" },
        { date: "2024-Q1", title: "Developer Tools", completed: true, description: "Expanded SDK and developer documentation" },
        { date: "2024-Q2", title: "Ecosystem Growth", completed: false, description: "Partnerships and application development" },
        { date: "2024-Q4", title: "Advanced Features", completed: false, description: "Advanced data availability sampling" }
      ]
    };
  }
  
  if (prompt.includes("tokenomics")) {
    return {
      symbol: "TIA",
      totalSupply: "1,000,000,000",
      distribution: [
        { label: "Community", value: 40 },
        { label: "Team", value: 20 },
        { label: "Ecosystem Fund", value: 25 },
        { label: "Investors", value: 15 }
      ],
      useCase: "TIA is used for staking, governance, and paying for data availability services on Celestia."
    };
  }
  
  if (prompt.includes("community")) {
    return {
      score: 82,
      sentiment: "Positive",
      metrics: [
        { name: "Github Activity", score: 87 },
        { name: "Social Media Growth", score: 75 },
        { name: "Developer Adoption", score: 82 },
        { name: "User Engagement", score: 80 }
      ],
      riskAssessment: "Medium"
    };
  }
  
  if (prompt.includes("investors")) {
    return {
      investors: [
        { name: "Polychain Capital", logo: "https://placekitten.com/100/100", round: "Seed" },
        { name: "Binance Labs", logo: "https://placekitten.com/101/101", round: "Series A" },
        { name: "Bain Capital Crypto", logo: "https://placekitten.com/102/102", round: "Series A" },
        { name: "Coinbase Ventures", logo: "https://placekitten.com/103/103", round: "Series B" }
      ],
      totalFunding: "$52M"
    };
  }
  
  if (prompt.includes("team members")) {
    return {
      coreTeam: [
        { name: "John Smith", role: "CEO & Co-Founder", background: "Previously at Ethereum Foundation, PhD in Distributed Systems", image: "https://placekitten.com/200/200" },
        { name: "Sarah Johnson", role: "CTO & Co-Founder", background: "Ex-Google, specialized in consensus algorithms", image: "https://placekitten.com/201/201" },
        { name: "Michael Chen", role: "Chief Research Officer", background: "Former professor at MIT, cryptography expert", image: "https://placekitten.com/202/202" },
        { name: "Lisa Williams", role: "Head of Ecosystem", background: "Previously at Cosmos, community growth specialist", image: "https://placekitten.com/203/203" }
      ]
    };
  }
  
  // Default response if prompt doesn't match any specific type
  return {
    message: "Analysis completed successfully",
    summary: "This is a generic response for " + prompt
  };
}

// Type definitions for the responses
export interface AboutResponse {
  description: string;
  category: string;
  launchDate: string;
  score: number;
  keyFeatures: string[];
}

export interface RoadmapResponse {
  roadmap: {
    date: string;
    title: string;
    completed: boolean;
    description: string;
  }[];
}

export interface TokenomicsResponse {
  symbol: string;
  totalSupply: string;
  distribution: {
    label: string;
    value: number;
  }[];
  useCase: string;
}

export interface CommunityResponse {
  score: number;
  sentiment: string;
  metrics: {
    name: string;
    score: number;
  }[];
  riskAssessment: string;
}

export interface InvestorsResponse {
  investors: {
    name: string;
    logo: string;
    round: string;
  }[];
  totalFunding: string;
}

export interface TeamResponse {
  coreTeam: {
    name: string;
    role: string;
    background: string;
    image: string;
  }[];
}

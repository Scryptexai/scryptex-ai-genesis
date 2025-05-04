
/**
 * Airdrop Model
 * 
 * Blueprint for Airdrop data model
 * NOT FOR EXECUTION - Structure representation only
 */

type AirdropStatus = 'live' | 'upcoming' | 'ending' | 'completed';

interface Airdrop {
  id: string;
  name: string;
  status: AirdropStatus;
  logo?: string;
  reward: string;
  endDate: string;
  startDate?: string;
  category: string;
  eligibility: string;
  description: string;
  website?: string;
  submittedBy?: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition would go here in a real implementation

export type { Airdrop, AirdropStatus };

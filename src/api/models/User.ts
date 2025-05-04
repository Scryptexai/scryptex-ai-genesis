
/**
 * User Model
 * 
 * Blueprint for User data model
 * NOT FOR EXECUTION - Structure representation only
 */

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  referralCode: string;
  referredBy?: string;
  points: number;
  credits: number;
  createdAt: Date;
  lastLoginAt: Date;
  projectsAnalyzed: number;
  referrals: number;
}

// Schema definition would go here in a real implementation

export type { User };


/**
 * Credit Model
 * 
 * Blueprint for Credit transaction data model
 * NOT FOR EXECUTION - Structure representation only
 */

type TransactionType = "credit" | "debit";
type TransactionPurpose = 
  | "purchase" 
  | "referral_bonus" 
  | "signup_bonus" 
  | "analyze_project" 
  | "refund" 
  | "admin_adjustment";

interface CreditTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  purpose: TransactionPurpose;
  projectId?: string;
  projectName?: string;
  paymentMethod?: string;
  paymentId?: string;
  timestamp: Date;
  notes?: string;
}

// Schema definition would go here in a real implementation

export { CreditTransaction, TransactionType, TransactionPurpose };

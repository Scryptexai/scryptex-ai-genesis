
import { useState } from "react";
import { motion } from "framer-motion";
import { CircleDollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BuyCreditModal from "./BuyCreditModal";

interface TokenCreditDisplayProps {
  className?: string;
}

const TokenCreditDisplay = ({ className = "" }: TokenCreditDisplayProps) => {
  const [balance, setBalance] = useState(100); // Mock balance
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // For demo purposes - this would be an API call in a real app
  const addCredits = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="flex items-center gap-2 bg-[#242938] rounded-full py-1 px-3 border border-purple-900/30"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex items-center">
          <CircleDollarSign className="w-4 h-4 text-purple-400" />
          <span className="ml-1 text-sm font-medium text-white">TEX</span>
        </div>
        <motion.span 
          className="font-mono text-sm font-bold text-white"
          key={balance} // This causes the animation to trigger when balance changes
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {balance}
        </motion.span>
      </motion.div>
      
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full w-8 h-8 p-0 bg-purple-500/10 hover:bg-purple-500/20"
        onClick={() => setIsBuyModalOpen(true)}
      >
        <Plus className="w-4 h-4 text-purple-400" />
      </Button>
      
      <BuyCreditModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)}
        onPurchase={addCredits}
      />
    </div>
  );
};

export default TokenCreditDisplay;

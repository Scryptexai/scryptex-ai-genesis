
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Copy, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import QRCode from "./QRCode";

interface BuyCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

// Mock wallet addresses
const WALLET_ADDRESSES = {
  "USDT (Ethereum)": "0xD85792C476Ffc7767ABcba0000bEef2479d16f31",
  "ETH (Ethereum)": "0xD85792C476Ffc7767ABcba0000bEef2479d16f31",
  "ETH (Arbitrum)": "0xA85792C476Ffc7767ABcba0000bEef2479d16f32",
  "ETH (Base)": "0xB85792C476Ffc7767ABcba0000bEef2479d16f33"
};

type PaymentMethod = keyof typeof WALLET_ADDRESSES;

const CREDIT_PACKAGES = [
  { amount: 100, price: "10" },
  { amount: 250, price: "20" },
  { amount: 500, price: "35" },
  { amount: 1000, price: "60" },
];

const BuyCreditModal = ({ isOpen, onClose, onPurchase }: BuyCreditModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("USDT (Ethereum)");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [view, setView] = useState<"select" | "payment" | "success">("select");
  
  const { toast } = useToast();
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };
  
  const handleContinue = () => {
    if (selectedAmount) {
      setView("payment");
    } else {
      toast({
        title: "Please select an amount",
        description: "Choose a TEX credit package to continue",
        variant: "destructive"
      });
    }
  };
  
  const handleCopyAddress = () => {
    const address = WALLET_ADDRESSES[paymentMethod];
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard"
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setView("success");
      
      // Simulate successful payment
      if (selectedAmount) {
        onPurchase(selectedAmount);
      }
    }, 2000);
  };
  
  const handleCloseSuccess = () => {
    onClose();
    // Reset state for next time
    setTimeout(() => {
      setView("select");
      setSelectedAmount(null);
    }, 300);
  };
  
  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.5 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border border-purple-900/30 bg-[#1A1F2C] text-white">
        <motion.div
          className="relative p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors"
          >
            <X size={18} />
          </button>
          
          {/* Modal Header */}
          <div className="mb-6 text-center">
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 mx-auto mb-4 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wallet size={20} className="text-white" />
            </motion.div>
            <h2 className="text-xl font-bold">
              {view === "select" ? "Buy TEX Credits" : 
               view === "payment" ? "Complete Payment" : 
               "Purchase Complete!"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {view === "select" ? "Choose amount of credits to purchase" : 
               view === "payment" ? "Send payment to the wallet address below" : 
               "Your credits have been added to your balance"}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {/* Select Amount View */}
            {view === "select" && (
              <motion.div
                key="select-view"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {CREDIT_PACKAGES.map((pkg) => (
                    <motion.button
                      key={pkg.amount}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        selectedAmount === pkg.amount
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-purple-900/30 bg-[#242938] hover:bg-[#2a3146]"
                      } transition-all`}
                      onClick={() => handleAmountSelect(pkg.amount)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg font-bold text-white">{pkg.amount}</span>
                      <span className="text-sm text-gray-400">TEX Credits</span>
                      <span className="mt-1 px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300">
                        ${pkg.price}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Custom Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter TEX amount"
                    className="bg-[#242938] border-purple-900/30 text-white"
                    onChange={(e) => setSelectedAmount(parseInt(e.target.value, 10) || null)}
                  />
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </motion.div>
            )}
            
            {/* Payment View */}
            {view === "payment" && (
              <motion.div
                key="payment-view"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                  <Select 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  >
                    <SelectTrigger className="bg-[#242938] border-purple-900/30 text-white">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#242938] border-purple-900/30 text-white">
                      {Object.keys(WALLET_ADDRESSES).map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 rounded-lg bg-[#242938] border border-purple-900/30">
                  <div className="text-sm text-gray-400 mb-2">Send {paymentMethod} to:</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-mono text-xs bg-[#1A1F2C] p-2 rounded border border-purple-900/30 overflow-hidden overflow-ellipsis">
                      {WALLET_ADDRESSES[paymentMethod]}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-auto bg-purple-500/10 hover:bg-purple-500/20"
                      onClick={handleCopyAddress}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center my-4">
                  <QRCode value={WALLET_ADDRESSES[paymentMethod]} size={160} />
                </div>
                
                <div className="bg-[#242938] p-3 rounded-lg border border-purple-900/30 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-bold">{selectedAmount} TEX</span>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </div>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
                
                <div className="text-xs text-gray-500 text-center mt-2">
                  This is a simulated payment for demonstration purposes
                </div>
              </motion.div>
            )}
            
            {/* Success View */}
            {view === "success" && (
              <motion.div
                key="success-view"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <h3 className="text-lg font-medium mb-2">Credits Added!</h3>
                
                <div className="bg-[#242938] p-4 rounded-lg mb-6 flex items-center justify-center gap-2">
                  <span className="text-lg font-bold">+{selectedAmount}</span>
                  <span className="text-purple-400">TEX Credits</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-6">
                  Your credits have been added to your balance and are ready to use
                </p>
                
                <Button 
                  onClick={handleCloseSuccess}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
                >
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyCreditModal;

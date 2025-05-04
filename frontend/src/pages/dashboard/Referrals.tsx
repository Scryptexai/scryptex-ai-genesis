
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActionButton from "@/components/dashboard/ActionButton";
import { Copy, Share2, Trophy, Users, Star } from "lucide-react";

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "SCRYPTEX-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://scryptex.ai/referral/${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const topReferrers = [
    { name: "alex.eth", points: 4550, referrals: 12 },
    { name: "crypto_sage", points: 3720, referrals: 9 },
    { name: "web3_wizard", points: 3150, referrals: 7 },
    { name: "nft_collector", points: 2840, referrals: 6 },
    { name: "defi.guy", points: 2100, referrals: 5 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
          Referral & Points
        </h1>
        <p className="text-gray-400">
          Share Scryptex with friends, earn points, and unlock exclusive features
        </p>
      </motion.div>

      {/* Referral Card */}
      <motion.div variants={itemVariants}>
        <DashboardCard glowEffect className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-white">Your Referral Code</h2>
                <p className="text-gray-300">Share this code with friends to earn 500 points for each sign-up</p>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg px-4 py-3 font-mono font-medium text-purple-300">
                    {referralCode}
                  </div>
                  <ActionButton 
                    icon={copied ? <Star size={18} /> : <Copy size={18} />}
                    variant="outline"
                    onClick={handleCopy}
                    className="h-12"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </ActionButton>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-[1px] rounded-full">
                  <div className="bg-[#1A1F2C] rounded-full p-4">
                    <Share2 size={32} className="text-blue-400" />
                  </div>
                </div>
                <ActionButton 
                  variant="gradient" 
                  onClick={() => alert("Share functionality would open here")}
                >
                  Share Your Link
                </ActionButton>
                <p className="text-xs text-center text-gray-400">via Twitter, Telegram, Discord</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard className="text-center">
          <div className="bg-purple-900/30 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
            <Users size={24} className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-gray-400">Total Referrals</div>
        </DashboardCard>
        
        <DashboardCard className="text-center">
          <div className="bg-purple-900/30 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
            <Star size={24} className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">2,450</div>
          <div className="text-gray-400">Points Earned</div>
        </DashboardCard>
        
        <DashboardCard className="text-center">
          <div className="bg-purple-900/30 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
            <Trophy size={24} className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">3</div>
          <div className="text-gray-400">Current Level</div>
        </DashboardCard>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={itemVariants}>
        <DashboardCard title="Top Referrers">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-900/30">
                  <th className="text-left py-3 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Username</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Referrals</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Points</th>
                </tr>
              </thead>
              <tbody>
                {topReferrers.map((user, index) => (
                  <motion.tr 
                    key={index}
                    className="border-b border-purple-900/20 hover:bg-purple-900/20 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <td className="py-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 font-medium">{user.name}</td>
                    <td className="py-3 text-right text-gray-300">{user.referrals}</td>
                    <td className="py-3 text-right font-medium text-purple-300">{user.points}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Coming Soon */}
      <motion.div variants={itemVariants}>
        <DashboardCard className="border border-dashed">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">Rewards Program Coming Soon</h3>
            <p className="text-gray-400 max-w-lg mx-auto">
              Exchange your points for exclusive features, NFTs, and early access to new tools. 
              Stay tuned for the full rewards program launch!
            </p>
          </div>
        </DashboardCard>
      </motion.div>
    </motion.div>
  );
};

export default Referrals;

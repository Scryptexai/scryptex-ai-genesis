import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TrustIndicators from './TrustIndicators';
import WaitlistModal from '@/components/auth/WaitlistModal';
import AnimatedBackground from './AnimatedBackground'

const HeroContent: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  // SVG Avatar Component
  const AvatarSVG = ({ index }: { index: number }) => {
    const colors = [
      { primary: '#06B6D4', secondary: '#8B5CF6' },
      { primary: '#8B5CF6', secondary: '#EC4899' },
      { primary: '#10B981', secondary: '#3B82F6' },
      { primary: '#F59E0B', secondary: '#EF4444' },
      { primary: '#EC4899', secondary: '#06B6D4' }
    ];
    
    const color = colors[index % colors.length];
    
    return (
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-full border-2 border-[#0A0B1E] overflow-hidden"
        >
          <rect width="32" height="32" fill={`url(#gradient-${index})`}/>
          <circle cx="16" cy="12" r="5" fill="white" fillOpacity="0.9"/>
          <path d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26H8Z" fill="white" fillOpacity="0.9"/>
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor={color.primary}/>
              <stop offset="1" stopColor={color.secondary}/>
            </linearGradient>
          </defs>
        </svg>
        {index === 0 && (
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#0A0B1E]">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Limited Time Offer Badge - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-3"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-semibold text-xs">Limited Time • 72 Hours Only</span>
              <span className="ml-1.5 text-yellow-400 text-xs">🔥</span>
            </div>
          </motion.div>

          {/* Status Badge - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <span className="relative flex h-1 w-1 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-medium text-xs">Live • AI Trading System Active</span>
            </div>
          </motion.div>

          {/* Main Headline - Much Smaller */}
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 leading-tight"
          >
            <span className="text-white">Stop Missing</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 animate-gradient">
              $30K+ Airdrops
            </span>
            <br />
            <span className="text-white">While You Sleep</span>
            <span className="inline-block ml-2 text-xl md:text-2xl animate-bounce">😴</span>
          </motion.h1>

          {/* Sub-headline - Smaller */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base text-gray-300 text-center mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Your AI copilot tracks <span className="text-cyan-400 font-semibold">100+ airdrop farms</span> 24/7, 
            auto-executes tasks, and grabs those <span className="text-green-400 font-semibold">juicy rewards</span> before 
            everyone else. No more FOMO, just pure gains! 🚀
          </motion.p>

          {/* Success Story - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.45 }}
            className="text-center mb-6"
          >
            <p className="text-sm text-yellow-400 font-medium">
              ⭐ "Made $47,000 from 3 airdrops in just 2 months!" - @CryptoHunter_88
            </p>
          </motion.div>

          {/* Feature Pills - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {[
              { icon: '✨', text: 'AI Auto-Pilot Mode', color: 'from-cyan-500/20 to-cyan-500/10' },
              { icon: '⚡', text: '0.1s Task Execution', color: 'from-yellow-500/20 to-yellow-500/10' },
              { icon: '🛡️', text: 'Scam Protection', color: 'from-purple-500/20 to-purple-500/10' },
              { icon: '📊', text: 'Real-Time Analytics', color: 'from-green-500/20 to-green-500/10' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${feature.color} backdrop-blur-sm border border-white/10`}
              >
                <span className="text-sm">{feature.icon}</span>
                <span className="text-white font-medium text-xs">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWaitlistOpen(true)}
              className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg font-bold text-white overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <span className="text-base">Claim Your Spot Now • Get 50,000 TEX</span>
                <span className="block text-xs font-normal opacity-90">
                  ⚡ Only 126 spots left! Join 8,743+ hunters
                </span>
              </div>
              
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 animate-pulse" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all relative overflow-hidden group"
            >
              <span className="text-base font-bold">Watch 2-Min Demo</span>
              <span className="block text-xs font-normal opacity-90">See $30K profit in action</span>
              
              <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full w-full bg-[#0A0B1E] rounded-lg" />
              </div>
            </motion.button>
          </motion.div>

          {/* Urgency Message - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-red-400 font-medium">
              ⏰ Price increases to $997 in 72 hours! Save $499 today
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <div className="flex -space-x-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <AvatarSVG key={i} index={i} />
                ))}
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="text-gray-300 text-xs"
              >
                +127 joined in last 2 hours
              </motion.span>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <TrustIndicators />
          </motion.div>

          {/* Money Back Guarantee - Smaller */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
            >
              <span className="text-lg">💰</span>
              <span className="text-green-400 font-medium text-xs">30-Day Money Back Guarantee • Risk-Free Trial</span>
            </motion.div>
          </motion.div>

          {/* Floating Elements - Smaller and Hidden on Mobile */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-5 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1 hidden lg:block"
          >
            <span className="text-green-400 font-bold text-xs">+$12,450</span>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-1/4 right-5 bg-purple-500/10 border border-purple-500/20 rounded-lg px-2 py-1 hidden lg:block"
          >
            <span className="text-purple-400 font-bold text-xs">+$8,900</span>
          </motion.div>

          {/* Decorative Elements - Smaller */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-24 left-5 w-12 h-12 border border-cyan-500/20 rounded-full hidden md:block"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-24 right-5 w-16 h-16 border border-purple-500/20 rounded-full hidden md:block"
          />
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
};

export default HeroContent;

import { motion } from "framer-motion";
import { Search, Wallet, Rocket, Database, ArrowRight } from "lucide-react";
import { fadeIn, staggerContainer, glowVariants } from "@/lib/animation";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "AI Project Analyzer",
      description: "Instantly analyze any Web3 project's tokenomics, team history, and contract security with our AI-powered research tools."
    },
    {
      icon: Wallet,
      title: "Wallet Activity Tracker",
      description: "Monitor and analyze on-chain activity across multiple wallets. Get real-time alerts on whale movements and token transfers."
    },
    {
      icon: Rocket,
      title: "Farming Automation Agent",
      description: "Let our AI agents handle DeFi farming strategies, gas optimization, and position management to maximize your yields."
    },
    {
      icon: Database,
      title: "Multi-chain Wallet Tools",
      description: "One platform for all your Web3 needs across any blockchain. Track, analyze, and optimize your entire portfolio."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <motion.div 
        className="absolute top-1/3 right-0 w-72 h-72 bg-scryptex-purple/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div 
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div 
            variants={fadeIn('up', 0.2)}
            className="inline-block px-3 py-1 bg-scryptex-purple/20 rounded-full text-scryptex-lightpurple text-sm font-medium mb-4"
          >
            POWERFUL FEATURES
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 0.4)}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Supercharge Your Web3 Research
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.6)}
            className="text-gray-400 md:text-lg"
          >
            Advanced AI tools that bring clarity and automation to your Web3 research and strategy.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', index * 0.15 + 0.5)}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                borderColor: "rgba(168, 85, 247, 0.5)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-scryptex-purple/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-scryptex-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 h-full flex flex-col relative z-10">
                <motion.div 
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(168, 85, 247, 0.3)"
                  }}
                  className="mb-6 p-3 rounded-lg bg-scryptex-purple/20 w-fit group-hover:bg-scryptex-purple/30 transition-colors"
                >
                  <feature.icon className="h-6 w-6 text-scryptex-lightpurple" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 flex-1 mb-4">{feature.description}</p>
                <motion.div 
                  className="flex items-center text-scryptex-lightpurple group-hover:translate-x-2 transition-transform duration-300"
                  whileHover={{
                    x: 5,
                    color: "#a855f7"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <span className="text-sm font-medium mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                
                {/* Glow effect */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-scryptex-purple/30 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

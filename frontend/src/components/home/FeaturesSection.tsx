
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Wallet,
  Rocket,
  Database,
  ArrowRight
} from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  // Staggered card positions for zig-zag layout
  const positions = [
    "md:translate-y-0",
    "md:translate-y-12",
    "md:translate-y-0",
    "md:translate-y-12"
  ];

  return (
    <section id="features" ref={ref} className="py-20 relative">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-scryptex-purple/20 rounded-full blur-3xl" />
      
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-scryptex-purple/20 rounded-full text-scryptex-lightpurple text-sm font-medium mb-4">
            POWERFUL FEATURES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Supercharge Your Web3 Research</h2>
          <p className="text-gray-400 md:text-lg">
            Advanced AI tools that bring clarity and automation to your Web3 research and strategy.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-scryptex-purple/50 transition-all duration-500 ${positions[index]}`}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-scryptex-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-7 h-full flex flex-col relative z-10">
                <div className="mb-6 p-3 rounded-lg bg-scryptex-purple/20 w-fit group-hover:bg-scryptex-purple/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-scryptex-lightpurple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 flex-1 mb-4">{feature.description}</p>
                <motion.div 
                  className="flex items-center text-scryptex-lightpurple group-hover:translate-x-2 transition-transform duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-medium mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
                
                {/* Glow effect */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-scryptex-purple/30 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;

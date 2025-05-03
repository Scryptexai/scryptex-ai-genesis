
import {
  Search,
  Wallet,
  Rocket,
  Database
} from "lucide-react";

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
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-scryptex-purple/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400">
            Advanced AI tools that bring clarity and automation to your Web3 research and strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="gradient-border h-full group"
            >
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg h-full flex flex-col hover:translate-y-[-5px] transition-all duration-300">
                <div className="mb-4 p-3 rounded-full bg-scryptex-purple/20 w-fit group-hover:bg-scryptex-purple/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-scryptex-lightpurple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 flex-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

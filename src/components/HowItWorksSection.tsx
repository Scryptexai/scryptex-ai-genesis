
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Securely connect your Web3 wallet to access personalized insights and analytics with end-to-end encryption."
    },
    {
      number: "02",
      title: "Add Projects",
      description: "Input token contracts, NFTs, or project addresses that you want to track and analyze across multiple chains."
    },
    {
      number: "03",
      title: "Set AI Parameters",
      description: "Configure your AI agents to focus on specific metrics, alerts, or automation tasks that matter to your strategy."
    },
    {
      number: "04",
      title: "Get Insights",
      description: "Receive real-time analytics, research reports, and automated actions from your AI agents working 24/7."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-transparent via-[#13052b] to-transparent relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-scryptex-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-scryptex-purple/20 rounded-full text-scryptex-lightpurple text-sm font-medium mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Process, Powerful Results</h2>
          <p className="text-gray-400 md:text-lg">
            Get started with Scryptex in just a few simple steps and transform your Web3 research
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple/50 to-scryptex-purple/0 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 group">
                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full hover:border-scryptex-purple/50 transition-all duration-300">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="text-5xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">{step.number}</span>
                    {index < steps.length - 1 && (
                      <div className="lg:block hidden">
                        <ArrowRight className="h-6 w-6 text-scryptex-purple group-hover:translate-x-2 transition-transform" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                
                <div className="lg:block hidden absolute top-28 left-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple transform -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

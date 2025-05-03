
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Securely connect your Web3 wallet to access personalized insights and analytics."
    },
    {
      number: "02",
      title: "Add Projects",
      description: "Input token contracts, NFTs, or project addresses that you want to track and analyze."
    },
    {
      number: "03",
      title: "Set AI Parameters",
      description: "Configure your AI agents to focus on specific metrics, alerts, or automation tasks."
    },
    {
      number: "04",
      title: "Get Insights",
      description: "Receive real-time analytics, research reports, and automated actions from your AI agents."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-transparent to-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400">
            Get started with Scryptex in just a few simple steps
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple/50 to-scryptex-purple/0 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-white/10 h-full">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-scryptex-lightpurple opacity-70">{step.number}</span>
                    {index < steps.length - 1 && (
                      <div className="lg:block hidden">
                        <ArrowRight className="h-6 w-6 text-scryptex-purple" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                
                <div className="lg:block hidden absolute top-8 left-1/2 w-4 h-4 rounded-full bg-scryptex-purple transform -translate-x-1/2 z-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

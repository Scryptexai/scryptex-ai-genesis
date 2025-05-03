
import { CircleCheck, Clock, ChartBar, ShieldCheck } from "lucide-react";

const AiBenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 10+ Hours Weekly",
      description: "Automate research that would take hours manually. Let AI agents work 24/7 on your behalf."
    },
    {
      icon: ChartBar,
      title: "20% Better Yield Performance",
      description: "AI-optimized strategies consistently outperform manual approaches by identifying optimal entry and exit points."
    },
    {
      icon: ShieldCheck,
      title: "Reduce Risk by 35%",
      description: "Proactive security scanning and real-time monitoring help you avoid scams and low-quality projects."
    },
    {
      icon: CircleCheck,
      title: "100% Objective Analysis",
      description: "Get unbiased insights based on on-chain data, not influenced by marketing or hype."
    }
  ];

  return (
    <section id="benefits" className="py-20 relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Benefits</h2>
          <p className="text-gray-400">
            Our AI tools deliver measurable advantages to your Web3 research and investing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-3 p-2 rounded-full bg-scryptex-purple/20 w-fit">
                    <benefit.icon className="h-5 w-5 text-scryptex-lightpurple" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-6">
            <div className="h-full flex items-center justify-center">
              <div className="w-full">
                <h3 className="text-xl font-semibold mb-4">AI Research Efficiency</h3>
                
                {/* Chart/Visualization Mockup */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Manual Research</span>
                      <span>25 hours</span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2.5">
                      <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Scryptex AI</span>
                      <span>3 hours</span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple h-2.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-sm text-gray-400 mb-2">Risk Detection Accuracy</div>
                    <div className="flex gap-1 items-end h-24">
                      <div className="bg-gray-500 w-1/3 h-1/3 rounded-t"></div>
                      <div className="bg-gray-500 w-1/3 h-1/2 rounded-t"></div>
                      <div className="bg-gray-500 w-1/3 h-3/5 rounded-t"></div>
                      <div className="bg-gradient-to-b from-scryptex-lightpurple to-scryptex-purple w-1/3 h-5/6 rounded-t"></div>
                      <div className="bg-gradient-to-b from-scryptex-lightpurple to-scryptex-purple w-1/3 h-full rounded-t"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Human</span>
                      <span>Basic</span>
                      <span>Tools</span>
                      <span>AI</span>
                      <span>Scryptex</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiBenefitsSection;

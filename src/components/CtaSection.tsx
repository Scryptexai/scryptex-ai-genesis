
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13052b] to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-scryptex-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-12 relative">
            {/* Glowing accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple to-scryptex-purple/0"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
              </div>
              <span className="text-sm font-medium text-scryptex-lightpurple">START IMMEDIATELY</span>
            </div>
            
            <div className="md:flex items-center justify-between">
              <div className="md:max-w-xl mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Web3 Research Process?</h2>
                <p className="text-gray-300">
                  Join thousands of researchers who are using AI to gain deeper insights, save time, and make better decisions in the Web3 space.
                </p>
              </div>
              
              <div>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_15px_rgba(168,85,247,0.3)] w-full md:w-auto"
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Launch App <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

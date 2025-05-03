
import { motion } from "framer-motion";
import { CircleCheck, Clock, ChartBar, ShieldCheck } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animation";

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
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptMiAyaDF2NGgtMXYtNHptLTItM2gxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            AI-POWERED BENEFITS
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 0.4)} 
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Measurable Advantages
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.6)} 
            className="text-gray-400 md:text-lg"
          >
            Our AI tools deliver quantifiable benefits to your Web3 research and investing strategy
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer(0.2, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <motion.div 
            variants={fadeIn('right', 0.3)}
            className="md:col-span-5"
          >
            <motion.div 
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                borderColor: "rgba(168, 85, 247, 0.5)" 
              }}
              className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeIn('up', index * 0.15 + 0.3)}
                    className="flex flex-col"
                  >
                    <motion.div 
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(168, 85, 247, 0.3)" 
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      className="mb-4 p-3 rounded-lg bg-scryptex-purple/20 w-fit"
                    >
                      <benefit.icon className="h-5 w-5 text-scryptex-lightpurple" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('left', 0.3)}
            className="md:col-span-7"
          >
            <motion.div 
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                borderColor: "rgba(168, 85, 247, 0.5)" 
              }}
              className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full"
            >
              <h3 className="text-xl font-semibold mb-6">AI Research Efficiency</h3>
              
              {/* Chart/Visualization Mockup */}
              <div className="space-y-8">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2,
                    ease: "easeOut" 
                  }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span>Manual Research</span>
                    <span>25 hours</span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-4 overflow-hidden">
                    <motion.div 
                      className="bg-gray-500 h-4 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2,
                        delay: 0.4,
                        ease: "easeOut" 
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeOut" 
                  }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span>Scryptex AI</span>
                    <span>3 hours</span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-4 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple h-4 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "15%" }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2,
                        delay: 0.7,
                        ease: "easeOut" 
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={fadeIn('up', 0.8)}
                  className="pt-6"
                >
                  <div className="text-sm text-gray-300 mb-4">Risk Detection Accuracy</div>
                  <div className="flex gap-3 items-end h-36">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: "33.333%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="bg-gray-500 w-1/5 h-1/3 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/10 px-2 py-1 rounded transition-opacity">42%</div>
                      <div className="absolute bottom-0 left-0 w-full text-center text-xs pt-2">Human</div>
                    </motion.div>
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.7 }}
                      className="bg-gray-500 w-1/5 h-1/2 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/10 px-2 py-1 rounded transition-opacity">56%</div>
                      <div className="absolute bottom-0 left-0 w-full text-center text-xs pt-2">Basic</div>
                    </motion.div>
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                      className="bg-gray-500 w-1/5 h-3/5 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/10 px-2 py-1 rounded transition-opacity">63%</div>
                      <div className="absolute bottom-0 left-0 w-full text-center text-xs pt-2">Tools</div>
                    </motion.div>
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: "83.333%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                      className="bg-gradient-to-b from-scryptex-lightpurple to-scryptex-purple w-1/5 h-5/6 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/10 px-2 py-1 rounded transition-opacity">84%</div>
                      <div className="absolute bottom-0 left-0 w-full text-center text-xs pt-2">AI</div>
                    </motion.div>
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 1.3 }}
                      className="bg-gradient-to-b from-scryptex-lightpurple to-scryptex-purple w-1/5 h-full rounded-t-lg shadow-[0_0_15px_rgba(168,85,247,0.3)] relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/10 px-2 py-1 rounded transition-opacity">95%</div>
                      <div className="absolute bottom-0 left-0 w-full text-center text-xs pt-2">Scryptex</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiBenefitsSection;

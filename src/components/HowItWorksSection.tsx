
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animation";

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
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-scryptex-purple/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
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
            HOW IT WORKS
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 0.4)}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Simple Process, Powerful Results
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.6)}
            className="text-gray-400 md:text-lg"
          >
            Get started with Scryptex in just a few simple steps and transform your Web3 research
          </motion.p>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="hidden lg:block absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple/50 to-scryptex-purple/0 transform -translate-y-1/2 z-0"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn('up', index * 0.15 + 0.5)}
                className="relative z-10 group"
                whileHover={{
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
              >
                <motion.div 
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                    borderColor: "rgba(168, 85, 247, 0.5)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full hover:border-scryptex-purple/50 transition-all duration-300"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <motion.span 
                      className="text-5xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                    >
                      {step.number}
                    </motion.span>
                    {index < steps.length - 1 && (
                      <div className="lg:block hidden">
                        <motion.div
                          animate={{
                            x: [0, 5, 0],
                            transition: {
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop"
                            }
                          }}
                        >
                          <ArrowRight className="h-6 w-6 text-scryptex-purple group-hover:translate-x-2 transition-transform" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
                
                <motion.div 
                  className="lg:block hidden absolute top-28 left-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple transform -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

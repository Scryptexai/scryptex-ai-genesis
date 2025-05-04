
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Horizontal scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform for horizontal scrolling simulation
  const horizontalScroll = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

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
    hidden: { y: 30, opacity: 0 },
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

  return (
    <section id="how-it-works" ref={containerRef} className="py-20 bg-gradient-to-b from-transparent via-[#13052b] to-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-scryptex-purple/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-scryptex-purple/20 rounded-full text-scryptex-lightpurple text-sm font-medium mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Process, Powerful Results</h2>
          <p className="text-gray-400 md:text-lg">
            Get started with Scryptex in just a few simple steps and transform your Web3 research
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Desktop Horizontal Slider */}
          <div className="hidden md:block overflow-hidden">
            <div className="hidden md:block absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple/50 to-scryptex-purple/0 transform -translate-y-1/2 z-0" />
            
            <motion.div 
              className="flex gap-8 pl-[40%] pr-[100%]"
              style={{ x: horizontalScroll }}
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative z-10 group min-w-[350px]"
                  variants={itemVariants}
                >
                  <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full hover:border-scryptex-purple/50 transition-all duration-300">
                    <div className="mb-6 flex items-start justify-between">
                      <span className="text-5xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">{step.number}</span>
                      {index < steps.length - 1 && (
                        <div className="block">
                          <ArrowRight className="h-6 w-6 text-scryptex-purple group-hover:translate-x-2 transition-transform" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  
                  <motion.div 
                    className="absolute top-28 left-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple transform -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 10px rgba(168,85,247,0.5)",
                        "0 0 20px rgba(168,85,247,0.8)",
                        "0 0 10px rgba(168,85,247,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Vertical Layout */}
          <div className="md:hidden grid grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 h-full">
                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 rotate-90"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight className="h-6 w-6 text-scryptex-purple" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;

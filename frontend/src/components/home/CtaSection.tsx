
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CtaSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13052b] to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-scryptex-purple/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-8 md:p-12 relative">
              {/* Animated glowing accent */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple to-scryptex-purple/0"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              
              <motion.div 
                className="flex items-center gap-2 mb-6"
                variants={itemVariants}
              >
                <div className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
                </div>
                <span className="text-sm font-medium text-scryptex-lightpurple">START IMMEDIATELY</span>
              </motion.div>
              
              <div className="md:flex items-center justify-between">
                <motion.div 
                  className="md:max-w-xl mb-8 md:mb-0"
                  variants={itemVariants}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Web3 Research Process?</h2>
                  <p className="text-gray-300">
                    Join thousands of researchers who are using AI to gain deeper insights, save time, and make better decisions in the Web3 space.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-all text-white rounded-lg px-8 shadow-[0_0_15px_rgba(168,85,247,0.3)] w-full md:w-auto"
                    >
                      <Link to="/dashboard" className="flex items-center gap-2">
                        Launch App <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Animated particle effects */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 opacity-30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full border border-scryptex-purple/20"></div>
                <div className="absolute inset-4 rounded-full border border-scryptex-purple/30"></div>
                <div className="absolute inset-8 rounded-full border border-scryptex-purple/40"></div>
                <div className="absolute inset-12 rounded-full border border-scryptex-purple/50"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;

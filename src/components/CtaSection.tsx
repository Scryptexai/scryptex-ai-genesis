
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, buttonHover } from "@/lib/animation";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13052b] to-transparent"></div>
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-scryptex-purple/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
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
          className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        >
          <motion.div 
            className="p-8 md:p-12 relative"
            whileHover={{
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)"
            }}
          >
            {/* Glowing accent */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-scryptex-purple/0 via-scryptex-purple to-scryptex-purple/0"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                boxShadow: [
                  '0 0 10px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.7)',
                  '0 0 10px rgba(168, 85, 247, 0.5)'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            
            <motion.div 
              variants={fadeIn('up', 0.3)}
              className="flex items-center gap-2 mb-6"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(168, 85, 247, 0.4)" 
                }}
                className="w-8 h-8 bg-scryptex-purple/30 rounded-lg flex items-center justify-center"
              >
                <ShieldCheck className="w-4 h-4 text-scryptex-lightpurple" />
              </motion.div>
              <span className="text-sm font-medium text-scryptex-lightpurple">START IMMEDIATELY</span>
            </motion.div>
            
            <div className="md:flex items-center justify-between">
              <motion.div 
                variants={fadeIn('right', 0.5)}
                className="md:max-w-xl mb-8 md:mb-0"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Web3 Research Process?</h2>
                <p className="text-gray-300">
                  Join thousands of researchers who are using AI to gain deeper insights, save time, and make better decisions in the Web3 space.
                </p>
              </motion.div>
              
              <motion.div
                variants={fadeIn('left', 0.7)}
                whileHover="hover"
                variants={buttonHover}
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;

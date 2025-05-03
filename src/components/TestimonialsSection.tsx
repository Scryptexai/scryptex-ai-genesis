
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animation";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "DeFi Researcher",
      image: "https://i.pravatar.cc/150?img=11",
      content: "Scryptex's AI has transformed our research process. We're spotting opportunities in DeFi that would have taken weeks to find manually.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Web3 Developer",
      image: "https://i.pravatar.cc/150?img=20",
      content: "The multi-chain analysis tools have saved me countless hours when developing cross-chain applications and monitoring their performance.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Crypto Fund Manager",
      image: "https://i.pravatar.cc/150?img=15",
      content: "Scryptex's risk assessment tools have helped us avoid several problematic projects that looked promising on the surface but had hidden issues.",
      rating: 4
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-scryptex-purple/10 rounded-full blur-3xl"
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
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-scryptex-lightpurple/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
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
            TESTIMONIALS
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 0.4)}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Trusted by Researchers
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.6)}
            className="text-gray-400 md:text-lg"
          >
            Hear what our users have to say about how Scryptex has transformed their Web3 research
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer(0.2, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', index * 0.15 + 0.4)}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                borderColor: "rgba(168, 85, 247, 0.4)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 transition-all hover:border-scryptex-purple/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group"
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                  }}
                  className="w-12 h-12 rounded-full overflow-hidden"
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                <div>
                  <h4 className="text-lg font-medium">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.5 }}
                  >
                    <Star 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-scryptex-lightpurple fill-scryptex-lightpurple' : 'text-gray-500'} group-hover:animate-pulse`}
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '2s'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative element */}
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >
                <div className="w-8 h-8 rounded-full bg-scryptex-purple/20"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useAnimationControls } from "framer-motion";
import { navVariants } from "@/lib/animation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimationControls();
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
      if (offset > 50) {
        controls.start({
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        });
      } else {
        controls.start({
          backgroundColor: "rgba(0, 0, 0, 0)", 
          backdropFilter: "blur(0px)",
          borderBottom: "none",
          boxShadow: "none",
        });
      }
    };

    scrollY.onChange(handleScroll);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY, controls]);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`fixed w-full z-50 transition-all duration-300`}
      style={{ 
        backdropFilter: isScrolled ? "blur(10px)" : "none"
      }}
      animate={controls}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-5">
        <Link to="/" className="flex items-center gap-2">
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Scryptex
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            <motion.a 
              href="#features" 
              className="hover:text-scryptex-lightpurple transition-colors text-sm relative"
              whileHover={{ 
                color: "#a855f7", 
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className="hover:text-scryptex-lightpurple transition-colors text-sm relative"
              whileHover={{ 
                color: "#a855f7", 
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              How It Works
            </motion.a>
            <motion.a 
              href="#benefits" 
              className="hover:text-scryptex-lightpurple transition-colors text-sm relative"
              whileHover={{ 
                color: "#a855f7", 
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              Benefits
            </motion.a>
            <motion.a 
              href="#contact" 
              className="hover:text-scryptex-lightpurple transition-colors text-sm relative"
              whileHover={{ 
                color: "#a855f7", 
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              Contact
            </motion.a>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Link to="/dashboard">Launch App</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto py-6 flex flex-col gap-6">
            <motion.a 
              href="#features" 
              className="py-2 hover:text-scryptex-lightpurple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ x: 5, color: "#a855f7" }}
              transition={{ duration: 0.2 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className="py-2 hover:text-scryptex-lightpurple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ x: 5, color: "#a855f7" }}
              transition={{ duration: 0.2 }}
            >
              How It Works
            </motion.a>
            <motion.a 
              href="#benefits" 
              className="py-2 hover:text-scryptex-lightpurple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ x: 5, color: "#a855f7" }}
              transition={{ duration: 0.2 }}
            >
              Benefits
            </motion.a>
            <motion.a 
              href="#contact" 
              className="py-2 hover:text-scryptex-lightpurple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ x: 5, color: "#a855f7" }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.a>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity"
            >
              <Link to="/dashboard">Launch App</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

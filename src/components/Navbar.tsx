
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Handle scroll direction to show/hide navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    if (currentScrollY < 80) {
      setHidden(false);
      setIsScrolled(false);
      return;
    }
    
    if (currentScrollY > lastScrollY.current + 5) {
      setHidden(true);
    } else if (currentScrollY < lastScrollY.current - 5) {
      setHidden(false);
    }
    
    setIsScrolled(true);
    lastScrollY.current = currentScrollY;
  });

  // Animation variants
  const navVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    },
    hidden: { 
      y: -100,
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const navItemVariants = {
    initial: { y: -8, opacity: 0 },
    animate: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * index,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }),
    hover: {
      y: -2,
      color: "#a855f7",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav
      variants={navVariants}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Scryptex
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navItems.map((item, index) => (
              <motion.a 
                key={index}
                href={item.href} 
                className="text-white hover:text-scryptex-lightpurple transition-colors text-sm"
                custom={index}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={navItemVariants}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="container mx-auto py-6 flex flex-col gap-6"
              initial="initial"
              animate="animate"
              variants={navItemVariants}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="py-2 hover:text-scryptex-lightpurple transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  custom={index}
                  variants={navItemVariants}
                  whileHover="hover"
                >
                  {item.name}
                </motion.a>
              ))}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity"
              >
                <Link to="/dashboard">Launch App</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

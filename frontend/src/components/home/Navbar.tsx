import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, CreditCard } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const { user, isAuthenticated, logout } = useAuth();

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
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "py-3 bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" className="h-10 w-auto" alt="Scryptex Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6">
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
            className="flex items-center gap-3"
          >
            {isAuthenticated && user ? (
              <>
                {/* Credits display */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-purple-900/20 rounded-full">
                  <CreditCard size={14} className="text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">{user.credits} TEX</span>
                </div>
                
                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                      <Avatar>
                        <AvatarFallback className="bg-purple-900 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#1A1F2C] border-purple-900/30 text-white" align="end">
                    <DropdownMenuLabel>
                      <div>
                        <p className="font-medium">Welcome, {user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-900/20" />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <Link to="/dashboard">Launch App</Link>
              </Button>
            )}
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
              className="container mx-auto py-4 px-4 flex flex-col gap-4"
              initial="initial"
              animate="animate"
              variants={navItemVariants}
            >
              {isAuthenticated && user && (
                <div className="flex items-center gap-3 px-2 py-2 bg-purple-900/10 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-900 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.credits} TEX</p>
                  </div>
                </div>
              )}
              
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
              
              {isAuthenticated ? (
                <>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-900/30 text-red-400 hover:text-red-300 hover:bg-red-900/10"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity"
                >
                  <Link to="/dashboard">Launch App</Link>
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
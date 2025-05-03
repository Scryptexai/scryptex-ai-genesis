
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/10 backdrop-blur-lg border-b border-white/10"
          : "py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">
            Scryptex
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <a href="#features" className="hover:text-scryptex-lightpurple transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-scryptex-lightpurple transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-scryptex-lightpurple transition-colors">
              Benefits
            </a>
            <a href="#contact" className="hover:text-scryptex-lightpurple transition-colors">
              Contact
            </a>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity"
          >
            <Link to="/dashboard">Launch App</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            <a href="#features" className="py-2 hover:text-scryptex-lightpurple transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="py-2 hover:text-scryptex-lightpurple transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="py-2 hover:text-scryptex-lightpurple transition-colors">
              Benefits
            </a>
            <a href="#contact" className="py-2 hover:text-scryptex-lightpurple transition-colors">
              Contact
            </a>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-opacity"
            >
              <Link to="/dashboard">Launch App</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

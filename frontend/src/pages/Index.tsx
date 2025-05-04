
import { useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AiBenefitsSection from "@/components/home/AiBenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/Footer";
import SectionLoader from "@/components/home/SectionLoader";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.substring(1);
        const element = document.getElementById(id || "");
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-scryptex-lightpurple to-scryptex-purple z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      <Navbar />
      
      <main>
        <HeroSection />
        
        <SectionLoader />
        <FeaturesSection />
        
        <SectionLoader />
        <HowItWorksSection />
        
        <SectionLoader />
        <AiBenefitsSection />
        
        <SectionLoader />
        <TestimonialsSection />
        
        <SectionLoader />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

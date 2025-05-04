
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import BackgroundAnimation from "@/components/dashboard/BackgroundAnimation";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Simulate page loading delay for animation
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0A2E] text-white relative overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <AnimatePresence mode="wait">
          {isPageLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-[#0D0A2E]"
            >
              <motion.div 
                className="relative h-24 w-24"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500"></div>
                <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-blue-500"></div>
                <div className="absolute inset-4 rounded-full border-b-2 border-l-2 border-indigo-500"></div>
                <div className="absolute inset-6 rounded-full border-b-2 border-r-2 border-violet-500"></div>
              </motion.div>
              <motion.span 
                className="absolute mt-32 text-lg font-light tracking-wider text-purple-300"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                loading
              </motion.span>
            </motion.div>
          ) : (
            <motion.main 
              key="content"
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex-1 transition-all duration-300 p-4 md:p-8 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}
            >
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;

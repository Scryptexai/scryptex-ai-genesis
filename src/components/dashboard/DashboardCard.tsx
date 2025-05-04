
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
  padding?: "none" | "small" | "normal" | "large";
}

const DashboardCard = ({ 
  title, 
  className = "", 
  children, 
  fullWidth = false,
  padding = "normal" 
}: DashboardCardProps) => {
  
  const paddingClasses = {
    none: "p-0",
    small: "p-3",
    normal: "p-5",
    large: "p-6",
  };
  
  return (
    <motion.div
      className={`bg-[#1A1F2C]/80 backdrop-blur-sm rounded-xl border border-purple-900/30 
                ${paddingClasses[padding]} ${fullWidth ? "w-full" : ""} 
                shadow-[0_0_15px_rgba(131,56,236,0.1)] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 0 20px rgba(131, 56, 236, 0.2)" }}
    >
      {title && (
        <h2 className="text-lg font-medium mb-4 text-white/90">{title}</h2>
      )}
      {children}
    </motion.div>
  );
};

export default DashboardCard;

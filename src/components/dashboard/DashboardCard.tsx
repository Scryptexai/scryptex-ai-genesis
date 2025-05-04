
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  glowEffect?: boolean;
  hoverEffect?: boolean;
}

const DashboardCard = ({
  children,
  title,
  className = "",
  glowEffect = false,
  hoverEffect = true
}: DashboardCardProps) => {
  return (
    <motion.div
      className={`relative bg-[#1A1F2C]/80 backdrop-blur-md rounded-xl border border-purple-900/30 p-5 ${className} overflow-hidden`}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Optional glass reflection effect */}
      <div className="absolute -top-[500px] -left-[200px] w-[600px] h-[600px] bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      
      {/* Optional glow effect */}
      {glowEffect && (
        <motion.div 
          className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 z-[-1]"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      )}

      {title && (
        <div className="mb-4 flex items-center">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <div className="ml-3 h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-grow"></div>
        </div>
      )}

      {children}
    </motion.div>
  );
};

export default DashboardCard;

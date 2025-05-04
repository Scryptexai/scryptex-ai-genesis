
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface ActionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  loading?: boolean;
}

const ActionButton = ({
  children,
  icon,
  onClick,
  variant = "primary",
  className = "",
  loading = false,
}: ActionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseClasses = "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white",
    secondary: "bg-purple-900/30 hover:bg-purple-900/50 text-white",
    outline: "bg-transparent border-2 border-purple-500/50 hover:border-purple-500 text-purple-300",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && (
            <motion.div
              animate={{ scale: isHovering ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
          )}
          <span>{children}</span>
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-lg opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              style={{
                background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                backgroundSize: "200% 200%",
              }}
            />
          )}
        </>
      )}
    </motion.button>
  );
};

export default ActionButton;

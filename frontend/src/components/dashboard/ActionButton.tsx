
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "gradient";
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
  type,
  ...props
}: ActionButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const baseClasses = "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg shadow-purple-900/20",
    secondary: "bg-purple-900/30 hover:bg-purple-900/50 text-white shadow-md shadow-purple-900/10",
    outline: "bg-transparent border-2 border-purple-500/50 hover:border-purple-500 text-purple-300",
    gradient: "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-900/30",
  };

  // Filter out props that cause conflicts between HTML button and Framer Motion
  const {
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...htmlProps
  } = props;

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)" }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      type={type}
      {...htmlProps}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          <span className="ml-2">Loading...</span>
        </div>
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
          <span className="relative z-10">{children}</span>
          
          {/* Glow effect on hover */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              style={{
                background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                backgroundSize: "200% 200%",
              }}
            />
          )}
          
          {/* Subtle animated border for gradient variant */}
          {variant === "gradient" && (
            <motion.div 
              className="absolute inset-0 rounded-lg -z-10"
              initial={{ opacity: 0.2 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: isHovering ? [1, 1.02, 1] : 1
              }}
              transition={{ 
                repeat: Infinity, 
                duration: isHovering ? 1.5 : 3,
                ease: "easeInOut"
              }}
              style={{
                background: "linear-gradient(45deg, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.4) 50%, rgba(59, 130, 246, 0.4) 100%)",
                filter: "blur(8px)"
              }}
            />
          )}
        </>
      )}
    </motion.button>
  );
};

export default ActionButton;

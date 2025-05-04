import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Gift } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "signup";
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  referralCode: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const AuthModal = ({ isOpen, onClose, defaultView = "login" }: AuthModalProps) => {
  const [view, setView] = useState<"login" | "signup" | "success">(defaultView);
  const { toast } = useToast();
  const { login, signup } = useAuth();
  
  // Generated referral code for display after signup
  const [generatedReferralCode, setGeneratedReferralCode] = useState("");
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      referralCode: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      const newReferralCode = await signup(
        data.name, 
        data.email, 
        data.password, 
        data.referralCode || undefined
      );
      
      setGeneratedReferralCode(newReferralCode);
      setView("success");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleCloseSuccess = () => {
    toast({
      title: "Account created successfully!",
      description: "Welcome to Scryptex AI Platform!",
    });
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.5 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border border-purple-900/30 bg-[#1A1F2C] text-white">
        <motion.div 
          className="relative p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors"
          >
            <X size={18} />
          </button>
          
          {/* Modal Header */}
          <div className="mb-6 text-center">
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 mx-auto mb-4 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xl font-bold">S</span>
            </motion.div>
            <h2 className="text-xl font-bold">
              {view === "login" ? "Welcome Back" : view === "signup" ? "Create Account" : "Success!"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {view === "login" 
                ? "Log in to access your Scryptex dashboard" 
                : view === "signup" 
                ? "Join the Scryptex AI community today" 
                : "Your account has been created"}
            </p>
          </div>
          
          {/* Login Form */}
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div
                key="login-form"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
              >
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                placeholder="your@email.com" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity py-5"
                      disabled={loginForm.formState.isSubmitting}
                    >
                      {loginForm.formState.isSubmitting ? "Logging in..." : "Log In"}
                    </Button>
                    
                    <div className="text-center mt-4 text-sm text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setView("signup")}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
            
            {/* Signup Form */}
            {view === "signup" && (
              <motion.div
                key="signup-form"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
              >
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                placeholder="Your Name" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                placeholder="your@email.com" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="referralCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Referral Code (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Gift size={16} className="absolute left-3 top-3 text-gray-400" />
                              <Input 
                                placeholder="Enter code (optional)" 
                                className="pl-10 bg-[#242938] border-purple-900/30 text-white" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity py-5"
                      disabled={signupForm.formState.isSubmitting}
                    >
                      {signupForm.formState.isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                    
                    <div className="text-center mt-4 text-sm text-gray-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
            
            {/* Success view after signup */}
            {view === "success" && (
              <motion.div
                key="success-view"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <h3 className="text-lg font-medium mb-4">Account Created Successfully!</h3>
                
                <div className="bg-[#242938] p-3 rounded-lg mb-6">
                  <div className="text-xs text-gray-400 mb-1">Your Referral Code</div>
                  <div className="text-lg font-mono font-bold text-purple-400">{generatedReferralCode}</div>
                </div>
                
                <p className="text-sm text-gray-400 mb-6">
                  Share this code with friends and earn TEX tokens when they sign up!
                </p>
                
                <Button 
                  onClick={handleCloseSuccess}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

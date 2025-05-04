
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define types for our context
export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  referralCode: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, referralCode?: string) => Promise<string>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => "",
  logout: () => {},
});

// Mock user data for prototype
const mockUser = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  credits: 500,
  referralCode: "SCRX5678"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('scryptex_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('scryptex_user');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // Simulating API call
    try {
      // For prototype, just check if password is not empty
      if (!password) throw new Error('Password required');

      // Set user state with mock data
      setUser(mockUser);
      localStorage.setItem('scryptex_user', JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: "Welcome back to Scryptex AI Platform!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string, referralCode?: string) => {
    // Simulating API call
    try {
      // For prototype, just check if fields are not empty
      if (!name || !email || !password) throw new Error('All fields are required');

      // Generate a random referral code
      const newReferralCode = `SCRX${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Create new user with mock data
      const newUser = {
        ...mockUser,
        name,
        email,
        referralCode: newReferralCode,
      };
      
      setUser(newUser);
      localStorage.setItem('scryptex_user', JSON.stringify(newUser));
      
      return newReferralCode;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('scryptex_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

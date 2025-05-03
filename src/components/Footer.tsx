
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-black/50 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple text-transparent bg-clip-text">
                Scryptex
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              AI-powered research platform for Web3, empowering on-chain analysis and automation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-scryptex-purple/20 hover:bg-scryptex-purple/30 transition-colors hover:scale-110 transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-scryptex-purple/20 hover:bg-scryptex-purple/30 transition-colors hover:scale-110 transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-scryptex-purple/20 hover:bg-scryptex-purple/30 transition-colors hover:scale-110 transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">API</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-scryptex-lightpurple transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates about Scryptex features and releases</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="border-white/10 bg-black/20 backdrop-blur-md flex-1" 
              />
              <Button className="bg-gradient-to-r from-scryptex-purple to-scryptex-lightpurple hover:opacity-90 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-500 text-xs mt-2">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Scryptex. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 text-sm hover:text-scryptex-lightpurple transition-colors">Terms</a>
            <a href="#" className="text-gray-400 text-sm hover:text-scryptex-lightpurple transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-scryptex-lightpurple transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

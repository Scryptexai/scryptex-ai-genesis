import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SuccessStateProps {
  referralCode: string;
  onClose: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ referralCode, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const referralLink = `https://scryptex.ai/ref/${referralCode}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">Welcome to Scryptex! 🎉</h3>
        <p className="text-gray-400">You're officially on the waitlist!</p>
      </div>

      <div className="bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-lg p-6 mb-6">
        <h4 className="font-semibold mb-2">Your Rewards:</h4>
        <ul className="text-left text-sm space-y-2 mb-4">
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✓</span>
            50,000 TEX tokens secured
          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✓</span>
            Priority access to all features
          </li>
          <li className="flex items-center">
            <span className="text-green-400 mr-2">✓</span>
            VIP Discord channel access
          </li>
        </ul>

        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-2">Share & earn 10,000 TEX per referral:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-800/50 px-3 py-2 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-400 text-black rounded font-medium hover:bg-green-500 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => window.open('https://discord.gg/scryptex', '_blank')}
          className="w-full py-3 bg-[#5865F2] text-white rounded-lg font-medium hover:bg-[#4752C4] transition-colors"
        >
          Join Discord Community
        </button>
        
        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessState;
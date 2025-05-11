import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  referral_code?: string;
}

interface CreditInfo {
  base: number;
  referral_bonus: number;
  referral_credits: number;
  total: number;
  remaining_potential: number;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    referral_code: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [credits, setCredits] = useState<CreditInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });
  const [copySuccess, setCopySuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setFormData(prev => ({ ...prev, referral_code: refCode }));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/waitlist/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setReferralCode(data.referral_code);
        setReferralLink(data.referral_link);
        setCredits(data.credits);
      } else {
        setError(data.detail || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = `Join me on Scryptex! Start with 500 TEX credits and earn up to 2,500 total. Get early access to AI-powered airdrop analysis:`;
    const url = encodeURIComponent(referralLink);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Be Among The First Hunters
                  </h2>
                  <p className="text-gray-400">
                    Limited early access spots available
                  </p>
                </div>

                {/* Benefits with Credit Focus */}
                <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-3">What you'll get:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      500 TEX credits to start ($5 value)
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      Up to 2,500 TEX with referrals ($25 value)
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      Priority access to all features
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      Exclusive Discord community
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      Early bird badge
                    </li>
                  </ul>
                </div>

                {/* Timer */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 mb-6">
                  <p className="text-center text-sm text-gray-300 mb-2">Limited time offer:</p>
                  <div className="flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-400">Hours</div>
                    </div>
                    <div className="text-3xl font-bold text-white">:</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-400">Minutes</div>
                    </div>
                    <div className="text-3xl font-bold text-white">:</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
                      <div className="text-xs text-gray-400">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Show referral info if using a referral code */}
                {formData.referral_code && (
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mb-4">
                    <p className="text-sm text-purple-300">
                      Using referral code: <span className="font-bold">{formData.referral_code}</span>
                      <br />
                      <span className="text-xs">You'll receive +100 bonus TEX credits!</span>
                    </p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="referral_code"
                      placeholder="Referral code (optional)"
                      value={formData.referral_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist Now'}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Already joined? <a href="#" className="text-purple-400 hover:underline">Check your status</a>
                </p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Welcome to Scryptex!
                </h3>
                <p className="text-gray-300 mb-6">
                  You're on the waitlist! Check your email for confirmation.
                </p>
                
                {/* Credits Info */}
                {credits && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Your Credits</h4>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-gray-300">
                        <span>Base credits:</span>
                        <span className="font-semibold">{credits.base} TEX</span>
                      </div>
                      {credits.referral_bonus > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Referral bonus:</span>
                          <span className="font-semibold">+{credits.referral_bonus} TEX</span>
                        </div>
                      )}
                      <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold">
                        <span>Current total:</span>
                        <span>{credits.total} TEX</span>
                      </div>
                    </div>
                    
                    {credits.remaining_potential > 0 && (
                      <p className="text-sm text-purple-400 mt-3">
                        Earn up to {credits.remaining_potential} more TEX by referring friends!
                      </p>
                    )}
                  </div>
                )}
                
                {/* Referral Section */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-2">Your referral link:</p>
                  <div className="bg-gray-900 rounded p-2 mb-3 break-all">
                    <p className="text-sm text-blue-400">{referralLink}</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Earn 200 TEX for each friend who joins! (Max 2,500 TEX total)
                  </p>
                  
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={copyReferralLink}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors text-sm"
                    >
                      {copySuccess ? '✓ Copied!' : 'Copy Link'}
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors text-sm"
                    >
                      Share on Twitter
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ email: '', referral_code: '' });
                    onClose();
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
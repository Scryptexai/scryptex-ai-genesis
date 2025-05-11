import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import SuccessState from './SuccessState';

interface WaitlistFormProps {
  onClose: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    countryCode: '+62',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const countryCodes = [
    { code: '+62', country: 'ID' },
    { code: '+1', country: 'US' },
    { code: '+65', country: 'SG' },
    { code: '+60', country: 'MY' },
    { code: '+63', country: 'PH' },
    { code: '+91', country: 'IN' },
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Replace with actual API call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setReferralCode(data.referralCode);
        setIsSuccess(true);
      } else {
        setErrors({ submit: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  if (isSuccess) {
    return <SuccessState referralCode={referralCode} onClose={onClose} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          🚀 Lock Your Spot NOW!
        </h2>
        <p className="text-gray-400">
          First 1,000 get <span className="text-green-400 font-semibold">50,000 TEX tokens</span> + lifetime premium features
        </p>
      </div>

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Value Props */}
      <div className="bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Early Bird Benefits:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 50,000 TEX tokens (~$500 value)</li>
              <li>• Priority access to all features</li>
              <li>• Exclusive Discord VIP channel</li>
              <li>• 30% lifetime discount</li>
            </ul>
          </div>
          <div className="text-4xl">🎁</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all ${
              errors.username ? 'border-red-400' : 'border-gray-700'
            }`}
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all ${
              errors.email ? 'border-red-400' : 'border-gray-700'
            }`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              {countryCodes.map(({code, country}) => (
                <option key={code} value={code}>
                  {country} {code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="812345678"
              className={`flex-1 px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-400' : 'border-gray-700'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        {errors.submit && (
          <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Secure My Spot! 🔥'
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          By joining, you agree to our Terms & Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default WaitlistForm;
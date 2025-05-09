// HeroSection.tsx
import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import MetricCards from './MetricCards';
import TokenIcons from './TokenIcons';
import HeroContent from './HeroContent';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Background Animation */}
      <AnimatedBackground />
      
      {/* Main Hero Container */}
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-24 pb-12">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 text-white mb-12 lg:mb-0">
            <HeroContent />
            <MetricCards />
          </div>
          
          {/* Right side dashboard mockup */}
          <div className="w-full lg:w-2/3 flex justify-center items-center">
            <img src="/media/banners.png" alt="Hero Banner" className="h-auto max-w-full" />
          </div>
          
          {/* Floating token icons */}
          <TokenIcons />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
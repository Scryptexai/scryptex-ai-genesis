// components/Header.tsx
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <h3 className="ml-3 text-white font-medium">{title}</h3>
        </div>
        <div className="flex items-center">
          <div className="text-xs text-gray-400 bg-gray-700 rounded-full px-3 py-1 mr-3">
            AI Mode: Active
          </div>
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">WX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
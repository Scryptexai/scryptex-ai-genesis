import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: '📊',
      description: 'Overview & Stats'
    },
    {
      path: '/admin/users',
      name: 'User List',
      icon: '👥',
      description: 'Waitlist & Credits'
    },
    {
      path: '/admin/analytics',
      name: 'Analytics',
      icon: '📈',
      description: 'Growth & Metrics'
    },
    {
      path: '/admin/referrals',
      name: 'Referral Network',
      icon: '🔗',
      description: 'Referral Tracking'
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: '⚙️',
      description: 'Configuration'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 280 : 80 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-gray-800 border-r border-gray-700 overflow-hidden"
      >
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-white font-bold">Scryptex Admin</h1>
                <p className="text-xs text-gray-400">Management Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 transition-all ${
                isActive(item.path)
                  ? 'bg-purple-900/50 text-purple-400 border-r-2 border-purple-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-2xl w-8 flex-shrink-0">{item.icon}</span>
              {isSidebarOpen && (
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {isSidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div>
                <p className="text-sm text-white font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@scryptex.ai</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
            </h2>
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">⚡</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
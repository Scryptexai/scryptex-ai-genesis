// frontend/src/pages/admin/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditStats from '../../components/admin/CreditStats';
import UserList from '../../components/admin/UserList';
import { adminService } from '../../services/admin.service';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'credits'>('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Scryptex Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'credits'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Credits
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
                  <p className="text-3xl font-bold mt-2">{stats?.totalUsers || 0}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    +{stats?.newUsersToday || 0} today
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-gray-400 text-sm font-medium">Total Credits</h3>
                  <p className="text-3xl font-bold mt-2">
                    {stats?.totalCredits?.toLocaleString() || 0}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    ${(stats?.totalCredits * 0.01)?.toFixed(2) || '0.00'} value
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-gray-400 text-sm font-medium">Referral Rate</h3>
                  <p className="text-3xl font-bold mt-2">
                    {stats?.referralRate?.toFixed(1) || 0}%
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {stats?.totalReferrals || 0} referrals
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-gray-400 text-sm font-medium">Avg Credits/User</h3>
                  <p className="text-3xl font-bold mt-2">
                    {Math.round(stats?.avgCreditsPerUser || 0)}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Max: {stats?.maxCredits || 0}
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'users' && <UserList />}
            {activeTab === 'credits' && <CreditStats />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
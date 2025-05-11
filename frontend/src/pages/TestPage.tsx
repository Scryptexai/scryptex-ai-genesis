// frontend/src/pages/TestPage.tsx
import React, { useState } from 'react';
import WaitlistModal from '../components/auth/WaitlistModal';
import { waitlistService } from '../services/waitlist.service';

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<string>('Not tested');
  const [stats, setStats] = useState<any>(null);

  const testAPIConnection = async () => {
    console.log('🧪 Testing API connection...');
    try {
      const response = await waitlistService.testConnection();
      setApiStatus('Connected ✅');
      console.log('✅ API Response:', response);
    } catch (error) {
      setApiStatus('Failed ❌');
      console.error('❌ API Error:', error);
    }
  };

  const fetchStats = async () => {
    console.log('📊 Fetching stats...');
    try {
      const response = await waitlistService.getStats();
      setStats(response);
      console.log('✅ Stats:', response);
    } catch (error) {
      console.error('❌ Stats Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>
        
        <div className="space-y-6">
          {/* API Connection Test */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">1. API Connection Test</h2>
            <button
              onClick={testAPIConnection}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mb-4"
            >
              Test API Connection
            </button>
            <p>Status: <span className="font-mono">{apiStatus}</span></p>
            <p className="text-sm text-gray-400 mt-2">
              API URL: {import.meta.env.VITE_API_URL || 'Not set'}
            </p>
          </div>

          {/* Waitlist Modal Test */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">2. Waitlist Modal Test</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              Open Waitlist Modal
            </button>
          </div>

          {/* Stats Test */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">3. Stats Test</h2>
            <button
              onClick={fetchStats}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mb-4"
            >
              Fetch Stats
            </button>
            {stats && (
              <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                {JSON.stringify(stats, null, 2)}
              </pre>
            )}
          </div>

          {/* Console Instructions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">4. Debug Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Open browser console (F12)</li>
              <li>Test API connection first</li>
              <li>Try opening modal and submitting form</li>
              <li>Check console for detailed logs</li>
              <li>Check Network tab for API calls</li>
            </ol>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TestPage;
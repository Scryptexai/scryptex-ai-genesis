// frontend/src/services/admin.service.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getAdminHeaders = () => {
  const adminToken = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'X-Admin-Key': adminToken || ''
  };
};

export const adminService = {
  async getDashboardStats() {
    const adminKey = localStorage.getItem('adminToken');
    const [creditStats, waitlistStats] = await Promise.all([
      axios.get(`${API_URL}/admin/credit-stats?admin_key=${adminKey}`),
      axios.get(`${API_URL}/waitlist/stats`)
    ]);
    
    return {
      totalUsers: waitlistStats.data.total,
      totalCredits: creditStats.data.total_credits,
      avgCreditsPerUser: creditStats.data.avg_credits,
      maxCredits: creditStats.data.max_credits,
      referralRate: waitlistStats.data.conversion_rate,
      totalReferrals: waitlistStats.data.referred,
      potentialLiability: creditStats.data.potential_liability,
      usersAtMax: creditStats.data.users_at_max
    };
  },
  
  async getUsers(page = 1, limit = 20) {
    // This would need to be implemented in backend
    const response = await axios.get(`${API_URL}/admin/users`, {
      params: { page, limit },
      headers: getAdminHeaders()
    });
    return response.data;
  },
  
  async getCreditDetails() {
    const adminKey = localStorage.getItem('adminToken');
    const response = await axios.get(`${API_URL}/admin/credit-stats?admin_key=${adminKey}`);
    return response.data;
  }
};
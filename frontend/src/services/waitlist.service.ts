// frontend/src/services/waitlist.service.ts
import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export interface WaitlistData {
  username: string;
  email: string;
  country_code: string;
  phone: string;
  referral_code?: string;
}

export interface WaitlistResponse {
  message: string;
  referral_code: string;
  position: number;
}

export const waitlistService = {
  async join(data: WaitlistData): Promise<WaitlistResponse> {
    console.log('📝 Joining waitlist with data:', data);
    console.log('🔗 API Base URL:', api.defaults.baseURL);
    
    try {
      const response = await api.post<WaitlistResponse>('/waitlist/', data);
      console.log('✅ Successfully joined waitlist:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to join waitlist:', error);
      
      // Extract error message
      let errorMessage = 'Failed to join waitlist';
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('❌ Error message:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  async getStats() {
    console.log('📊 Fetching waitlist stats...');
    try {
      const response = await api.get('/waitlist/stats');
      console.log('✅ Stats received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch stats:', error);
      throw error;
    }
  },

  async testConnection() {
    console.log('🔌 Testing API connection...');
    console.log('🔗 Base URL:', api.defaults.baseURL);
    try {
      const response = await api.get('/');
      console.log('✅ API Connection successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ API Connection failed:', error);
      throw error;
    }
  }
};
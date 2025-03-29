import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Media Outlet APIs
  async getAllMediaOutlets() {
    try {
      const response = await api.get('/media-outlets');
      return response.data;
    } catch (error) {
      console.error('Error fetching media outlets:', error);
      throw new Error('Failed to fetch media outlets');
    }
  },

  async getMediaOutletById(id) {
    try {
      const response = await api.get(`/media-outlets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching media outlet:', error);
      throw new Error('Failed to fetch media outlet');
    }
  },

  async searchMediaOutlets(query) {
    try {
      const response = await api.get('/media-outlets/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching media outlets:', error);
      throw new Error('Failed to search media outlets');
    }
  },

  // Metrics APIs
  async getMetrics(timeRange = '24h') {
    try {
      const [overallMetrics, categoryMetrics, topPerformers] = await Promise.all([
        api.get('/metrics/overall'),
        api.get('/metrics/by-category'),
        api.get('/metrics/top-performers')
      ]);

      console.log('API Raw Response:', {
        overall: overallMetrics.data,
        category: categoryMetrics.data,
        top: topPerformers.data
      });

      // Ensure we have valid data for current metrics
      const currentMetrics = overallMetrics.data || {
        totalFollowers: 0,
        avgEngagement: 0,
        totalReach: 0,
        totalOutlets: 0
      };

      // Process category metrics
      const historicalData = Array.isArray(categoryMetrics.data) 
        ? categoryMetrics.data.map(item => ({
            category: item.category || 'Unknown',
            totalFollowers: item.totalFollowers || 0,
            avgEngagement: item.avgEngagement || 0,
            totalReach: item.totalReach || 0,
            count: item.count || 0
          }))
        : [];

      return {
        current: currentMetrics,
        historical: historicalData,
        topPerformers: Array.isArray(topPerformers.data) ? topPerformers.data : []
      };
    } catch (error) {
      console.error('Error fetching metrics:', error);
      // Return default data structure on error
      return {
        current: {
          totalFollowers: 0,
          avgEngagement: 0,
          totalReach: 0,
          totalOutlets: 0
        },
        historical: [],
        topPerformers: []
      };
    }
  },

  async getMediaOutletMetrics(id, timeRange = '24h') {
    try {
      const response = await api.get(`/media-outlets/${id}/metrics`, {
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching media outlet metrics:', error);
      throw new Error('Failed to fetch media outlet metrics');
    }
  },

  // Category APIs
  async getAllCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  },

  async getCategoryById(id) {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
    }
  },

  // Contact Form API
  async submitContactForm(formData) {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }
  }
}; 
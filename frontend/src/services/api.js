import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

const api = {
  // Get all media outlets
  getMediaOutlets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/media`);
      return response.data;
    } catch (error) {
      console.error('Error fetching media outlets:', error);
      throw error;
    }
  },

  // Search media outlets
  searchMedia: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/media/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching media:', error);
      throw error;
    }
  },

  // Get media outlet by ID
  getMediaOutlet: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/media/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching media outlet:', error);
      throw error;
    }
  }
};

export default api; 
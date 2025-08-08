import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
  deleteAccount: (password) => api.delete('/auth/account', { data: { password } }),
};

export const personalityAPI = {
  analyze: (data) => api.post('/personality/analyze', data),
  getProfile: () => api.get('/personality/profile'),
  updateProfile: (data) => api.put('/personality/update', data),
  getQuestions: (params) => api.get('/personality/questions', { params }),
  getInsights: () => api.get('/personality/insights'),
  refreshProfile: () => api.post('/personality/refresh'),
  getCompletion: () => api.get('/personality/completion'),
};

export const integrationsAPI = {
  // Spotify
  connectSpotify: (data) => api.post('/integrations/spotify/connect', data),
  disconnectSpotify: () => api.post('/integrations/spotify/disconnect'),
  syncSpotify: () => api.post('/integrations/spotify/sync'),
  
  // YouTube
  connectYouTube: (data) => api.post('/integrations/youtube/connect', data),
  disconnectYouTube: () => api.post('/integrations/youtube/disconnect'),
  syncYouTube: () => api.post('/integrations/youtube/sync'),
  
  // LinkedIn
  connectLinkedIn: (data) => api.post('/integrations/linkedin/connect', data),
  disconnectLinkedIn: () => api.post('/integrations/linkedin/disconnect'),
  syncLinkedIn: () => api.post('/integrations/linkedin/sync'),
  
  // Meta
  connectMeta: (data) => api.post('/integrations/meta/connect', data),
  disconnectMeta: () => api.post('/integrations/meta/disconnect'),
  syncMeta: () => api.post('/integrations/meta/sync'),
  
  // General
  getStatus: () => api.get('/integrations/status'),
  getData: () => api.get('/integrations/data'),
  syncAll: () => api.post('/integrations/sync-all'),
};

export const matchingAPI = {
  getSuggestions: (params) => api.get('/matching/suggestions', { params }),
  sendConnectionRequest: (data) => api.post('/matching/connect', data),
  handleConnectionRequest: (connectionId, action) => 
    api.put(`/matching/connect/${connectionId}`, { action }),
  getConnections: (params) => api.get('/matching/connections', { params }),
  getPendingRequests: (params) => api.get('/matching/requests', { params }),
  removeConnection: (connectionId) => api.delete(`/matching/connect/${connectionId}`),
  getCompatibility: (userId) => api.get(`/matching/compatibility/${userId}`),
  updatePreferences: (preferences) => api.put('/matching/preferences', preferences),
  getPreferences: () => api.get('/matching/preferences'),
  refreshSuggestions: () => api.post('/matching/refresh'),
  getAnalytics: () => api.get('/matching/analytics'),
};

// Utility functions
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

// Error handling utilities
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.error?.message || 'Bad request';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Access denied. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 422:
        return data.error?.message || 'Validation error';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.error?.message || 'An error occurred';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

// Request utilities
export const createRequest = (config) => {
  return api(config);
};

export const getRequest = (url, config = {}) => {
  return api.get(url, config);
};

export const postRequest = (url, data, config = {}) => {
  return api.post(url, data, config);
};

export const putRequest = (url, data, config = {}) => {
  return api.put(url, data, config);
};

export const deleteRequest = (url, config = {}) => {
  return api.delete(url, config);
};

export default api; 
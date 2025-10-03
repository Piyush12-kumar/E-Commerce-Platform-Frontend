import axios from 'axios';

const axiosInstance = axios.create({
  // Base URL for API requests; proxy forwards '/api/*' to backend
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
// Request interceptor: attach auth header
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip auth header for login and register endpoints
    const url = config.url || '';
    if (url === '/users/login' || url === '/users/register') {
      return config;
    }
    // Attach auth token for protected routes
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: log and handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API error response:', error.response?.status, error.response?.data, error.message);
    console.error('Full error object:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
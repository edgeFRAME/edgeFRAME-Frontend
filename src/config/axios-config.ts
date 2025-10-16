import axios from 'axios';

// En desarrollo usa el proxy de Vite, en producción usa la URL directa
const baseURL = import.meta.env.DEV 
  ? '/api/v1'  // Proxy de Vite en desarrollo
  : import.meta.env.VITE_BACKEND_URL + '/api/v1';  // URL directa en producción

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', `${config.baseURL || ''}${config.url || ''}`);
    console.log('📦 Request config:', config);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
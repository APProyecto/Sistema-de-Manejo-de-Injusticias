import axios from 'axios';

// URLs de módulos backend
const API_MODULE1 = import.meta.env.VITE_API_MODULE1 || 'http://localhost:3001';
const API_MODULE2 = import.meta.env.VITE_API_MODULE2 || 'http://localhost:3002';
const API_MODULE3 = import.meta.env.VITE_API_MODULE3 || 'http://localhost:3003';
const API_MODULE4 = import.meta.env.VITE_API_MODULE4 || 'http://localhost:3004';

// Cliente para cada módulo
export const authApi = axios.create({ baseURL: API_MODULE1 });
export const boycottApi = axios.create({ baseURL: API_MODULE2 });
export const commentApi = axios.create({ baseURL: API_MODULE3 });
export const statsApi = axios.create({ baseURL: API_MODULE4 });

// Interceptor para agregar token automáticamente
const authInterceptor = (config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authApi.interceptors.request.use(authInterceptor);
boycottApi.interceptors.request.use(authInterceptor);
commentApi.interceptors.request.use(authInterceptor);
statsApi.interceptors.request.use(authInterceptor);
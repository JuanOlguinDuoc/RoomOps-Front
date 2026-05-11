import axios from 'axios';
import { clearUserSession, hasValidToken } from './localStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

const storedToken = localStorage.getItem('token');
if (storedToken && hasValidToken(storedToken)) {
  setAuthToken(storedToken);
} else if (storedToken) {
  setAuthToken(null);
  clearUserSession();
}


api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        setAuthToken(null);
        clearUserSession();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
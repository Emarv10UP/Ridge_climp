import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor — normalizes errors so callers get a clean message
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Something went wrong. Please try again.';
    const details = error.response?.data?.details;
    return Promise.reject({ message, details, status: error.response?.status });
  }
);

export const expeditionsApi = {
  getAll: (difficulty) => api.get('/expeditions', { params: difficulty ? { difficulty } : {} }),
  getFeatured: () => api.get('/expeditions/featured'),
  getBySlug: (slug) => api.get(`/expeditions/${slug}`),
};

export const bookingsApi = {
  create: (payload) => api.post('/bookings', payload),
  getById: (id) => api.get(`/bookings/${id}`),
};

export const inquiriesApi = {
  create: (payload) => api.post('/inquiries', payload),
};

export default api;

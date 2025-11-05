import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const requestAPI = {
  create: (data) => api.post('/requests/create', data),
  getAll: () => api.get('/requests'),
  getById: (id) => api.get(`/requests/${id}`),
  join: (id) => api.post(`/requests/${id}/join`),
  leave: (id) => api.delete(`/requests/${id}/leave`),
  complete: (id) => api.post(`/requests/${id}/complete`),
};

export const userAPI = {
  getHistory: (id) => api.get(`/users/${id}/history`),
};

export default api;
import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL ? `${API_URL}/api` : '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('flux_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('flux_token');
      localStorage.removeItem('flux_user');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const servicesApi = {
  getAll: (params?: Record<string, string>) => api.get('/services', { params }),
  getBySlug: (slug: string) => api.get(`/services/${slug}`),
  create: (data: Record<string, unknown>) => api.post('/services', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
};

export const projectsApi = {
  getAll: (params?: Record<string, string>) => api.get('/projects', { params }),
  getBySlug: (slug: string) => api.get(`/projects/${slug}`),
  create: (data: Record<string, unknown>) => api.post('/projects', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export const industriesApi = {
  getAll: () => api.get('/industries'),
  getBySlug: (slug: string) => api.get(`/industries/${slug}`),
};

export const blogsApi = {
  getAll: (params?: Record<string, string>) => api.get('/blogs', { params }),
  getAllAdmin: () => api.get('/blogs/admin/all'),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  getCategories: () => api.get('/blogs/categories'),
  create: (data: Record<string, unknown>) => api.post('/blogs', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/blogs/${id}`, data),
  delete: (id: number) => api.delete(`/blogs/${id}`),
};

export const caseStudiesApi = {
  getAll: (params?: Record<string, string>) => api.get('/case-studies', { params }),
  getBySlug: (slug: string) => api.get(`/case-studies/${slug}`),
  create: (data: Record<string, unknown>) => api.post('/case-studies', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/case-studies/${id}`, data),
  delete: (id: number) => api.delete(`/case-studies/${id}`),
};

export const certificationsApi = {
  getAll: () => api.get('/certifications'),
  create: (data: Record<string, unknown>) => api.post('/certifications', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/certifications/${id}`, data),
  delete: (id: number) => api.delete(`/certifications/${id}`),
};

export const facilitiesApi = {
  getAll: () => api.get('/facilities'),
  getBySlug: (slug: string) => api.get(`/facilities/${slug}`),
  create: (data: Record<string, unknown>) => api.post('/facilities', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/facilities/${id}`, data),
  delete: (id: number) => api.delete(`/facilities/${id}`),
};

export const careersApi = {
  getAll: () => api.get('/careers'),
  getBySlug: (slug: string) => api.get(`/careers/${slug}`),
  apply: (id: number, data: FormData) => api.post(`/careers/${id}/apply`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  create: (data: Record<string, unknown>) => api.post('/careers', data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/careers/${id}`, data),
  delete: (id: number) => api.delete(`/careers/${id}`),
};

export const leadsApi = {
  create: (data: Record<string, unknown>) => api.post('/leads', data),
  createInquiry: (data: Record<string, unknown>) => api.post('/leads/inquiry', data),
  getAll: (params?: Record<string, string>) => api.get('/leads', { params }),
  update: (id: number, data: Record<string, unknown>) => api.put(`/leads/${id}`, data),
  exportExcel: () => api.get('/leads/export', { responseType: 'blob' }),
};

export const settingsApi = {
  getPublic: () => api.get('/settings/public'),
  getDashboard: () => api.get('/settings/dashboard'),
  getAll: () => api.get('/settings'),
  update: (data: Record<string, string>) => api.put('/settings', data),
};

export const siteContentApi = {
  getPublic: () => api.get('/site-content'),
  getAdmin: () => api.get('/site-content/admin'),
  update: (data: object) => api.put('/site-content', data),
};

export const mediaApi = {
  getAll: (params?: Record<string, string>) => api.get('/media', { params }),
  upload: (formData: FormData, folder?: string) =>
    api.post(`/media/upload${folder ? `?folder=${encodeURIComponent(folder)}` : ''}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: number) => api.delete(`/media/${id}`),
};

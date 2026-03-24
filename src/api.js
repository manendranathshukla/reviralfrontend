import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
});

export const fetchServices = (params = {}) => api.get('/services/', { params });
export const fetchTestimonials = () => api.get('/testimonials/');
export const fetchTeam = () => api.get('/team/');
export const fetchPartners = () => api.get('/partners/');
export const fetchBlogPosts = () => api.get('/blog/');
export const fetchBlogPost = (slug) => api.get(`/blog/${slug}/`);
export const fetchWorkProcess = () => api.get('/work-process/');
export const fetchSiteStats = () => api.get('/stats/');
export const fetchPricing = (category) => api.get('/pricing/', { params: { category } });
export const fetchPortfolio = () => api.get('/portfolio/');
export const fetchCareers = () => api.get('/careers/');
export const submitContact = (data) => api.post('/contact/', data);

export default api;

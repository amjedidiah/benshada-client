import api from '../apis/api.js';

export const fetchStores = () => api.get('/shops/');

export const fetchProducts = () => api.get('/products/');

export const fetchOrder = () => api.get('/orders');

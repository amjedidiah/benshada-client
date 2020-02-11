import api from "../apis/api";

export const fetchStores = () => api.get(`/shops/`);

export const fetchProducts = () => api.get(`/products/`);

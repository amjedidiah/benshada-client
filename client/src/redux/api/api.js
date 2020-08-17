// axiosconfig.js
import axios from 'axios';
import store from '../store.js';

// configure base url
const api = axios.create({
  // baseURL: 'https://www.api.benshada.com/v1',
  baseURL: 'http://localhost:8000/v1',
  timeout: 60000
});

// intercept requests and add authorization token
api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

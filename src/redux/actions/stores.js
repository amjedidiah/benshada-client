import api from '../../api/api.js';
import { STORES_ONE } from './types/storeTypes.js';

export const shopsAll = () => api.get('/shops/');


export const shopsOne = (id) => ({
  type: STORES_ONE,
  payload: api.get(`/shops/${id}`)
});

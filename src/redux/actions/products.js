import api from '../../api/api.js';
import { PRODUCTS_ONE } from './types/productTypes.js';

export const productsAll = () => api.get('/products/');


export const productsOne = (id) => ({
  type: PRODUCTS_ONE,
  payload: api.get(`/products/${id}`)
});

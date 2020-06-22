import api from '../../api/api.js';
import {
  STORES_ONE, STORES_ONE_SELECTED, STORES_ALL, STORE_UPDATE, STORE_DELETE
} from './types/storeTypes.js';

export const shopsAll = () => ({ type: STORES_ALL, payload: api.get('/shops/') });

export const shopsOne = (id) => ({
  type: STORES_ONE,
  payload: api.get(`/shops/${id}`)
});

export const shopsOneSelected = (payload) => ({
  type: STORES_ONE_SELECTED,
  payload
});

export const shopUpdate = (id, shopData) => (dispatch) => {
  const response = dispatch({
    type: STORE_UPDATE,
    payload: api.put(`/shops/${id}`, shopData)
  });

  return response.then(() => dispatch(shopsOne(id)));
};

export const shopDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: STORE_DELETE,
    payload: api.delete(`/shops/${id}`)
  });

  return response.then(() => dispatch(shopsAll()));
};

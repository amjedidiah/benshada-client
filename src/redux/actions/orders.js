/* eslint-disable no-underscore-dangle */
import api from '../api/api.js';
import {
  ORDERS_ONE,
  ORDERS_ONE_SELECTED,
  ORDERS_ALL,
  ORDER_UPDATE,
  ORDER_DELETE,
  ORDER_ADD
} from './types/orderTypes.js';
import { userUpdate } from './users.js';
import { productUpdate } from './products.js';

export const ordersAll = () => ({ type: ORDERS_ALL, payload: api.get('/orders/') });

export const ordersOne = (id) => ({
  type: ORDERS_ONE,
  payload: api.get(`/orders/${id}`)
});

export const ordersOneSelected = (payload) => ({
  type: ORDERS_ONE_SELECTED,
  payload
});

export const orderUpdate = (id, orderData) => (dispatch) => {
  const response = dispatch({
    type: ORDER_UPDATE,
    payload: api.put(`/orders/${id}`, orderData)
  });

  return response.then(() => dispatch([ordersOne(id), ordersAll()]));
};

export const orderAdd = (data) => (dispatch, getState) => {
  const { products } = data;
  const productsIDs = products.map(({ _id }) => _id);

  const response = dispatch({
    type: ORDER_ADD,
    payload: api.post('/orders', { ...data, products: productsIDs })
  });

  const { email } = getState().user.selected;
  const reduxProducts = getState().product.all;
  const productsToUpdate = reduxProducts.filter(({ _id }) => productsIDs.include(_id));

  const updatedProducts = productsToUpdate.map((product) => {
    for (let i = 0; i < productsIDs.length; i += 1) {
      if (product._id === productsIDs[i]) {
        return { ...product, quantity: product.quantity - 1 };
      }
    }
    return product;
  });

  return response
    .then(
      (res) => dispatch([
        ordersOne(res.value.data.data._id),
        ordersAll(),
        userUpdate(email, { cart: [] })
      ])
    )
    .then(
      () => updatedProducts
        .forEach(
          ({ _id, quantity }) => dispatch(productUpdate(_id, { quantity }))
        )
    );
};

export const orderDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: ORDER_DELETE,
    payload: api.delete(`/orders/${id}`)
  });

  return response.then(() => dispatch(ordersAll()));
};

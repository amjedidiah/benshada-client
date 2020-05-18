import { CART_ADD, CART_REMOVE, CART_UPDATE } from './types.js';

export const cartAdd = (product, cartQty) => ({
  type: CART_ADD,
  payload: { ...product, cartQty }
});

export const cartRemove = (product) => ({
  type: CART_REMOVE,
  payload: product
});

export const cartUpdate = (product, cartQty) => (dispatch, getState) => {
  const { cart } = getState();
  // eslint-disable-next-line no-underscore-dangle
  const index = cart.map(({ _id }, i) => (_id === product._id ? i : '')).filter((item) => item !== '')[0];

  cart[index] = { ...product, cartQty };

  dispatch({
    type: CART_UPDATE,
    payload: cart
  });
};

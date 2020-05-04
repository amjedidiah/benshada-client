import { CART_ADD, CART_REMOVE, CART_UPDATE } from "./types";

export const cartAdd = (product, cartQty) => ({
  type: CART_ADD,
  payload: { ...product, cartQty }
});

export const cartRemove = product => ({
  type: CART_REMOVE,
  payload: product
});

export const cartUpdate = (product, cartQty) => (dispatch, getState) => {
  let { cart } = getState(),
    index = cart
      .map(({ _id }, i) => (_id === product._id ? i : ""))
      .filter(item => item !== "")[0];

  cart[index] = { ...product, cartQty };

  dispatch({
    type: CART_UPDATE,
    payload: cart
  });
};

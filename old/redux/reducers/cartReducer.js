import {
  LOGOUT, CART_ADD, CART_REMOVE, CART_CLEAR, CART_UPDATE
} from '../actions/types.js';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return INITIAL_STATE;
    case CART_ADD:
      return [...state, action.payload];
    case CART_REMOVE:
      // eslint-disable-next-line no-underscore-dangle
      return [...state].filter(({ _id }) => _id !== action.payload._id);
    case CART_UPDATE:
      return action.payload;
    case CART_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};

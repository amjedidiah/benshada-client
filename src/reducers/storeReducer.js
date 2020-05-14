import { STORE_FETCH, LOGOUT, STORE_PRODUCT_FETCH } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_FETCH:
      return action.payload;
    case STORE_PRODUCT_FETCH:
      return { ...state, products: action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

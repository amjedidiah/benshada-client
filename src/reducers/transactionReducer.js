import { LOGOUT, TRANSACTIONS_FETCH } from '../actions/types.js';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTIONS_FETCH:
      return action.payload;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

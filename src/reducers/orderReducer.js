import { LOGOUT, USER_ORDERS_FETCH } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ORDERS_FETCH:
      return action.payload;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

import {
  LOGIN,
  REGISTER,
  LOGOUT,
  USER_FETCH,
  ROLE_SELECT
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  email: null,
  token: null,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload[0],
        token: action.payload[1],
        isSignedIn: true
      };
    case LOGOUT:
      return INITIAL_STATE;
    case REGISTER:
      return {
        ...state,
        email: action.payload[0],
        token: action.payload[1],
        isSignedIn: true
      };
    case ROLE_SELECT:
      return {
        ...state,
        user: action.payload
      };
    case USER_FETCH:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

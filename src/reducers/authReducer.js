import { LOGIN, REGISTER, LOGOUT, ROLE, USER_UPDATE } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload.data, isSignedIn: true };
    case LOGOUT:
      return INITIAL_STATE;
    case REGISTER:
      return { ...state, user: action.payload.data, isSignedIn: true };
      case USER_UPDATE:
        return { ...state, user: action.payload };
    case ROLE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

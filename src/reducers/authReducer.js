import { LOGIN, REGISTER } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return state;
    case REGISTER:
      return state;
    default:
      return state;
  }
};

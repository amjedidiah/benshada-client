import { GOOGLE_SIGN_IN, GOOGLE_SIGN_OUT, SIGN_IN } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  password: null,
  email: null,
  name: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        email: action.payload.email,
        name: action.payload.name
      };
    case GOOGLE_SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case SIGN_IN:
      return state;
    default:
      return state;
  }
};

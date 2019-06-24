import {
  GOOGLE_OAUTH,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_OUT,
  SIGN_IN
} from "../actions/types";

const INITIAL_STATE = {
  oAuth: null,
  isSignedIn: false,
  userId: null,
  password: null,
  email: null,
  name: "",
  loggedOut: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_OAUTH:
      return { ...state, oAuth: action.payload, loggedOut: false };
    case GOOGLE_SIGN_IN:
      state.oAuth.isSignedIn.Ab = true;
      return {
        ...state,
        isSignedIn: null,
        userId: action.payload.userId,
        email: action.payload.email,
        name: action.payload.name
      };
    case GOOGLE_SIGN_OUT:
      state.oAuth.isSignedIn.Ab = false;
      return {
        ...state,
        loggedOut: true
      };
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    default:
      return state;
  }
};

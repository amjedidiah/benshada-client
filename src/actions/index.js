import history from "../history";

import { GOOGLE_SIGN_IN, GOOGLE_SIGN_OUT, SIGN_IN } from "./types";

export const googleSignIn = (userId, email, name) => {
  return {
    type: GOOGLE_SIGN_IN,
    payload: { userId, email, name }
  };
};

export const googleSignOut = () => {
  return {
    type: GOOGLE_SIGN_OUT
  };
};

export const signIn = () => async (dispatch, getState) => {
  dispatch({
    type: SIGN_IN
  });

  history.push(`/user/account`);
};

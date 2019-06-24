import history from "../history";

import {
  GOOGLE_OAUTH,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_OUT,
  SIGN_IN
} from "./types";

export const onAuthChange = isSignedIn => async (dispatch, getState) => {
  const { oAuth } = getState().auth;

  if (isSignedIn) {
    await dispatch(
      googleSignIn(
        oAuth.currentUser.get().getId(),
        oAuth.currentUser.get().w3.U3,
        oAuth.currentUser.get().w3.ig
      )
    );
    console.log("googlesignin onload");
  } else {
    await dispatch(googleSignOut());

    console.log("googlesignout onload");
  }
};

export const googleOAuth = () => (dispatch, getState) => {
  if (!navigator.onLine) {
    return;
  } else {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: `671903564161-tcactt088s0u6ph0694egi81e53ibd3c.apps.googleusercontent.com`,
          scope: "email"
        })
        .then(() => {
          dispatch({
            type: GOOGLE_OAUTH,
            payload: window.gapi.auth2.getAuthInstance()
          });
        })
        .then(() => {
          const { oAuth } = getState().auth;
          dispatch(onAuthChange(oAuth.isSignedIn.get()));
        });
    });
  }
};

export const googleSignIn = (userId, email, name) => {
  return {
    type: GOOGLE_SIGN_IN,
    payload: { userId, email, name }
  };
};

export const googleSignOut = () => (dispatch, getState) => {
  const pathName = history.location.pathname;
  dispatch({
    type: GOOGLE_SIGN_OUT
  });

  history.push(pathName);
};

export const signIn = () => (dispatch, getState) => {
  dispatch({
    type: SIGN_IN
  });

  history.push(`/user/account`);
};

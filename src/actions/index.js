import history from "../history";

import { LOGIN, REGISTER } from "./types";

export const login = formValues => async (dispatch, getState) => {
  console.log(formValues);
  dispatch({
    type: LOGIN
  });
};

export const register = formValues => async (dispatch, getState) => {
  console.log(formValues);
  dispatch({
    type: REGISTER
  });
};

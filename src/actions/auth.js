import api from "../apis/api";
// import axios from "axios";
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ROLE_SELECT,
  ACTION_LOAD_AVOIDED
} from "./types";

import { actionLoad, actionNotify, errorReport, timeOut } from "./load";
import history from "../history";
import { userFetch, storeCreate } from "./user";

export const ifSeller = type => (type === "a" || type === "b" ? true : false);

export const login = formValues => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  const res = api.post(`/users/login`, formValues, timeOut);

  return res
    .then(res =>
      dispatch([
        {
          type: LOGIN,
          payload: [res.data.data.email, res.data.data.token]
        },
        actionNotify(res.data.message)
      ])
    )
    .then(() => dispatch(userFetch()))
    .catch(error => dispatch(errorReport(error)));
};

export const logout = () => async dispatch => {
  try {
    await dispatch([
      actionLoad(),
      {
        type: LOGOUT
      },
      actionNotify("Logout successful")
    ]);

    history.push("/");
  } catch (error) {
    dispatch([actionNotify("Error with logout")]);
  }
};

export const register = formValues => async (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  try {
    await api.post(`/users/login`, formValues, timeOut);

    dispatch(actionNotify("A user already exists with this email."));
  } catch (error) {
    if (error.response && error.response.status === 404) {
      let { email, password } = formValues;

      const req = api.post(`/users/signup`, formValues, timeOut);

      return req
        .then(res =>
          dispatch([
            {
              type: REGISTER
            },
            actionNotify(res.data.message)
          ])
        )
        .then(() => dispatch(login({ email, password })))
        .catch(error => dispatch(errorReport(error)));
    } else {
      dispatch(errorReport(error));
    }
  }
};

export const roleSelect = type => (dispatch, getState) => {
  let { token, email } = getState().auth;

  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  const res = api.put(
    `/users/${email}`,
    { isDeleted: false, type },
    {
      headers: { Authorization: "Bearer " + token },
      timeout: 30000
    }
  );

  return res
    .then(res =>
      dispatch([
        {
          type: ROLE_SELECT
        },
        actionNotify(res.data.message)
      ])
    )
    .then(() =>
      dispatch([userFetch(), setTimeout(() => dispatch(storeCreate()), 3000)])
    )
    .catch(error => dispatch(errorReport(error)));
};

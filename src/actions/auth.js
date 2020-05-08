import api from "../apis/api";
// import axios from "axios";
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ROLE_SELECT,
  ACTION_LOAD_AVOIDED,
} from "./types";

import {
  actionLoad,
  actionNotify,
  errorReport,
  timeOut,
  enqueueDynamicArray,
} from "./load";
import history from "../history";
import { userFetch, storeCreate } from "./user";

export const ifSeller = (type) => (type === "a" || type === "b" ? true : false);

export const login = (formValues) => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  const req = api.post(`/users/login`, formValues, timeOut);

  return req
    .then((res) =>
      dispatch([
        {
          type: LOGIN,
          payload: [res.data.data.email, res.data.data.token],
        },
        actionNotify(res.data.message),
      ])
    )
    .then(() => dispatch(userFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const logout = () => (dispatch) =>
  enqueueDynamicArray([
    dispatch(actionLoad()),
    dispatch({
      type: LOGOUT,
    }),
    dispatch(actionNotify("Logout successful")),
    history.push("/"),
  ]);

export const register = (formValues) => async (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  const loginReq = api.post(`/users/login`, formValues, timeOut);

  return loginReq
    .then(() =>
      dispatch(actionNotify("A user already exists with this email."))
    )
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        let { email, password } = formValues;

        const req = api.post(`/users/signup`, formValues, timeOut);

        console.log(formValues);

        return req
          .then((res) => {
            console.log(res, "me");

            dispatch([
              {
                type: REGISTER,
              },
              actionNotify(res.data.message),
            ]);
          })
          .then(() => dispatch(login({ email, password })))
          .catch((error, a, b) => dispatch(errorReport(error)));
      } else {
        dispatch(errorReport(error));
      }
    });
};

export const roleSelect = (type) => (dispatch, getState) => {
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
      timeout: 30000,
    }
  );

  return res
    .then((res) =>
      dispatch([
        {
          type: ROLE_SELECT,
        },
        actionNotify(res.data.message),
      ])
    )
    .then(() => dispatch(userFetch()))
    .then(() => setTimeout(() => dispatch(storeCreate()), 3000))
    .catch((error) => dispatch(errorReport(error)));
};

import api from "../apis/api";
// import axios from "axios";
import { LOGIN, REGISTER, LOGOUT, ROLE_SELECT } from "./types";

import { actionLoad, actionNotify } from "./load";
import history from "../history";
import { userFetch, storeCreate } from "./user";

export const ifSeller = type => (type === "a" || type === "b" ? true : false);

export const login = formValues => async (dispatch, getState) => {
  try {
    await dispatch(actionLoad());
    const res = await api.post(`/users/login`, formValues);

    dispatch([
      {
        type: LOGIN,
        payload: [res.data.data.email, res.data.data.token]
      },
      actionNotify(res.data.message),
      userFetch()
    ]);
  } catch (error) {
    dispatch(
      actionNotify(
        error.response.data.message && error.response.data.message.name
      )
    );
  }
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
  api
    .post(`/users/login`, formValues)
    .then(res =>
      dispatch(actionNotify("A user already exists with this email."))
    )
    .catch(async error => {
      if (error.response.status !== 500) {
        try {
          await dispatch(actionLoad());

          const res = await api.post(`/users/signup`, formValues);
          dispatch([
            {
              type: REGISTER,
              payload: [res.data.data.email, res.data.data.token]
            },
            actionNotify(res.data.message),
            userFetch()
          ]);
        } catch (error) {
          dispatch(
            actionNotify(
              error.response.data.message && error.response.data.message.name
            )
          );
        }
      } else {
        dispatch(
          actionNotify(
            error.response.data.message && error.response.data.message.name
          )
        );
      }
    });
};

// export const register = formValues => dispatch =>
//   api
//     .post(`/users/signup`, formValues)
//     .then(res =>
//       dispatch({
//         type: REGISTER,
//         payload: res.data
//       })
//     )
//     .catch(error => error.response.data.message && error.response.data.message.name || error.response.data.message && error.response.data.message.name);

export const roleSelect = type => async (dispatch, getState) => {
  let { token, email, user } = getState().auth;

  try {
    const res = await api.put(
      `/users/${email}`,
      { isDeleted: false, type },
      {
        headers: { Authorization: "Bearer " + token }
      }
    );

    await dispatch([
      actionLoad(),
      {
        type: ROLE_SELECT,
        payload: { ...user, type }
      },
      actionNotify(res.data.message),
      storeCreate()
    ]);

    history.push("/user");
  } catch (error) {
    dispatch(
      actionNotify(
        error.response.data.message && error.response.data.message.name
      )
    );
  }
};

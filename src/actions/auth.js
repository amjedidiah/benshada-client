import api from "../apis/api";
import axios from "axios";
import { LOGIN, REGISTER, LOGOUT, ROLE } from "./types";

import { actionLoad, actionNotify } from "./load";
import history from "../history";

export const login = formValues => async dispatch => {
  try {
    await dispatch(actionLoad());
    const res = await api.post(`/users/login`, formValues);

    dispatch([
      {
        type: LOGIN,
        payload: res.data
      },
      actionNotify(res.data.message)
    ]);
  } catch (error) {
    dispatch(actionNotify(error.response.data.message || error.message));
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

export const register = formValues => async dispatch => {
  try {
    await dispatch(actionLoad());
    const res = await api.post(`/users/signup`, formValues);

    dispatch([
      {
        type: REGISTER,
        payload: res.data
      },
      actionNotify(res.data.message)
    ]);
  } catch (error) {
    dispatch(actionNotify(error.response.data.message || error.message));
  }
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
//     .catch(error => error.response.data.message || error.message);

export const selectRole = type => async (dispatch, getState) => {
  let { user } = getState().auth;

  const updateType = (user, type) =>
    api.put(
      `/users/${user.email}`,
      { isDeleted: false, type },
      {
        headers: { Authorization: "Bearer " + user.token }
      }
    );

  const createStore = (user, type) => {
    return type !== "c"
      ? api.post(
          `/shops`,
          {
            name: `${user.name}'s Store`,
            description: `This is a store by ${user.name}`,
            user: user._id
          },
          {
            headers: { Authorization: "Bearer " + user.token }
          }
        )
      : "";
  };
  
  axios
    .all([updateType(user, type), createStore(user, type)])
    .then(
      axios.spread((acct, storeRes) => {
        user.type = type;

        user.store = type !== "c" ? storeRes.data.data : undefined;

        dispatch({
          type: ROLE,
          payload: user
        });
      })
    )
    .catch(error => error.response.data.message || error.message);
};

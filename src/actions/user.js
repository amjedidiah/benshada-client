import api from "../apis/api";
import {
  USER_UPDATE_PROFILE,
  USER_FETCH,
  USER_ORDERS_FETCH,
  STORE_FETCH,
  STORE_UPDATE_INFO,
  USER_STORE_SET,
  STORE_CREATE,
  PRODUCT_UPLOAD,
  STORE_FETCH_FAILED,
  STORE_UPDATE_BANK
} from "./types";
import { actionLoad, actionNotify } from "./load";
import { ifSeller } from "./auth";

// PROFILE Actions
export const userFetch = () => async (dispatch, getState) => {
  let { email, token } = getState().auth;

  api
    .get(`/users/${email}`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(
      async res =>
        await dispatch([
          {
            type: USER_FETCH,
            payload: res.data.data
          },
          userOrdersFetch(),
          storeFetch(),
          actionNotify(res.data.message)
        ])
    )
    .catch(error =>
      dispatch(
        actionNotify(
          error.response.data.message && error.response.data.message.name
        )
      )
    );
};

export const userUpdateProfile = formValues => async (dispatch, getState) => {
  let { user, token } = getState().auth;

  try {
    await dispatch(actionLoad());
    const res = await api.put(`/users/${user.email}`, formValues, {
      headers: { Authorization: "Bearer " + token }
    });

    dispatch([
      { type: USER_UPDATE_PROFILE },
      storeUpdateInfo({
        name: `${user.name}'s Store`,
        description: `This is ${user.name}'s Store`
      }),
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

export const userShopsUpdate = shopId => async (dispatch, getState) => {
  let { token, email } = getState().auth;

  try {
    const res = await api.put(
      `/users/${email}`,
      { isDeleted: false, shops: [shopId] },
      {
        headers: { Authorization: "Bearer " + token }
      }
    );

    await dispatch([
      actionLoad(),
      {
        type: USER_STORE_SET
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

export const userOrdersFetch = () => async (dispatch, getState) => {
  let { user } = getState().auth;

  api
    .get(`/orders`)
    .then(async res => {
      let payload;
      res.data.data.forEach(order =>
        order.user._id === user._id ? payload.push(order) : ""
      );

      await dispatch([
        {
          type: USER_ORDERS_FETCH,
          payload
        },
        actionNotify(res.data.message)
      ]);
    })
    .catch(error =>
      dispatch(
        actionNotify(
          error.response.data.message && error.response.data.message.name
        )
      )
    );
};

// STORE Actions
export const storeCreate = () => async (dispatch, getState) => {
  let { user, token } = getState().auth;

  if (ifSeller(user.type)) {
    api
      .post(
        `/shops`,
        {
          name: `${user.name}'s Store`,
          description: `This is a store by ${user.name}`,
          user: user._id
        },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res =>
        dispatch([
          {
            type: STORE_CREATE
          },
          actionNotify(res.data.message),
          userShopsUpdate(res.data.data._id)
        ])
      )
      .catch(error =>
        dispatch(
          actionNotify(
            error.response.data.message && error.response.data.message.name
          )
        )
      );
  }
};

export const storeFetch = () => async (dispatch, getState) => {
  let { user } = getState().auth,
    id = user.shops && user.shops[0],
    type = user && user.type;

  if (ifSeller(type) && id !== undefined) {
    try {
      const res = await api.get(`/shops/${id}`);

      dispatch([
        {
          type: STORE_FETCH,
          payload: res.data.data
        },
        actionNotify(res.data.message)
      ]);
    } catch (error) {
      dispatch(
        actionNotify(
          error.response.data.message && error.response.data.message.name
        )
      );
    }
  } else {
    await dispatch({ type: STORE_FETCH_FAILED });
  }
};

export const storeUpdateInfo = formValues => async (dispatch, getState) => {
  let { token, user } = getState().auth;

  if (ifSeller(user.type)) {
    let store = getState().store;

    try {
      await dispatch(actionLoad());
      const res = await api.put(`/shops/${store._id}`, formValues, {
        headers: { Authorization: "Bearer " + token }
      });

      dispatch([
        {
          type: STORE_UPDATE_INFO
        },
        actionNotify(res.data.message),
        storeFetch()
      ]);
    } catch (error) {
      dispatch(
        actionNotify(
          error.response.data.message && error.response.data.message.name
        )
      );
    }
  }
};

export const storeUpdateBank = formValues => async (dispatch, getState) => {
  let { token, user } = getState().auth,
    bank = { ...formValues };

  if (ifSeller(user.type)) {
    let store = getState().store;

    try {
      await dispatch(actionLoad());
      const res = await api.put(`/shops/${store._id}`, bank, {
        headers: { Authorization: "Bearer " + token }
      });

      dispatch([
        {
          type: STORE_UPDATE_BANK
        },
        actionNotify(res.data.message),
        storeFetch()
      ]);
    } catch (error) {
      dispatch(
        actionNotify(
          error.response.data.message && error.response.data.message.name
        )
      );
    }
  }
};

// PRODUCT Actions
export const productUpload = formValues => async (dispatch, getState) => {
  await dispatch(actionLoad());

  let { user, token } = getState().auth,
    price = (country => {
      switch (country) {
        case "Nigeria":
          return formValues.price * 0.0028;
        case "Ghana":
          return formValues.price * 0.18;
        default:
          return formValues.price;
      }
    })(user.country),
    product = { ...formValues, price, shop: user.store._id };

  try {
    const res = await api.post(`/products`, product, {
      headers: { Authorization: "Bearer " + token }
    });

    dispatch([
      { type: PRODUCT_UPLOAD },
      actionNotify(res.data.message),
      storeFetch()
    ]);
  } catch (error) {
    dispatch(
      actionNotify(
        error.response.data.message && error.response.data.message.name
      )
    );
  }
};

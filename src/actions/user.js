import history from "../history";
import api from "../apis/api";
import {
  USER_UPDATE_PROFILE,
  USER_FETCH,
  ORDERS_FETCH,
  ORDER_CANCEL,
  STORE_FETCH,
  STORE_UPDATE_INFO,
  USER_STORE_SET,
  STORE_CREATE,
  PRODUCT_UPLOAD,
  STORE_FETCH_FAILED,
  STORE_UPDATE_BANK,
  TRANSACTIONS_FETCH,
  PRODUCT_DELETE,
  PRODUCT_UPDATE,
  ACTION_LOAD_AVOIDED,
  STORE_PRODUCT_FETCH
} from "./types";
import {
  actionLoad,
  actionNotify,
  errorReport,
  timeOut,
  actionDone,
  filterContent
} from "./load";
import { ifSeller } from "./auth";

// PROFILE Actions
// export const userResetPass = formValues => async (dispatch, getState) => {
//   let { user, token } = getState().auth;

//   try {
//     await dispatch(actionLoad());
//     const res = await api.put(`/users/${user.email}`, formValues, {
//       headers: { Authorization: "Bearer " + token },
//       timeOut
//     });

//     dispatch([
//       { type: USER_UPDATE_PROFILE },
//       actionNotify(res.data.message),
//       userFetch()
//     ]);
//   } catch (error) {
//     dispatch(errorReport(error));
//   }
// };

export const userFetch = () => (dispatch, getState) => {
  let { email, token } = getState().auth;

  api
    .get(`/users/${email}`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res =>
      dispatch([
        {
          type: USER_FETCH,
          payload: res.data.data
        },
        actionNotify(res.data.message)
      ])
    )
    .then(() => dispatch(ordersFetch()))
    .then(() => dispatch(storeFetch()))
    .catch(error => dispatch(errorReport(error)));
};

export const userUpdateProfile = formValues => async (dispatch, getState) => {
  let { user, token } = getState().auth;

  try {
    await dispatch(actionLoad());
    const res = await api.put(`/users/${user.email}`, formValues, {
      headers: { Authorization: "Bearer " + token },
      timeOut
    });

    dispatch([
      { type: USER_UPDATE_PROFILE },
      actionNotify(res.data.message),
      userFetch()
    ]);
  } catch (error) {
    dispatch(errorReport(error));
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
      },
      timeOut
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
    dispatch(errorReport(error));
  }
};

export const ordersFetch = () => (dispatch, getState) => {
  let { user } = getState().auth;

  api
    .get(`/orders`)
    .then(res => {
      let payload = [];
      res.data.data.forEach(order =>
        order.user._id === user._id ? payload.push(order) : ""
      );

      dispatch([
        {
          type: ORDERS_FETCH,
          payload
        },
        actionNotify(res.data.message)
      ]);
    })
    .catch(error => dispatch(errorReport(error)));
};

export const orderCancel = id => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  let { token } = getState().auth;

  const req = api.delete(`/orders/${id}`, {
    headers: { Authorization: "Bearer " + token },
    timeout: 30000
  });

  return req
    .then(res =>
      dispatch([{ type: ORDER_CANCEL }, actionNotify(res.data.message)])
    )
    .then(() => dispatch(ordersFetch()))
    .catch(error => dispatch(errorReport(error)));
};

export const transactionsFetch = () => async (dispatch, getState) => {
  let { user } = getState().auth;

  api
    .get(`/transactions`)
    .then(async res => {
      let payload = [];
      res.data.data.forEach(transaction =>
        transaction.user._id === user._id ? payload.push(transaction) : ""
      );

      await dispatch([
        {
          type: TRANSACTIONS_FETCH,
          payload
        },
        actionNotify(res.data.message)
      ]);
    })
    .catch(error => dispatch(errorReport(error)));
};

// STORE Actions
export const storeCreate = () => (dispatch, getState) => {
  let { user, token } = getState().auth;

  if (ifSeller(user.type)) {
    const res = api.post(
      `/shops`,
      {
        name: `${user.name}'s Store`,
        description: `This is a store by ${user.name}`,
        user: user._id
      },
      {
        headers: { Authorization: "Bearer " + token },
        timeout: 30000
      }
    );

    return res
      .then(res =>
        dispatch([
          {
            type: STORE_CREATE
          },
          actionNotify(res.data.message),
          userShopsUpdate(res.data.data._id)
        ])
      )
      .catch(error => dispatch(errorReport(error)));
  }
};

export const featuredStoreFetch = num => dispatch => {
  const req = api.get(`/shops/`, timeOut);

  return req
    .then(res => dispatch(res.data.data.slice(0, num)))
    .catch(error => dispatch(errorReport(error)));
};

export const storeFetch = () => async (dispatch, getState) => {
  let { user } = getState().auth,
    id = user.shops && user.shops[0],
    type = user && user.type;

  if (ifSeller(type) && id !== undefined) {
    const req = api.get(`/shops/${id}`, timeOut);

    return req
      .then(res => res.data.data)
      .then(store => {
        dispatch({
          type: STORE_FETCH,
          payload: store
        });

        return store.products.map(({ _id }, i) =>
          api.get(`/products/${_id}`).then(product => product.data.data)
        );
      })
      .then(promises =>
        Promise.all(promises).then(data =>
          dispatch([
            {
              type: STORE_PRODUCT_FETCH,
              payload: data
            },
            actionNotify("Products updated successfully")
          ])
        )
      )
      .then(() =>
        setTimeout(() => history.push(history.location.pathname), 2000)
      )
      .then(() => dispatch(actionDone()))
      .catch(error => dispatch(errorReport(error)));
  } else {
    await dispatch({ type: STORE_FETCH_FAILED });
  }
};

// export const storeFetch = () => async (dispatch, getState) => {
//   let { user } = getState().auth,
//     id = user.shops && user.shops[0],
//     type = user && user.type;

//   if (ifSeller(type) && id !== undefined) {
//     try {
//       const res = await api.get(`/shops/${id}`, timeOut),
//         store = res.data.data,
//         { products } = store;

//       await products.forEach(async ({ _id }, i) => {
//         const productRes = await api.get(`/products/${_id}`);

//         products[i] = await productRes.data.data;

//         console.log("mean");
//       });

//       console.log("her");

//       await dispatch([
//         {
//           type: STORE_FETCH,
//           payload: { ...store, products }
//         },
//         actionNotify(res.data.message)
//       ]);
//     } catch (error) {
//       dispatch(errorReport(error));
//     }
//   } else {
//     await dispatch({ type: STORE_FETCH_FAILED });
//   }
// };

export const storeUpdateInfo = formValues => (dispatch, getState) => {
  let { token, user } = getState().auth;

  if (ifSeller(user.type)) {
    dispatch(
      getState().load.loading === false
        ? actionLoad()
        : { type: ACTION_LOAD_AVOIDED }
    );

    let store = getState().store;

    const req = api.put(`/shops/${store._id}`, formValues, {
      headers: { Authorization: "Bearer " + token },
      timeout: 30000
    });

    return req
      .then(res =>
        dispatch([
          {
            type: STORE_UPDATE_INFO
          },
          actionNotify(res.data.message)
        ])
      )
      .then(() => dispatch(storeFetch()))
      .catch(error => dispatch(errorReport(error)));
  }
};

// export const storeUpdateInfo = formValues => async (dispatch, getState) => {
//   let { token, user } = getState().auth;

//   if (ifSeller(user.type)) {
//     let store = getState().store;

//     try {
//       await dispatch(actionLoad());
//       const res = await api.put(
//         `/shops/${store._id}`,
//         formValues,
//         {
//           headers: { Authorization: "Bearer " + token }
//         },
//         timeOut
//       );

//       dispatch([
//         {
//           type: STORE_UPDATE_INFO
//         },
//         actionNotify(res.data.message),
//         storeFetch()
//       ]);
//     } catch (error) {
//       dispatch(errorReport(error));
//     }
//   }
// };

export const storeUpdateBank = formValues => async (dispatch, getState) => {
  let { token, user } = getState().auth,
    bank = { ...formValues };

  if (ifSeller(user.type)) {
    let store = getState().store;

    try {
      await dispatch(actionLoad());
      const res = await api.put(
        `/shops/${store._id}`,
        bank,
        {
          headers: { Authorization: "Bearer " + token }
        },
        timeOut
      );

      dispatch([
        {
          type: STORE_UPDATE_BANK
        },
        actionNotify(res.data.message),
        storeFetch()
      ]);
    } catch (error) {
      dispatch(errorReport(error));
    }
  }
};

// PRODUCT Actions
// export const productUpload = formValues => async (dispatch, getState) => {
//   await dispatch(actionLoad());

//   let { user, token } = getState().auth,
//     product = { ...formValues, shop: user.shops[0] };

//   try {
//     const res = await api.post(
//       `/products`,
//       product,
//       {
//         headers: { Authorization: "Bearer " + token }
//       },
//       timeOut
//     );

//     dispatch([
//       { type: PRODUCT_UPLOAD },
//       actionNotify(res.data.message),
//       storeFetch()
//     ]);
//   } catch (error) {
//     dispatch(errorReport(error));
//   }
// };

export const productUpload = formValues => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  let { user, token } = getState().auth,
    product = { ...formValues, shop: user.shops[0] };

  const req = api.post(`/products`, product, {
    headers: { Authorization: "Bearer " + token },
    timeout: 30000
  });

  return req
    .then(res =>
      dispatch([{ type: PRODUCT_UPLOAD }, actionNotify(res.data.message)])
    )
    .then(() => dispatch(storeFetch()))
    .catch(error => dispatch(errorReport(error)));
};

export const productDelete = id => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  let { token } = getState().auth;

  const req = api.delete(`/products/${id}`, {
    headers: { Authorization: "Bearer " + token },
    timeout: 30000
  });

  return req
    .then(res =>
      dispatch([{ type: PRODUCT_DELETE }, actionNotify(res.data.message)])
    )
    .then(() => dispatch(storeFetch()))
    .catch(error => dispatch(errorReport(error)));
};

export const productUpdate = formValues => (dispatch, getState) => {
  dispatch(
    getState().load.loading === false
      ? actionLoad()
      : { type: ACTION_LOAD_AVOIDED }
  );

  let { token } = getState().auth;

  const req = api.put(`/products/${formValues._id}`, formValues, {
    headers: { Authorization: "Bearer " + token },
    timeout: 30000
  });

  return req
    .then(res =>
      dispatch([{ type: PRODUCT_UPDATE }, actionNotify(res.data.message)])
    )
    .then(() => dispatch(storeFetch()))
    .catch(error => dispatch(errorReport(error)));
};

// export const productDelete = id => async (dispatch, getState) => {

//   let { token } = getState().auth;

//   dispatch(actionLoad());

//   try {
//     await api.delete(
//       `/products/${id}`,
//       {
//         headers: { Authorization: "Bearer " + token }
//       },
//       timeOut
//     );

//     await dispatch([{ type: PRODUCT_DELETE }, storeFetch()]);

//     history.push("/user");
//   } catch (error) {
//     dispatch(errorReport(error));
//   }
// };

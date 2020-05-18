/* eslint-disable no-underscore-dangle */
import history from '../history.js';
import api from '../apis/api.js';
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
  STORE_PRODUCT_FETCH,
  CART_CLEAR
} from './types.js';
import {
  actionLoad, actionNotify, errorReport, timeOut, actionDone
} from './load.js';
// eslint-disable-next-line import/no-cycle
import { ifSeller } from './auth.js';

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


export const ordersFetch = () => (dispatch, getState) => {
  const { auth, store } = getState();
  const { user } = auth;
  const { products } = store;

  api
    .get('/orders')
    .then((res) => {
      const productIDs = products.map(({ _id }) => _id);
      const payload = ifSeller(user.type)
        ? res.data.data
          .map((order) => order.products.map((product) => ({ ...product, order })))
          .reduce((a, item) => a.concat(item), [])
          .map(({ _id, order }) => (productIDs.indexOf(_id) !== -1 ? order : ''))
          .filter((item) => item !== '')
        : res.data.data.filter((order) => order.user._id === user._id);

      dispatch([
        {
          type: ORDERS_FETCH,
          payload
        },
        actionNotify(res.data.message)
      ]);
    })
    .catch((error) => dispatch(errorReport(error)));
};


export const storeFetch = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const id = user.shops && user.shops[0];
  const type = user && user.type;

  if (ifSeller(type) && id !== undefined) {
    const req = api.get(`/shops/${id}`, timeOut);

    return req
      .then((res) => res.data.data)
      .then((store) => {
        dispatch({
          type: STORE_FETCH,
          payload: store
        });

        return store.products.map(({ _id }) => api.get(`/products/${_id}`).then((product) => product.data.data));
      })
      .then((promises) => Promise.all(promises).then((data) => dispatch([
        {
          type: STORE_PRODUCT_FETCH,
          payload: data
        },
        actionNotify('Products updated successfully')
      ])))
      .then(() => dispatch({ type: CART_CLEAR }))
      .then(() => setTimeout(() => history.push(history.location.pathname), 2000))
      .then(() => dispatch(actionDone()))
      .catch((error) => dispatch(errorReport(error)));
  }
  return dispatch([{ type: STORE_FETCH_FAILED }, actionNotify('')]);
};

export const userFetch = () => (dispatch, getState) => {
  const { email, token } = getState().auth;

  api
    .get(`/users/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => dispatch([
      {
        type: USER_FETCH,
        payload: res.data.data
      },
      actionNotify(res.data.message)
    ]))
    .then(() => dispatch(storeFetch()))
    .then(() => dispatch(ordersFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const userUpdateProfile = (formValues) => async (dispatch, getState) => {
  const { user, token } = getState().auth;

  try {
    await dispatch(actionLoad());
    const res = await api.put(`/users/${user.email}`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
      timeOut
    });

    dispatch([{ type: USER_UPDATE_PROFILE }, actionNotify(res.data.message), userFetch()]);
  } catch (error) {
    dispatch(errorReport(error));
  }
};

export const userShopsUpdate = (shopId) => async (dispatch, getState) => {
  const { token, email } = getState().auth;

  try {
    const res = await api.put(
      `/users/${email}`,
      { isDeleted: false, shops: [shopId] },
      {
        headers: { Authorization: `Bearer ${token}` }
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

export const orderCancel = (id) => (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const { token } = getState().auth;

  const req = api.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000
  });

  return req
    .then((res) => dispatch([{ type: ORDER_CANCEL }, actionNotify(res.data.message)]))
    .then(() => dispatch(ordersFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const transactionsFetch = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  api
    .get('/transactions')
    .then(async (res) => {
      const payload = [];
      res.data.data.forEach((transaction) => (transaction.user._id === user._id ? payload.push(transaction) : ''));

      await dispatch([
        {
          type: TRANSACTIONS_FETCH,
          payload
        },
        actionNotify(res.data.message)
      ]);
    })
    .catch((error) => dispatch(errorReport(error)));
};

// STORE Actions
export const storeCreate = () => (dispatch, getState) => {
  const { user, token } = getState().auth;
  const { _id } = user;

  if (ifSeller(user.type)) {
    const res = api.post(
      '/shops',
      {
        name: `${user.name}'s Store`,
        description: `This is a store by ${user.name}`,
        user: _id
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 30000
      }
    );

    return res
      .then((response) => dispatch([
        {
          type: STORE_CREATE
        },
        actionNotify(response.data.message),
        // eslint-disable-next-line no-underscore-dangle
        userShopsUpdate(response.data.data._id)
      ]))
      .catch((error) => dispatch(errorReport(error)));
  }
  return false;
};

export const featuredStoreFetch = (num) => (dispatch) => {
  const req = api.get('/shops/', timeOut);

  return req
    .then((res) => dispatch(res.data.data.slice(0, num)))
    .catch((error) => dispatch(errorReport(error)));
};

// export const storeFetch =
//  () => async (dispatch, getState) => {
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

export const storeUpdateInfo = (formValues) => (dispatch, getState) => {
  const { token, user } = getState().auth;

  if (ifSeller(user.type)) {
    dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

    const { store } = getState();
    const { _id } = store;

    const req = api.put(`/shops/${_id}`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 30000
    });

    return req
      .then((res) => dispatch([
        {
          type: STORE_UPDATE_INFO
        },
        actionNotify(res.data.message)
      ]))
      .then(() => dispatch(storeFetch()))
      .catch((error) => dispatch(errorReport(error)));
  }
  return false;
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

export const storeUpdateBank = (formValues) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  const bank = { ...formValues };

  if (ifSeller(user.type)) {
    const { store } = getState();
    const { _id } = store;

    try {
      await dispatch(actionLoad());
      const res = await api.put(
        `/shops/${_id}`,
        bank,
        {
          headers: { Authorization: `Bearer ${token}` }
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

export const productUpload = (formValues) => (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const { user, token } = getState().auth;
  const product = { ...formValues, shop: user.shops[0] };

  const req = api.post('/products', product, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000
  });

  return req
    .then((res) => dispatch([{ type: PRODUCT_UPLOAD }, actionNotify(res.data.message)]))
    .then(() => dispatch(storeFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const productDelete = (id) => (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const { order, auth } = getState();
  const { token } = auth;
  const orders = order
    // eslint-disable-next-line no-underscore-dangle
    .map(({ products, _id }) => (products.filter((product) => product._id === id).length > 0 ? _id : ''))
    .filter((item) => item !== '')
    .filter((item) => orders.indexOf(item.order) !== -1)
    .map(({ _id }) => _id);

  // Orders Delete
  // orders.forEach(
  //   async item =>
  //     await api.delete(`/orders/${item}`, {
  //       headers: { Authorization: "Bearer " + token },
  //       timeout: 30000
  //     })
  // );

  // Transactions Delete
  // transactions.forEach(
  //   async item =>
  //     await api.delete(`/transactions/${item}`, {
  //       headers: { Authorization: "Bearer " + token },
  //       timeout: 30000
  //     })
  // );

  const req = api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000
  });

  return req
    .then((res) => dispatch([{ type: PRODUCT_DELETE }, actionNotify(res.data.message)]))
    .then(() => dispatch(storeFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const productUpdate = (formValues) => (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const { token } = getState().auth;
  const { _id } = formValues;

  const req = api.put(`/products/${_id}`, formValues, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000
  });

  return req
    .then((res) => dispatch([{ type: PRODUCT_UPDATE }, actionNotify(res.data.message)]))
    .then(() => dispatch(storeFetch()))
    .catch((error) => dispatch(errorReport(error)));
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

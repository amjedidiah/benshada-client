import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer.js';
import loadReducer from './loadReducer.js';
import storeReducer from './storeReducer.js';
import orderReducer from './orderReducer.js';
import cartReducer from './cartReducer.js';
import transactionReducer from './transactionReducer.js';

export default combineReducers({
  auth: authReducer,
  store: storeReducer,
  order: orderReducer,
  transaction: transactionReducer,
  cart: cartReducer,
  form: reduxFormReducer,
  load: loadReducer
});

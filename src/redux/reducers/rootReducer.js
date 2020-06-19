// Module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducer imports
import loaderReducer from './loaderReducer.js';
import authReducer from './authReducer.js';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';
import storeReducer from './storeReducer.js';

export default combineReducers({
  form: formReducer,
  loader: loaderReducer,
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  store: storeReducer
});

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loaderReducer from './loaderReducer.js';
import authReducer from './authReducer.js';
import userReducer from './userReducer.js';

export default combineReducers({
  form: formReducer,
  loader: loaderReducer,
  auth: authReducer,
  user: userReducer,
  cart: []
});

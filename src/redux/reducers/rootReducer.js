// Module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducer imports
import authReducer from './authReducer.js';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';
import storeReducer from './storeReducer.js';
import testimonialReducer from './testimonialReducer.js';
import subscriptionReducer from './subscriptionReducer.js';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  product: productReducer,
  store: storeReducer,
  subscription: subscriptionReducer,
  testimonial: testimonialReducer,
  user: userReducer
});

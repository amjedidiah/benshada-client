import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import loadReducer from './loadReducer';
import storeReducer from './storeReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  auth: authReducer,
  store: storeReducer,
  order: orderReducer,
  transaction: transactionReducer,
  cart: cartReducer,
  form: reduxFormReducer,
  load: loadReducer
});

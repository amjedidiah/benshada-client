import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loaderReducer from './loaderReducer.js';

export default combineReducers({
  form: formReducer,
  loader: loaderReducer
});

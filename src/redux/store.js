import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import reducers from './reducers/rootReducer';

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(promiseMiddleware, save(['auth']))
)(createStore);

const store = createStoreWithMiddleware(reducers, load());

export default store;

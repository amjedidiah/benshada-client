import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);


  return ({
    STORES_ALL_FULFILLED: { ...state, all: responseData },
    STORES_ONE_FULFILLED: { ...state, selected: responseData },
    LOGOUT: INIT
  }[action.type] || state);
};

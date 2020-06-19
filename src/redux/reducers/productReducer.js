import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return (
    {
      PRODUCTS_ALL_FULFILLED: { ...state, all: responseData },
      PRODUCTS_ONE_FULFILLED: { ...state, selected: responseData },
      PRODUCTS_ONE_SELECTED: { ...state, selected: action.payload },
      LOGOUT: INIT
    }[action.type] || state
  );
};

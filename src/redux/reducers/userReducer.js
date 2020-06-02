const INIT = {};

export default (state = INIT, action) => ({
  USER_ONE_FULFILLED: action.payload && action.payload.data
}[action.type] || state);

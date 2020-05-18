import { ACTION_LOAD, ACTION_NOTIFY, ACTION_DONE } from '../actions/types.js';

const INITIAL_STATE = {
  loading: false,
  bgColor: 'rgba(239, 147, 46, 0.7)',
  spinnerColor: '#fff',
  message: null,
  show: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_LOAD:
      return {
        ...state, loading: true, message: null, show: false
      };
    case ACTION_NOTIFY:
      return {
        ...state, loading: false, message: action.payload, show: true
      };
    case ACTION_DONE:
      return {
        ...state, loading: false, message: null, show: false
      };
    default:
      return state;
  }
};

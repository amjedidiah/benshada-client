const INIT = {
  loading: false,
  bgColor: 'rgba(239, 147, 46, 0.7)',
  spinnerColor: '#fff',
  message: null,
  show: false
};

export default (state = INIT, action) => ({
  ACTION_PENDING: ({
    ...state, loading: true, message: null, show: false
  }),
  ACTION_NOTIFY: ({
    ...state, loading: false, message: action.payload, show: true
  }),
  ACTION_FULFILLED: ({
    ...state, loading: false, message: null, show: false
  })
}[action.type] || state);

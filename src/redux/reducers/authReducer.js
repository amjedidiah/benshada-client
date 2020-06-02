const INIT = {
  isSignedIn: false,
  token: null,
  email: null
};

export default (state = INIT, action) => ({
  SIGNUP_FULFILLED: INIT,
  LOGIN_FULFILLED: (
    {
      ...state,
      isSignedIn: true,
      token: action.payload && action.payload.data && action.payload.data.token,
      email: action.payload && action.payload.data && action.payload.data.email
    }),
  LOGOUT: INIT
}[action.type] || state);

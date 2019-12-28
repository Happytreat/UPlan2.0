import identity from 'lodash/identity';
import noop from 'lodash/noop';
import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'auth/REQUEST',
  signup: 'auth/signup',
  resetPasswordRequest: 'auth/RESET_PW_REQUEST',
  resetPasswordSuccess: 'auth/RESET_PW_SUCCESS',
  clear: 'auth/CLEAR',
  success: 'auth/SUCCESS',
  error: 'auth/ERROR',
};

export const actions = {
  request: createAction(types.request),
  signup: createAction(types.signup),
  resetPasswordRequest: createAction(types.resetPasswordRequest),
  resetPasswordSuccess: createAction(types.resetPasswordSuccess),
  clear: createAction(types.clear),
  success: createAction(
    types.success,
    identity,
    (payload, resolve = noop, reject = noop) => ({ resolve, reject }),
  ),
  error: createAction(types.error),
};

const initialState = {
  fetching: false,
  error: false,
  isAuth: false,
  nickname: "",
  email: "",
  emailVerified: false,
  resetPasswordRequest: false // reset password code sent out
};

const reducer = handleActions({
  [types.request]: (state) => (
    {
      ...state,
      fetching: true,
      error: false,
    }),
  [types.signup]: (state, action) => (
    {
      ...state,
      error: false,
      email: action.payload,
    }),
  [types.resetPasswordRequest]: (state, action) => (
    {
      ...state,
      error: false,
      email: action.payload,
      resetPasswordRequest: true,
    }),
  [types.resetPasswordSuccess]: (state) => (
    {
      ...state,
      error: false,
      resetPasswordRequest: false,
    }),
  [types.clear]: () => (
    {
      fetching: false,
      ...initialState,
    }),
  [types.success]: (state, action) => (
    {
      ...state,
      fetching: false,
      error: false,
      ...action.payload,
    }),
  [types.error]: (state, action) => (
    {
      ...state,
      fetching: false,
      error: action.payload,
    }),
}, initialState);

export const selectors = {
  error: state => state.auth.error,
  fetching: state => state.auth.fetching,
  isAuth: state => state.auth.isAuth,
  nickname: state => state.auth.nickname,
  email: state => state.auth.email,
  username: state => state.auth.username,
  resetPasswordRequest: state => state.auth.resetPasswordRequest,
};

export default reducer;

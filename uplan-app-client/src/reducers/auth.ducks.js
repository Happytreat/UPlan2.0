import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'auth/REQUEST',
  success: 'auth/SUCCESS',
  error: 'auth/ERROR',
};

export const actions = {
  request: createAction(types.request),
  success: createAction(types.success),
  error: createAction(types.error),
};

const initialState = {
  fetching: false,
  error: false,
  isAuth: false,
  nickname: "",
  email: "",
  username: "",
};

const reducer = handleActions({
  [types.request]: (state) => (
    {
      ...state,
      fetching: true,
      error: false,
    }),
  [types.success]: (state, action) => (
    {
      ...state,
      fetching: false,
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
};

export default reducer;

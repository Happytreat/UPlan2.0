import identity from 'lodash/identity';
import noop from 'lodash/noop';
import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'user/REQUEST',
  clear: 'user/CLEAR',
  update: 'user/UPDATE',
  success: 'user/SUCCESS',
  error: 'user/ERROR',
};

export const actions = {
  request: createAction(types.request),
  clear: createAction(types.clear),
  // success: createAction(types.success),
  update: createAction(
    types.update,
    identity,
    (payload, resolve = noop, reject = noop) => ({ resolve, reject }),
  ),
  error: createAction(types.error),
};

const initialState = {
  fetching: false,
  error: false,
  semesters: [],
  modules: [],
  tags: [],
};

const reducer = handleActions({
  [types.request]: (state) => (
    {
      ...state,
      fetching: true,
      error: false,
    }),
  [types.clear]: (state) => (
    {
      ...state,
      fetching: false,
      ...initialState,
    }),
  [types.success]: (state, action) => (
    {
      ...state,
      fetching: false,
      ...action.payload,
    }),
  [types.update]: (state, action) => (
    {
      ...state,
      fetching: false,
      ...action.payload,
    }),
  [types.error]: (state) => (
    {
      ...state,
      fetching: false,
      error: true,
    }),
}, initialState);

export const selectors = {
  error: state => state.user.error,
  fetching: state => state.user.fetching,
  semesters: state => state.user.semesters,
  tags: state => state.user.tags,
  modules: state => state.user.modules,
};

export default reducer;

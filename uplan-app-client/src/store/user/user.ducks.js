import { orderBy, noop, identity } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect'

export const types = {
  request: 'user/REQUEST',
  clear: 'user/CLEAR',
  update: 'user/UPDATE',
  dragRequest: 'user/DRAGREQUEST',
  dragUpdate: 'user/DRAGUPDATE', // update from draggable components
  success: 'user/SUCCESS',
  error: 'user/ERROR',
};

export const actions = {
  request: createAction(types.request),
  dragRequest: createAction(types.dragRequest),
  clear: createAction(types.clear),
  success: createAction(types.success),
  dragUpdate: createAction(types.dragUpdate),
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
  draggableList: [],
};

const reducer = handleActions({
  [types.request]: (state) => (
    {
      ...state,
      fetching: true,
      error: false,
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
      ...action.payload,
    }),
  [types.update]: (state, action) => (
    {
      ...state,
      fetching: false,
      ...action.payload,
    }),
  [types.dragUpdate]: (state, action) => (
    {
      ...state,
      fetching: false,
      draggableList: action.payload,
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
  semesters: createSelector(
    state => state.user.semesters,
    semesters => orderBy(semesters, ['order'], 'asc')
  ),
  tags: state => state.user.tags,
  modules: state => state.user.modules,
};

export default reducer;

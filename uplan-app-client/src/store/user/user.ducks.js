import { orderBy, noop, identity } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { defaultTheme } from '../../theme/globalStyle';

export const types = {
  request: 'user/REQUEST',
  clear: 'user/CLEAR',
  update: 'user/UPDATE',
  dragRequest: 'user/DRAGREQUEST',
  dragUpdate: 'user/DRAGUPDATE', // update from draggable components
  updateModule: 'user/UPDATEMODULE', // does not update fetching for seamless xp
  success: 'user/SUCCESS',
  error: 'user/ERROR',
  alt: 'user/ALT',
  updateTheme: 'user/UPDATETHEME'
};

export const actions = {
  request: createAction(types.request),
  clear: createAction(types.clear),
  success: createAction(types.success), // For saga
  dragRequest: createAction(types.dragRequest),
  dragUpdate: createAction(types.dragUpdate),
  updateModule: createAction(types.updateModule),
  update: createAction(
    types.update,
    identity,
    (payload, resolve = noop, reject = noop) => ({ resolve, reject }),
  ),
  error: createAction(types.error),
  alt: createAction(types.alt),
  updateTheme: createAction(types.updateTheme),
};

const initialState = {
  fetching: false,
  error: false,
  semesters: [],
  modules: [],
  tags: [],
  alt: true,
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
  [types.alt]: (state) => (
    {
      ...state,
      fetching: false,
      alt: !state.alt,
    }),
  [types.dragUpdate]: (state, action) => (
    {
      ...state,
      fetching: false,
      modules: action.payload, // update modules directly as draggableList
    }),
  [types.error]: (state) => (
    {
      ...state,
      fetching: false,
      error: true,
    }),
  [types.updateTheme]: (state, action) => (
    {
      ...state,
      theme: action.payload,
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
  alt: state => state.user.alt,
  theme: state => state.user.theme || defaultTheme,
};

export default reducer;

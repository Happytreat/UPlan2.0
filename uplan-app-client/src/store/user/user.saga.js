import { put, takeLatest, delay } from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';

import { actions, types } from './user.ducks';

// Worker Saga: Performs the async increment task
export function* workerUpdateDrag(action) {
  try {
    // debounce by 500ms
    yield delay(500);
    yield put(actions.dragUpdate(action.payload));
  } catch (error) {
    // Set a default error
    // const err = new Error('Something went wrong. Please try again');
    yield put(actions.error());
  }
}

// Watcher Saga
export function* watchUpdateDrag() {
  yield takeLatest(types.dragRequest, workerUpdateDrag)
}

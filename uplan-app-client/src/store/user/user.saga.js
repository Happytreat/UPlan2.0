import { call, put, takeLatest, takeEvery, delay } from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import { API } from "aws-amplify";
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

const apiUpdateModule = (module) => API.put("api", "/update-modules", { body: module });

export function* workerUpdateModule(action) {
  try {
    yield call(apiUpdateModule, action.payload);
  } catch (error) {
    // Set a default error
    // const err = new Error('Something went wrong. Please try again');
    yield put(actions.error());
  }
}

// Watcher Saga
export function* watchUpdateDrag() {
  yield takeLatest(types.dragRequest, workerUpdateDrag);
  yield takeEvery(types.updateModule, workerUpdateModule);
}

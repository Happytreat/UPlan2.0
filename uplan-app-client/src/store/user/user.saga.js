// import { call, put, takeLatest, delay } from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
// import { API } from 'aws-amplify';
//
// import { actions, types } from './user.ducks';
//
// const apiUserInfo = () => new Promise(() => API.get("api", "/semesters"));
// // Worker Saga: Performs the async increment task
// function* workerUser() {
//   try {
//     // debounce by 100ms
//     // yield delay(100);
//     const payload = yield call(apiUserInfo);
//     yield put(actions.success(payload));
//   } catch (error) {
//     // Set a default error
//     const err = new Error('Something went wrong. Please try again');
//     yield put(actions.error(err));
//   }
// }
//
// // Watcher Saga
// export default [
//   takeLatest(types.request, workerUser),
// ];

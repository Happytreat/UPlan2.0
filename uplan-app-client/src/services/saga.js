import { all } from 'redux-saga/effects';

import { watchUpdateDrag } from '../store/user/user.saga';

export function* rootSaga() {
  yield all([
    watchUpdateDrag(),
  ]);
}

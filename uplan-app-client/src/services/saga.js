import { all } from 'redux-saga/effects';
import { getStore, sagaMiddleware } from './store';

import user from '../store/user/user.saga';

function* rootSaga() {
  yield all([
    //...user,
  ]);
}

getStore();
sagaMiddleware.run(rootSaga);

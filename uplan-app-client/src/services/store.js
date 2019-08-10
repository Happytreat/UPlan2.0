import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducer';

/* Configuration persisted redux store */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
  // blacklist: ['user'] // will not be persisted
};

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const routeReducer = persistReducer(persistConfig, createRootReducer(history));

// dev tools middleware
const composeEnhancers = composeWithDevTools({ serialize: true });

// Modelled this as a singleton to avoid circular dependency import
let store;
export const getStore = () => {
  if (!store) {
    store = createStore(
      routeReducer,
      composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
    );
  }
  return store;
};

store = getStore();
export const persistor = persistStore(store);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    // This fetch the new state of the above reducers.
    // eslint-disable-next-line
    const nextRootReducer = require('./reducer').default;
    store.replaceReducer(
      persistReducer(persistConfig, nextRootReducer),
    );
  });
}

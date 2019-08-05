import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import reduceReducers from 'reduce-reducers';
import auth from '../reducers/auth.ducks';

export default history => combineReducers({
  auth,
  router: connectRouter(history),
});

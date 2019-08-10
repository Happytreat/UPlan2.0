import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import reduceReducers from 'reduce-reducers';
import auth from '../store/auth.ducks';
import user from '../store/user/user.ducks';

export default history => combineReducers({
  auth,
  user,
  router: connectRouter(history),
});

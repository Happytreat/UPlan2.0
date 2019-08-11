import { connect } from "react-redux";
import { API } from "aws-amplify";
import Dashboard from './Dashboard.component.jsx';
import { selectors as auth } from '../../../store/auth.ducks';
import { actions as userActions, selectors as user } from '../../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
    semesters: user.semesters(state),
    fetching: user.fetching(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDashboard: async () => {
      dispatch(userActions.request());
      try {
        const userInfo = await API.get("api", "/user");
        dispatch(userActions.update( userInfo ));
      } catch (e) {
        alert(e);
        dispatch(userActions.error(e.message));
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

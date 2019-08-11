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
    error: user.error(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSemesters: async () => {
      dispatch(userActions.request());
      try {
        const semesters = await API.get("semesters", "/semesters");
        dispatch(userActions.update({ semesters }))
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

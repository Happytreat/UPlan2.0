import { connect } from "react-redux";
import NavBar from './Navbar.component';
import { selectors as auth, actions as authActions } from '../../store/auth.ducks';
import { actions as userActions } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearStateOnLogout: () => {
      dispatch(authActions.clear());
      dispatch(userActions.clear());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);

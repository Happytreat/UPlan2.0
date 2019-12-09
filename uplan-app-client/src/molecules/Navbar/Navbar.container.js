import { connect } from "react-redux";
import { push } from 'connected-react-router'
import { Auth } from "aws-amplify";

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
    handleLogout: async (event) => {
      event.preventDefault();
      await Auth.signOut();
      dispatch(authActions.clear());
      dispatch(userActions.clear());
      push("/login");
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);

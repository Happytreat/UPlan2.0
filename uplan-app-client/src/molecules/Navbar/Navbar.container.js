import { connect } from "react-redux";
import NavBar from './Navbar.component';
import { selectors as auth, actions as authActions } from '../../store/auth.ducks';

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearStateOnLogout: () => dispatch(authActions.clear()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);

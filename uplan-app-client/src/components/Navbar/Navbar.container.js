import { connect } from "react-redux";
import NavBar from './Navbar.component';
import auth from '../../reducers/auth.ducks';

function mapStateToProps(state) {
  return {
    isAuth: true,
    // isAuth: auth.isAuth(state),
  };
}

export default connect(
  mapStateToProps,
  null,
)(NavBar);

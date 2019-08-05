import { connect } from "react-redux";
import HomePage from './HomePage.component';
import { selectors as auth } from '../../../reducers/auth.ducks';

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
  };
}

export default connect(
  mapStateToProps,
  null,
)(HomePage);

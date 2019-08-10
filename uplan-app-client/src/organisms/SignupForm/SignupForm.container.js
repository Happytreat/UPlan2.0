import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import SignupForm from './SignupForm.component';
import { actions as authActions, selectors as auth } from '../../store/auth.ducks';

function mapStateToProps(state) {
  return {
    error: auth.error(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setError: (err) => dispatch(authActions.error(err)),
    signup: async ({ email, password, nickname }) => {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          nickname,
          email,
        }
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);

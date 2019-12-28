import { connect } from "react-redux";
import { Auth } from "aws-amplify";

import LoginForm from './LoginForm.component';
import { actions as authActions, selectors as auth } from '../../store/auth.ducks';

function mapStateToProps(state) {
  return {
    error: auth.error(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(authActions.resetPasswordSuccess()),
    handleSubmit: async ({ values, setSubmitting }) => {
      try {
        const { username, password } = values;
        const user = await Auth.signIn(username, password);

        const payload = {
          isAuth: true,
          nickname: user.attributes.nickname,
          email: user.attributes.email,
          emailVerified: user.attributes['email_verified'],
        };

        dispatch(authActions.success(payload));
        alert("Logged in successful."); // Change to snackbar
      } catch (err) {
        dispatch(authActions.error(err.message));
      } finally {
        setSubmitting(false);
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

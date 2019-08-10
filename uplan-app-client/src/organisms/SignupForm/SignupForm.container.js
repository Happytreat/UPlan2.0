import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { push } from 'connected-react-router';
import SignupForm from './SignupForm.component';
import { actions as authActions, selectors as auth } from '../../store/auth.ducks';
import { getStore } from "../../services/store";

function mapStateToProps(state) {
  return {
    error: auth.error(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: async ({ values, setSubmitting }) => {
      const { username, password, nickname } = values;
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            nickname,
            email: username,
          }
        });
        dispatch(authActions.signup(username));
        getStore().dispatch(push("/confirm/email")); // change route to confirm email
      } catch (e) {
        try {
          if (e.code === "UsernameExistsException") {
            await Auth.resendSignUp(username).then(() => {
                alert("A verification code has been resent to your email.");
              getStore().dispatch(push("/confirm/email"));
              }
            )
          }
        } catch (err) {
          if (err.message === "User is already confirmed.") {
            alert("A user of this email has already existed. Please login.");
            getStore().dispatch(push("/login"));
          }
        }
      } finally {
        setSubmitting(false);
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);

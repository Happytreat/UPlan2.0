import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import ResetPasswordForm from './ResetPasswordForm.component';
import {actions as authActions, selectors as auth} from '../../store/auth.ducks';
import {getStore} from "../../services/store";
import {push} from "connected-react-router";

function mapStateToProps(state) {
  return {
    isCodeSent: auth.resetPasswordRequest(state),
    email: auth.email(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleEmailSubmit: async ({ values, setSubmitting }) => {
      const { email } = values;
      try {
        await Auth.forgotPassword(email);
        dispatch(authActions.resetPasswordRequest(email));
        alert('The confirmation code has been sent. Please check your email for the confirmation code.'); // TODO: Change to snack bar
      } catch (e) {
        alert(e.message); // to use snack bar
      } finally {
        setSubmitting(false);
      }
    },
    handleResetSubmit: async ({ email, values, setSubmitting }) => {
      const { confirmationCode, password } = values;
      try {
        await Auth.forgotPasswordSubmit(email, confirmationCode, password);
        dispatch(authActions.resetPasswordSuccess());
        alert('Your password has been reset successfully. Please login.'); // TODO: Change to snack bar
        getStore().dispatch(push("/login"));
      } catch (e) {
        alert(e.message); // to use snack bar
      } finally {
        setSubmitting(false);
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordForm);

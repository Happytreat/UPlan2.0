import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import EmailConfirmation from './EmailConfirmationForm.component';
import { actions as authActions } from '../../store/auth.ducks';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    confirmEmail: async ({ email, password, confirmationCode }) => {
      await Auth.confirmSignUp(email, confirmationCode);

      const user = await Auth.signIn(email, password);
      const payload = {
        isAuth: true,
        nickname: user.attributes.nickname,
        email: user.attributes.email,
        emailVerified: user.attributes['email_verified'],
      };

      dispatch(authActions.success(payload));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailConfirmation);

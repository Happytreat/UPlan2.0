import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import EmailConfirmation from './EmailConfirmationForm.component';
import { selectors as auth } from '../../store/auth.ducks';

function mapStateToProps(state) {
  return {
    email: auth.email(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmEmail: async ({ email, confirmationCode }) => {
      await Auth.confirmSignUp(email, confirmationCode);
      alert('Email successfully confirmed. Please login.'); // TODO: Change to snack bar
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailConfirmation);

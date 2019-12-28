import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { push }  from "connected-react-router";
import EmailConfirmation from './EmailConfirmationForm.component';
import { selectors as auth } from '../../store/auth.ducks';
import { getStore } from "../../services/store";

function mapStateToProps(state) {
  return {
    email: auth.email(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: async ({ email, values, setSubmitting }) => {
      const { confirmationCode } = values;
      try {
        await Auth.confirmSignUp(email, confirmationCode);
        alert('Email successfully confirmed. Please login.'); // TODO: Change to snack bar
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
)(EmailConfirmation);

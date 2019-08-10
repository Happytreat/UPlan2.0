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
    setLoading: () => dispatch(auth.request()),
    setError: (err) => dispatch(auth.error(err)),
    login: async ({ email, password }) => {
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
)(LoginForm);

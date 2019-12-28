import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectors as auth } from '../store/auth.ducks';
import { selectors as user } from '../store/user/user.ducks';

import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import Dashboard from '../organisms/pages/HomePage/Dashboard.container';
import NotLoggedInHome from '../organisms/pages/HomePage/NotLoggedIn';
import LoginPage from '../organisms/LoginForm/LoginForm.container';
import ResetPassword from "../organisms/ResetPasswordForm/ResetPasswordForm.container";
import SignupPage from '../organisms/SignupForm/SignupForm.container';
import EmailConfirmation from '../organisms/EmailConfirmationForm/EmailConfirmationForm.container';

import {
  ROUTE_ROOT,
  ROUTE_DASHBOARD,
  ROUTE_USER_LOGIN,
  ROUTE_USER_SIGNUP,
  ROUTE_CONFIRM_EMAIL,
  ROUTE_USER_RESET_PASSWORD,
} from '../consts/routes';
import NavBar from "../molecules/Navbar/Navbar.container";
import {ThemeProvider} from "styled-components";
import {
  blueTheme, greenTheme, pinkTheme, yellowTheme,
} from "../theme/globalStyle";

class Router extends Component {
  handleThemeChange = value => {
    switch (value) {
      case 'pinkTheme':
        return pinkTheme;
      case 'yellowTheme':
        return yellowTheme;
      case 'greenTheme':
        return greenTheme;
      default:
        return blueTheme;
    }
  };

  render() {
    const { isAuth, theme } = this.props;
    return (
      <ThemeProvider theme={this.handleThemeChange(theme)}>
        <NavBar/>
        <Switch>
          <UnauthenticatedRoute path={ROUTE_ROOT} exact component={NotLoggedInHome} isAuth={isAuth} title={"Home"} />

          <UnauthenticatedRoute path={ROUTE_USER_RESET_PASSWORD} exact component={ResetPassword} isAuth={isAuth} title={"Reset Password"}/>

          <UnauthenticatedRoute path={ROUTE_USER_LOGIN} exact component={LoginPage} isAuth={isAuth} title={"Login"}/>

          <UnauthenticatedRoute path={ROUTE_USER_SIGNUP} exact component={SignupPage} isAuth={isAuth} title={"Signup"}/>

          <UnauthenticatedRoute path={ROUTE_CONFIRM_EMAIL} exact component={EmailConfirmation} isAuth={isAuth} title={"Confirm Your Email"}/>

          <AuthenticatedRoute path={ROUTE_DASHBOARD} exact component={Dashboard} isAuth={isAuth} title={"My Dashboard"} />

          { /* Finally, catch all unmatched routes */ }
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    );
  }
}

Router.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
    theme: user.theme(state),
    // Required for connected-router to work
    // https://github.com/supasate/connected-react-router/issues/130
    location: state.router.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Router);

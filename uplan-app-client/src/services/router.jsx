import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectors as auth } from '../store/auth.ducks';

import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import Dashboard from '../organisms/pages/HomePage/Dashboard.container';
import NotLoggedInHome from '../organisms/pages/HomePage/NotLoggedIn';
import LoginPage from '../organisms/LoginForm/LoginForm.container';
import SignupPage from '../organisms/SignupForm/SignupForm.container';
import EmailConfirmation from '../organisms/EmailConfirmationForm/EmailConfirmationForm.container';

import {
  ROUTE_ROOT,
  ROUTE_DASHBOARD,
  ROUTE_USER_LOGIN,
  ROUTE_USER_SIGNUP,
  ROUTE_CONFIRM_EMAIL,
} from '../consts/routes';


const Router = ({ isAuth, location, handleThemeChange }) => (
  <Switch>
    <UnauthenticatedRoute path={ROUTE_ROOT} exact component={NotLoggedInHome} isAuth={isAuth} title={"UPlan"} handleThemeChange={handleThemeChange} />

    <UnauthenticatedRoute path={ROUTE_USER_LOGIN} exact component={LoginPage} isAuth={isAuth} title={"Login"}/>

    <UnauthenticatedRoute path={ROUTE_USER_SIGNUP} exact component={SignupPage} isAuth={isAuth} title={"Signup"}/>

    <UnauthenticatedRoute path={ROUTE_CONFIRM_EMAIL} exact component={EmailConfirmation} isAuth={isAuth} title={"Confirm Your Email"}/>

    <AuthenticatedRoute path={ROUTE_DASHBOARD} exact component={Dashboard} isAuth={isAuth} title={"My Dashboard"} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFoundPage} />
  </Switch>
);

Router.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  handleThemeChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuth: auth.isAuth(state),
    // Required for connected-router to work
    // https://github.com/supasate/connected-react-router/issues/130
    location: state.router.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Router);

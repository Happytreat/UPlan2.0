import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectors as auth } from '../reducers/auth.ducks';

import {
  AppliedRoute,
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import Dashboard from '../organisms/pages/HomePage/Dashboard.container';
import NotLoggedInHome from '../organisms/pages/HomePage/NotLoggedIn';
import LoginPage from '../organisms/LoginForm/LoginForm';
import SignupPage from '../organisms/SignupForm/SignupForm';
import AddSemester from '../organisms/NewSemester/NewSemester';
// import HomePage from "../organisms/pages/HomePage/HomePage.container";
import Semesters from "../organisms/Semesters/Semesters";

import {
  ROUTE_ROOT,
  ROUTE_DASHBOARD,
  ROUTE_USER_LOGIN,
  ROUTE_NEW_SEMESTER,
  ROUTE_DISPLAY_SEMESTER,
  ROUTE_USER_SIGNUP,
} from '../consts/routes';


const Router = ({ isAuth, location }) => (
  <Switch>
    <UnauthenticatedRoute path={ROUTE_ROOT} exact component={NotLoggedInHome} isAuth={isAuth} title={"UPlan"} />

    <UnauthenticatedRoute path={ROUTE_USER_LOGIN} exact component={LoginPage} isAuth={isAuth} title={"Login"}/>

    <UnauthenticatedRoute path={ROUTE_USER_SIGNUP} exact component={SignupPage} isAuth={isAuth} title={"Signup"}/>

    <AuthenticatedRoute path={ROUTE_DASHBOARD} exact component={Dashboard} isAuth={isAuth} title={"My Dashboard"} />

    <AuthenticatedRoute path={ROUTE_NEW_SEMESTER} exact component={AddSemester} isAuth={isAuth} title={"Add Semester"} />

    <AuthenticatedRoute path={ROUTE_DISPLAY_SEMESTER} exact component={Semesters} isAuth={isAuth} title={"My Semester"}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFoundPage} />
  </Switch>
);

Router.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
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

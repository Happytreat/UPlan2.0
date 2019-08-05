import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// import { selectors as auth } from '../reducers/auth.ducks';
import {
  AppliedRoute,
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../components/Routes/Routes";

// pages
import NotFoundPage from '../containers/pages/404';
// import Dashboard from '../containers/pages/HomePage/Dashboard';
// import NotLoggedInHome from '../containers/pages/HomePage/NotLoggedIn';
import LoginPage from '../containers/LoginForm/LoginForm';
import SignupPage from '../containers/SignupForm/SignupForm';
import AddSemester from '../containers/NewSemester/NewSemester';
import HomePage from "../containers/pages/HomePage/homepage";
import Semesters from "../containers/Semesters/Semesters";

import {
  ROUTE_HOME,
  ROUTE_USER_LOGIN,
  ROUTE_NEW_SEMESTER,
  ROUTE_DISPLAY_SEMESTER,
  ROUTE_USER_SIGNUP,
} from '../consts/routes';


const Router = ({ isAuth, location }) => (
  <Switch>
    <AppliedRoute path={ROUTE_HOME} exact component={HomePage} title={"Home"} />

    <UnauthenticatedRoute path={ROUTE_USER_LOGIN} exact component={LoginPage} isAuth={isAuth} title={"Login"}/>

    <UnauthenticatedRoute path={ROUTE_USER_SIGNUP} exact component={SignupPage} isAuth={isAuth} title={"Signup"}/>

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
    isAuth: true,
    // isAuth: auth.isAuth(state),
    // Required for connected-router to work
    // https://github.com/supasate/connected-react-router/issues/130
    location: state.router.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Router);

import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute/AppliedRoute";
import HomePage from "./containers/pages/HomePage/homepage";
import NotFound from "./containers/pages/404";
import Login from "./containers/LoginForm/LoginForm";
import Signup from './containers/SignupForm/SignupForm';
import NewSemester from './containers/NewSemester/NewSemester';
import Semesters from './containers/Semesters/Semesters';

// TODO: Connected router connect to pass authenticated props instead
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={HomePage} props={childProps}
    />
    <AppliedRoute path="/login" exact component={Login} props=
      {childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props=
      {childProps} />
    <AppliedRoute path="/semesters/new" exact component={NewSemester} props=
      {childProps} />
    <AppliedRoute path="/semesters/:id" exact component={Semesters} props=
      {childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

// export default () =>
//   <Switch>
//     <Route path="/" exact component={HomePage} />
//     <Route path="/login" exact component={Login} />
//     <Route component={NotFound} />
//   </Switch>;
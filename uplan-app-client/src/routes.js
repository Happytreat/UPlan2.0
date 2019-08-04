import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/pages/HomePage/homepage";
import NotFound from "./containers/pages/404";
import Login from "./containers/LoginForm/LoginForm";
import AppliedRoute from "./components/AppliedRoute/AppliedRoute";

// TODO: Connected router connect to pass authenticated props instead
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={HomePage} props={childProps}
    />
    <AppliedRoute path="/login" exact component={Login} props=
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
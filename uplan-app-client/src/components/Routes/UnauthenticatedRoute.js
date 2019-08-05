import React from "react";
import { Route, Redirect } from "react-router-dom";

// E.g. signup and login should not be allowed when user is logged in
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      !cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect to="/" />}
  />;
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/pages/HomePage/homepage";
import NotFound from "./containers/pages/404";
import Login from "./containers/LoginForm/LoginForm";

export default () =>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/pages/HomePage/homepage";
import NotFound from "./containers/pages/404";

export default () =>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route component={NotFound} />
  </Switch>;
import React, { Component } from "react";
import LoggedIn from "./Dashboard";
import NotLoggedIn from "./NotLoggedIn";

export default class HomePage extends Component {
  // Consider placing Dashboard at separate route /dashboard
  // and redirect / to path if authenticated
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="Home">
        {isAuthenticated
          ? <LoggedIn isAuthenticated={isAuthenticated} />
          : <NotLoggedIn />}
      </div>
    );
  }
}
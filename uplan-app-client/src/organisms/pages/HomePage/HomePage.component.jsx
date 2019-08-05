import React, { Component } from "react";
import PropTypes from "prop-types";
import LoggedIn from "./Dashboard";
import NotLoggedIn from "./NotLoggedIn";

export default class HomePage extends Component {
  // Consider placing Dashboard at separate route /dashboard
  // and redirect / to path if authenticated
  render() {
    const { isAuth } = this.props;
    return (
      <div className="Home">
        {isAuth
          ? <LoggedIn isAuthenticated={isAuth} />
          : <NotLoggedIn />}
      </div>
    );
  }
};

HomePage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

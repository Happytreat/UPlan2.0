import React, { Component } from "react";
import LoggedIn from "./Dashboard";
import NotLoggedIn from "./NotLoggedIn";

export default class HomePage extends Component {
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated
          ? <LoggedIn />
          : <NotLoggedIn />}
      </div>
    );
  }
}
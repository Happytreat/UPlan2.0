import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Routes from "./routes";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";

class App extends Component {
  // TODO: Move to redux store
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      // AWS Amplify automatically persist login info and load into state
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    // Add Loading spinner when isAuthenticating
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <NavBar props={childProps}/>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
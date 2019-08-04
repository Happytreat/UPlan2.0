import React, { Component } from "react";
import Routes from "./routes";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";

class App extends Component {
  // TODO: Move to redux store
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App container">
        <NavBar props={childProps}/>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
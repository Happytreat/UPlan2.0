import React, { Component } from "react";
import Routes from "./routes";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <NavBar />
        <Routes />
      </div>
    );
  }
}

export default App;
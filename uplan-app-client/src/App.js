import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Routes from "./routes";
import "./App.css";
import Logo from "./asset/unicorn-icon.png";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid="true" collapseOnSelect style={{background: 'ghostwhite'}}>
            <Navbar.Brand>
              <Link to="/">
                <img src={Logo} alt={Logo} style={{maxHeight: '7vh'}} />
                UPlan
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../asset/unicorn-icon.png";

const styles = {
  link: {
    color: '#999',
    padding: '1rem',
    cursor: 'pointer',
  }
};

class NavBar extends Component {
  // TODO: Use redux
  handleLogout = async event => {
    await Auth.signOut();
    this.props.props.userHasAuthenticated(false);
  }

  render() {
    const { isAuthenticated } = this.props.props;

    return (
      <>
        <Navbar fluid="true" collapseOnSelect style={{background: 'ghostwhite'}}>
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} alt={Logo} style={{maxHeight: '7vh'}} />
              UPlan
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {
                isAuthenticated
                ? <Nav.Item style={styles.link} onClick={this.handleLogout}>Logout</Nav.Item>
                : <>
                    <LinkContainer to="/signup" style={styles.link}>
                      <Nav.Item>
                        Signup
                      </Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/login" style={styles.link}>
                      <Nav.Item>
                        Login
                      </Nav.Item>
                    </LinkContainer>
                  </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
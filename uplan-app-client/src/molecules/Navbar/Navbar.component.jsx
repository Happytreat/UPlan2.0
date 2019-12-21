import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import styled from 'styled-components'

import Logo from "../../asset/unicorn-icon-transparent.png";
import ThemeSelect from '../ThemeSelect/ThemeSelect';

const { Item } = Nav;
const { Toggle, Collapse, Brand } = Navbar;

const ThemedLinkContainer = styled(LinkContainer)`
  color: ${props => props.theme.primary};
  padding: 1rem;
  cursor: pointer;
`;

const ThemedNavItem = styled(Item)`
  color: ${props => props.theme.primary};
  padding: 1rem;
  cursor: pointer;
`;

const ThemedNavbar = styled(Navbar)`
  background: ${props => props.theme.bg};
`;

const NavLogo = styled.img`
  height: 6vh;
  padding: 0 0.5rem 0 1rem;
`;

const NavLogoAndTitle = styled(Link)`
  color: ${props => props.theme.primary};
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

class NavbarComponent extends Component {
  render() {
    const { isAuth, handleLogout, updateTheme } = this.props;

    return (
      <>
        <ThemedNavbar fluid="true" collapseOnSelect>
          <Brand>
            <NavLogoAndTitle to="/">
              <NavLogo src={Logo} alt={Logo} />
              UPlan
            </NavLogoAndTitle>
          </Brand>
          <Toggle />
          <Collapse className="justify-content-end">
            <Nav>
              <Item>
                <ThemeSelect handleThemeChange={updateTheme} />
              </Item>
              {
                isAuth
                ? <ThemedNavItem onClick={handleLogout}>Logout</ThemedNavItem>
                : <>
                    <ThemedLinkContainer to="/signup">
                      <Item>Signup</Item>
                    </ThemedLinkContainer>
                    <ThemedLinkContainer to="/login">
                      <Item>Login</Item>
                    </ThemedLinkContainer>
                  </>
              }
            </Nav>
          </Collapse>
        </ThemedNavbar>
      </>
    );
  }
}


NavbarComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
};

export default NavbarComponent;

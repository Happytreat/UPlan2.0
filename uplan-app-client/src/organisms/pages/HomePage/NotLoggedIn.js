import React, { Component } from "react";
import styled from 'styled-components';
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

import Logo from "../../../asset/unicorn-icon-transparent.png";
import PlanImg from '../../../asset/undraw_schedule_pnbk.svg'

const MainLogo = styled.img`
   border: 1px solid ${props => props.theme.secondary};
   border-radius: 100px;
   margin-bottom: 10px;
`;

const MainDiv = styled.div`
  padding: 4rem 0;
  text-align: center;
`;

const Description = styled.p`
  color: ${props => props.theme.secondary};
`;

const AppPreview = styled.img`
   max-width: 50vh;
   padding: 0 1rem 0 0;
`;

const Buttons = styled.div`
  display: block;
  margin-bottom: 1rem;
`;

// Have to increase specificity of CSS for Material UI Components
// https://github.com/styled-components/styled-components/issues/1282#issuecomment-341119980
const SignUpButton = styled(Button)`
  && {
    font-size: 16px;
    display: inline-block;
    margin: auto 1rem;
    padding: 1rem 3.5rem;
    border-radius: 10px;
    color: ${props => props.theme.success};
    border: 2px solid ${props => props.theme.success};
    background-color: white;
    &:hover {
      border: 2px solid white;
      background-color: ${props => props.theme.success};
    }
  }
`;

const LoginButton = styled(SignUpButton)`
  && {
    color: ${props => props.theme.alternate};
    border: 2px solid ${props => props.theme.alternate};
    &:hover {
      background-color: ${props => props.theme.alternate};
    }
  }
`;


// TODO: Replace with App Preview Image
export default class NotLoggedIn extends Component {
  render() {
    return (
      <MainDiv>
        <MainLogo src={Logo} alt={Logo} />
        <h4>Visual university planner with the student in mind</h4>
        <Description>UPlan, we do the rest.</Description>
        <br />
        <Buttons>
          <SignUpButton component={Link} to='/signup'>Signup</SignUpButton>
          <LoginButton component={Link} to='/login'>Login</LoginButton>
        </Buttons>
        <AppPreview src={PlanImg} alt="AppPreview" />
      </MainDiv>
    );
  }
}

import React, { Component } from "react";
import styled from 'styled-components'

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
   max-width: 60vh;
   padding: 0 1rem 0 0;
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
        <AppPreview src={PlanImg} alt="AppPreview" />
      </MainDiv>
    );
  }
}

import React, { Component } from "react";
import "./homepage.css";
import PlanImg from '../../../asset/plan.svg'

export default class HomePage extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>UPlan</h1>
          <p>A visual university planning app</p>
          <br />
          <img src={PlanImg} alt="HomePage" style={{maxWidth: '60vh'}} />
        </div>
      </div>
    );
  }
}
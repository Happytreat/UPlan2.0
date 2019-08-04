import React, { Component } from "react";
import PlanImg from '../../../asset/plan.svg'

const styles = {
  main: {
    padding: '4rem 0',
    textAlign: 'center',
  },
  p: {
    color: '#999',
  },
  h1: {
    fontFamily: "Open Sans sans-serif",
    fontWeight: '600',
  },
};

export default class NotLoggedIn extends Component {
  render() {
    return (
      <div style={styles.main}>
        <h1 style={styles.h1}>UPlan</h1>
        <p style={styles.p}>A visual university planning app</p>
        <br />
        <img src={PlanImg} alt="HomePage" style={{ maxWidth: '60vh', padding: '0 1rem 0 0' }} />
      </div>
    );
  }
}
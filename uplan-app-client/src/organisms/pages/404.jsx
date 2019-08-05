import React from "react";
import NotFoundImg from '../../asset/404.svg';

const styles = {
  paddingTop: '100px',
  textAlign: 'center',
};

export default () =>
  <div style={styles}>
    <h3>Sorry, page not found!</h3>
    <br />
    <img src={NotFoundImg} alt="404" style={{maxWidth: '30vh'}} />
  </div>;
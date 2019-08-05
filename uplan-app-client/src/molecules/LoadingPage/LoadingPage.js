import React from 'react';
import { css } from '@emotion/core';
import { HashLoader } from 'react-spinners';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class LoadingPage extends React.Component {
  render() {
    return (
      <>
        <div style={{ minHeight: '20vh' }}></div>
        <div>
          <HashLoader
            css={override}
            sizeUnit={"rem"}
            size={10}
            color={'#4A90E2'}
            loading={true}
          />
          <br />
          <h6 style={{ textAlign: 'center', color: '#4A90E2', fontFamily: 'Arial' }}>
            Loading...
          </h6>
        </div>
      </>
    )
  }
}

export default LoadingPage;

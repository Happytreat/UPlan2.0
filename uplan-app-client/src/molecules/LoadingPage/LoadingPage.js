import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  progress: {
    color: '#4A90E2',
  },
};

export const Spinner = () => {
  return (
    <>
      <CircularProgress style={styles.progress} />
    </>
  );
};

class LoadingPage extends React.Component {
  render() {
    return (
      <>
        <div style={{ minHeight: '20vh' }}></div>
        <div style={{ margin: '0 50%' }}>
          <Spinner />
          <br />
          <br />
          <h6 style={{ color: '#4A90E2', fontFamily: 'Arial' }}>
            Loading...
          </h6>
        </div>
      </>
    )
  }
}

export default LoadingPage;

import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components'

import Router from './services/router';
import { history, persistor, getStore } from './services/store';
import "./App.css";
import log from './utils/logger';

const StyledApp = styled.div`
  margin-top: 5px;
  // background-color: ${props => props.theme.primary};
`;

class App extends Component {
  render() {
    log.info(`${DEF_NAME} client: v${VERSION}`);

    return (
      <StyledApp>
        <Provider store={getStore()}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <Router />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </StyledApp>
    );
  }
}

// export default App;
export default hot(module)(App);

// constructor(props) {
//   super(props);
//   this.state = {
//     isAuthenticated: false,
//     isAuthenticating: true
//   };
// }

// async componentDidMount() {
//   try {
//     // Move to saga (call saga if auth reducer not Auth)
//     // AWS Amplify automatically persist login info and load into state
//     await Auth.currentSession();
//     this.userHasAuthenticated(true);
//   }
//   catch(e) {
//     if (e !== 'No current user') {
//       alert(e);
//     }
//   }
//   this.setState({ isAuthenticating: false });
// }

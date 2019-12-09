import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import styled, { ThemeProvider } from 'styled-components'

import {
  pinkTheme, blueTheme, yellowTheme, greenTheme, darkTheme
} from './theme/globalStyle';
import Router from './services/router';
import { history, persistor, getStore } from './services/store';
import "./App.css";
import log from './utils/logger';
import NavBar from "./molecules/Navbar/Navbar.container";

const StyledApp = styled.div`
  margin-top: 5px;
  background-color: ${props => props.theme.primary};
`;

class App extends Component {
  state = {
    theme: blueTheme
  };

  handleThemeChange = value => {
    switch(value) {
      case 'blueTheme':
        this.setState({ theme: blueTheme });
        break;
      case 'pinkTheme':
        this.setState({ theme: pinkTheme });
        break;
      case 'yellowTheme':
        this.setState({ theme: yellowTheme });
        break;
      case 'greenTheme':
        this.setState({ theme: greenTheme });
        break;
      default:
    }
  };

  render() {
    log.info(`${DEF_NAME} client: v${VERSION}`);

    return (
      <StyledApp theme={this.state.theme}>
        <ThemeProvider theme={this.state.theme}>
          <Provider store={getStore()}>
            <PersistGate loading={null} persistor={persistor}>
              <ConnectedRouter history={history}>
                <NavBar handleThemeChange={this.handleThemeChange}/>
                <Router />
              </ConnectedRouter>
            </PersistGate>
          </Provider>
        </ThemeProvider>
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

import { hot } from 'react-hot-loader';
import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './services/router';
import { history, persistor, getStore } from './services/store';
import "./App.css";

class App extends Component {
  render() {
    // TODO: Get name and version from env
    console.log('UPlan client: v0.1.0');

    //
    return (
      <div className="App container">
        <Provider store={getStore()}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <Router />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
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
//
// userHasAuthenticated = authenticated => {
//   this.setState({ isAuthenticated: authenticated });
// };

// const childProps = {
//   isAuthenticated: this.state.isAuthenticated,
//   userHasAuthenticated: this.userHasAuthenticated,
// };
//
//   return (
//     !this.state.isAuthenticating &&
//     <div className="App container">
//       <NavBar props={childProps}/>
//       <Router childProps={childProps} />
//     </div>
//   );

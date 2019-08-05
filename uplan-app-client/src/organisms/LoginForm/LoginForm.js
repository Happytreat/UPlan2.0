import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { Form, FormGroup, FormControl } from "react-bootstrap";

import { actions as authActions } from '../../reducers/auth.ducks';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import "./LoginForm.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length >
      0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const user = await Auth.signIn(this.state.email, this.state.password);

      const payload = {
        isAuth: true,
        nickname: user.attributes.nickname,
        email: user.attributes.email,
        emailVerified: user.attributes['email_verified'],
      };

      this.props.dispatch(authActions.update(payload));
      alert("Logged in successful."); // Change to snackbar
    } catch (e) {
      // TODO: Show text instead
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  // Add-on: Forget password functionality
  render() {
    const { isLoading, email, password } = this.state;
    return (
      <div>
        <div style={{minHeight: '10vh'}}></div>
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" size="large">
              <Form.Label>Email</Form.Label>
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" size="large">
              <Form.Label>Password</Form.Label>
              <FormControl
                value={password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <ProgressButton
              block
              size="large"
              disabled={!this.validateForm()}
              type="submit"
              text="Login"
              isLoading={isLoading}
              loadingText=" Logging in..."
            >
              Login
            </ProgressButton>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(Login);

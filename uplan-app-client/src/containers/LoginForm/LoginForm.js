import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import { Auth } from "aws-amplify";
import ProgressButton from '../../components/ProgressButton/ProgressButton';
import "./LoginForm.css";

export default class Login extends Component {
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

  // TODO: Redux
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
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
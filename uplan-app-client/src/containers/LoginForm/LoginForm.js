import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./LoginForm.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    try {
      await Auth.signIn(this.state.email, this.state.password);
      alert("Logged in successful.");
      // Redirect
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
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
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" size="large">
              <Form.Label>Password</Form.Label>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              size="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
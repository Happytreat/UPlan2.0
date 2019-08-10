import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { Form, FormGroup, FormControl } from "react-bootstrap";

import {actions as authActions, selectors as auth} from '../../store/auth.ducks';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import "./LoginForm.css";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  // TODO: Use Form.Check
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
    this.setState({ isLoading: true }); // dispatch auth.request too slow
    try {
      const user = await Auth.signIn(this.state.email, this.state.password);

      const payload = {
        isAuth: true,
        nickname: user.attributes.nickname,
        email: user.attributes.email,
        emailVerified: user.attributes['email_verified'],
      };

      this.props.dispatch(authActions.success(payload));
      alert("Logged in successful."); // Change to snackbar
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e.message); // TODO: Show text instead: wrong credentials
    }
  };

  // Add-on: Forget password functionality
  render() {
    const { isLoading, email, password } = this.state;
    const { error } = this.props;

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

Login.propTypes = {
  error: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    error: auth.error(state),
  };
}


export default connect(
  mapStateToProps,
  null,
)(Login);

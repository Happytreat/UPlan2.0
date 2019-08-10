import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  Form
} from "react-bootstrap";
import { Auth } from "aws-amplify";

import ProgressButton from "../../molecules/ProgressButton/ProgressButton";
import {actions as authActions } from '../../store/auth.ducks';
import "./SignupForm.css";
import {connect} from "react-redux";

const styles = {
  helpBlock: {
    fontSize: '14',
    padding: '1rem',
    color: '#999',
  }
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      nickname: "",
      newUser: null
    };
  }

  // Validate Form password better (special characters etc)
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          nickname: this.state.nickname,
          email: this.state.email
        }
      });
      this.setState({ newUser });
    } catch (e) {
      try {
        if (e.code === "UsernameExistsException") {
          await Auth.resendSignUp(this.state.email).then(() => {
              this.setState({ newUser: { username: this.state.email } });
              alert("A verification code has been resent to your email.")
            }
          )
        } else {
          alert(e.message); // to use snack bar
        }
      } catch (err) {
        if (err.message === "User is already confirmed.") {
          alert("A user of this email has already existed. Please login.");
          this.props.history.push("/login");
        }
        // console.log('error of second', err);
      }
    }
    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);

      const user = await Auth.signIn(this.state.email, this.state.password);
      const payload = {
        isAuth: true,
        nickname: user.attributes.nickname,
        email: user.attributes.email,
        emailVerified: user.attributes['email_verified'],
      };

      this.props.dispatch(authActions.success(payload));

      this.props.history.push("/");
    } catch (e) {
      alert(e.message); // to use snack bar
      this.setState({ isLoading: false });
    }
  };

  renderConfirmationForm() {
    return (
      <Form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" size="large">
          <Form.Label>Confirmation Code</Form.Label>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <p style={styles.helpBlock}>Please check your email for the code.</p>
        </FormGroup>
        <ProgressButton
          block
          size="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </Form>
    );
  }
  renderForm() {
    return (
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
        <FormGroup controlId="nickname" size="large">
          <Form.Label>Nickname</Form.Label>
          <FormControl
            value={this.state.nickname}
            onChange={this.handleChange}
            type="text"
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
        <FormGroup controlId="confirmPassword" size="large">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <ProgressButton
          block
          size="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </Form>
    );
  }

  render() {
    return (
      <>
        <div style={{minHeight: '10vh'}}></div>
        <div className="Signup">
          {this.state.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
        </div>
      </>
    );
  }
}

export default connect(
  null,
  null,
)(withRouter(Signup));

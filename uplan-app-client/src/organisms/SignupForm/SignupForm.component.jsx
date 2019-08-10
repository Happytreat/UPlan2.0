import React, { Component } from "react";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import {
  FormGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import ProgressButton from "../../molecules/ProgressButton/ProgressButton";
import EmailConfirmationForm from '../EmailConfirmationForm/EmailConfirmationForm.container';

const styles = {
  form: {
    margin: '0 auto',
    maxWidth: '320px',
  },
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    const { setError, signup } = this.props;
    const { email, password, nickname } = this.state;

    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await signup({ email, password, nickname });
      this.setState({ newUser: true }); // change route to confirm email
    } catch (e) {
      try {
        if (e.code === "UsernameExistsException") {
          await Auth.resendSignUp(this.state.email).then(() => {
              this.setState({ newUser: true }); // show confirmation page
              alert("A verification code has been resent to your email.")
            }
          )
        } else {
          alert(e.message); // to use snack bar (server err)
          setError(e);
        }
      } catch (err) {
        if (err.message === "User is already confirmed.") {
          alert("A user of this email has already existed. Please login.");
          this.props.history.push("/login");
        }
      }
    }
    this.setState({ isLoading: false });
  };

  renderForm() {
    const { email, password, nickname, confirmPassword, isLoading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} style={styles.form}>
        <FormGroup controlId="email" size="large">
          <Form.Label>Email</Form.Label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="nickname" size="large">
          <Form.Label>Nickname</Form.Label>
          <FormControl
            value={nickname}
            onChange={this.handleChange}
            type="text"
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
        <FormGroup controlId="confirmPassword" size="large">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            value={confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <ProgressButton
          block
          size="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </Form>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <div style={{minHeight: '10vh'}}></div>
        <div className="Signup">
          {this.state.newUser === null
            ? this.renderForm()
            : <EmailConfirmationForm email={email} password={password} />}
        </div>
      </>
    );
  }
}

Signup.propTypes = {
  error: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
};

export default Signup;

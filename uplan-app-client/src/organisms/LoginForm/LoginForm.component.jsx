import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';


const styles = {
  form: {
    margin: '0 auto',
    maxWidth: '320px',
  },
};

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
    const { setError, login } = this.props;
    const { email, password } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true }); // dispatch auth.request too slow
    try {
      await login({ email, password });
      alert("Logged in successful."); // Change to snackbar
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e.message); // TODO: Show text instead: wrong credentials
      setError(e);
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
  login: PropTypes.func.isRequired,
};

export default Login;

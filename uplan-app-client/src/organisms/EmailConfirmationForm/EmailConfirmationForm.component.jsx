import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";

const styles = {
  helpBlock: {
    fontSize: '14',
    padding: '1rem',
    color: '#999',
  },
  form: {
    margin: '0 auto',
    maxWidth: '320px',
  },
};

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      confirmationCode: "",
    };
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length === 6;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleConfirmationSubmit = async event => {
    const { confirmationCode } = this.state;
    const { confirmEmail, email } = this.props;

    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await confirmEmail({ email, confirmationCode });
      this.props.history.push("/login");
    } catch (e) {
      alert(e.message); // to use snack bar
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { confirmationCode, isLoading } = this.state;
    return (
      <>
        <div style={{minHeight: '10vh'}}></div>
        <div className="Signup">
          <Form onSubmit={this.handleConfirmationSubmit} style={styles.form}>
            <FormGroup controlId="confirmationCode" size="large">
              <Form.Label>Confirmation Code</Form.Label>
              <FormControl
                autoFocus
                type="tel"
                value={confirmationCode}
                onChange={this.handleChange}
              />
              <p style={styles.helpBlock}>Please check your email for the code.</p>
            </FormGroup>
            <ProgressButton
              block
              size="large"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              isLoading={isLoading}
              text="Verify"
              loadingText="Verifying…"
            />
          </Form>
        </div>
      </>
    );
  }
}

EmailConfirmation.propTypes = {
  confirmEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default EmailConfirmation;

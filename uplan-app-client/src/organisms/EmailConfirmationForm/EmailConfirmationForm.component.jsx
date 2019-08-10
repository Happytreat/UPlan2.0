import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Form, Field, Formik } from "formik";
import { Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
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

const EmailConfirmSchema = yup.object().shape({
  confirmationCode: yup.string().min(6, 'Confirmation code too short').required('Required'),
});

class EmailConfirmation extends Component {

  render() {
    const { email, handleSubmit } = this.props;
    return (
      <>
        <div style={{minHeight: '7vh'}}></div>
        <div className="Signup">
          <Formik
            initialValues={{
              confirmationCode: '',
            }}
            validationSchema={EmailConfirmSchema}
            onSubmit={async (values, { setSubmitting }) => {
              return handleSubmit({ email, values, setSubmitting });
            }}
          >
            {({isSubmitting, isValid}) => (
              <Form style={styles.form}>
                <br/>
                <Typography variant="body1" style={{fontSize: '0.9rem', fontWeight: 500}}>
                  Confirmation Code
                </Typography>
                <Field
                  type="text"
                  name="confirmationCode"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  autoFocus
                  variant="outlined"
                />
                <br />
                <p style={styles.helpBlock}>Please check your email for the code.</p>
                <ProgressButton
                  block
                  size="large"
                  disabled={!isValid && isSubmitting}
                  isLoading={isSubmitting}
                  variant="outline-primary"
                  type="submit"
                  text="Verify Your Email"
                  loadingText="Verifying..."
                  style={{margin: '1rem 0'}}
                >
                  Verify Your Email
                </ProgressButton>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

EmailConfirmation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default EmailConfirmation;

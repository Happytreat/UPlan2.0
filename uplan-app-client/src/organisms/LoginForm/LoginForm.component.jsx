import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';

const styles = {
  form: {
    margin: '0 auto',
    maxWidth: '320px',
    padding: '4rem 0',
  },
};

const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().min(8, 'Password too short').required('Required'),
});


class LoginForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          return handleSubmit({ values, setSubmitting });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form style={styles.form}>
            <br />
            <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Username
            </Typography>
            <Field
              type="email"
              name="username"
              margin="dense"
              component={TextField}
              fullWidth
              autoFocus
              autoComplete="email"
              variant="outlined"
            />
            <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Password
            </Typography>
            <Field
              type="password"
              name="password"
              margin="dense"
              component={TextField}
              autoComplete="current-password"
              fullWidth
              variant="outlined"
              style={{ paddingBottom: '1rem'}}
            />
            <Typography align="center" color="error" style={{ fontSize: '0.8rem', fontWeight: 500 }} gutterBottom>
              {this.props.error ? this.props.error : ''}
            </Typography>
            <ProgressButton
              block
              size="large"
              disabled={!isValid && isSubmitting}
              isLoading={isSubmitting}
              variant="outline-primary"
              type="submit"
              text="Login"
              loadingText=" Logging in..."
              style={{ margin: '1rem 0' }}
            >
              Login
            </ProgressButton>
          </Form>
        )}
      </Formik>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;


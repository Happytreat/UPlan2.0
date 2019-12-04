import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { TextField } from "formik-material-ui";

import { StyledForm, StyledFormHeader, StyledError, ThemedField } from '../../molecules/FormStyles/formStyledComponents';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';


const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().min(8, 'Password too short').required('Required'),
});

class LoginForm extends Component {
  render() {
    const { handleSubmit, error } = this.props;
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
          <StyledForm>
            <br />
            <StyledFormHeader variant="body1">Username</StyledFormHeader>
            <ThemedField
              type="email"
              name="username"
              margin="dense"
              component={TextField}
              fullWidth
              autoFocus
              autoComplete="email"
              variant="outlined"
            />
            <StyledFormHeader variant="body1">Password</StyledFormHeader>
            <ThemedField
              type="password"
              name="password"
              margin="dense"
              component={TextField}
              autoComplete="current-password"
              fullWidth
              variant="outlined"
            />
            <StyledError align="center" color="error">
              {error || ''}
            </StyledError>
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
          </StyledForm>
        )}
      </Formik>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object // TODO: Define what error is (type)
};

export default LoginForm;


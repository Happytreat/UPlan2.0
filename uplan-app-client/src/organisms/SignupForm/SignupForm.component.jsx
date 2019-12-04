import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import { StyledForm, StyledFormHeader, ThemedField } from '../../molecules/FormStyles/formStyledComponents';
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";

const SignupSchema = yup.object().shape({
  username: yup.string().email('Invalid Email').required('Required'),
  nickname: yup.string().min(6, 'Nickname too short').required('Required'),
  password: yup.string().min(8, 'Password too short').required('Required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
});

class Signup extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
          nickname: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          return this.props.handleSubmit({ values, setSubmitting });
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
            <StyledFormHeader variant="body1">Password Confirmation</StyledFormHeader>
            <ThemedField
              type="password"
              name="passwordConfirmation"
              margin="dense"
              component={TextField}
              autoComplete="current-password"
              fullWidth
              variant="outlined"
            />
            <StyledFormHeader variant="body1">Nickname</StyledFormHeader>
            <ThemedField
              type="text"
              name="nickname"
              margin="dense"
              component={TextField}
              fullWidth
              variant="outlined"
            />
            <ProgressButton
              block
              size="large"
              disabled={!isValid && isSubmitting}
              isLoading={isSubmitting}
              variant="outline-primary"
              type="submit"
              text="Signup"
              loadingText="Loading..."
              style={{ margin: '1rem 0' }}
            >
              Signup
            </ProgressButton>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Signup;

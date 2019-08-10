import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import {Typography} from "@material-ui/core";

import ProgressButton from "../../molecules/ProgressButton/ProgressButton";


const styles = {
  form: {
    margin: '0 auto',
    maxWidth: '320px',
  },
};

const SignupSchema = yup.object().shape({
  username: yup.string().email('Invalid Email').required('Required'),
  nickname: yup.string().min(6, 'Nickname too short').required('Required'),
  password: yup.string().min(8, 'Password too short').required('Required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
});

class Signup extends Component {
  constructor(props) {
    super(props);
  }
  renderForm() {
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
          <Form style={styles.form}>
            <br />
            <Typography variant="body" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Username
            </Typography>
            <Field
              type="email"
              name="username"
              floatingLabelFixed
              margin="dense"
              component={TextField}
              fullWidth
              autoFocus
              autoComplete="email"
              variant="outlined"
            />
            <Typography variant="body" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Password
            </Typography>
            <Field
              type="password"
              floatingLabelFixed
              name="password"
              margin="dense"
              component={TextField}
              autoComplete="current-password"
              fullWidth
              variant="outlined"
            />
            <Typography variant="body" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Password Confirmation
            </Typography>
            <Field
              type="password"
              floatingLabelFixed
              name="passwordConfirmation"
              margin="dense"
              component={TextField}
              autoComplete="current-password"
              fullWidth
              variant="outlined"
            />
            <Typography variant="body" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Nickname
            </Typography>
            <Field
              type="text"
              floatingLabelFixed
              name="nickname"
              margin="dense"
              component={TextField}
              fullWidth
              variant="outlined"
              style={{ paddingBottom: '1rem'}}
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
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <>
        <div style={{minHeight: '7vh'}}></div>
        <div className="Signup">
          {this.renderForm()}
        </div>
      </>
    );
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Signup;

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Formik } from "formik";
import { TextField } from "formik-material-ui";

import { StyledForm, StyledFormHeader, ThemedField, StyledHelpBlock } from '../../molecules/FormStyles/formStyledComponents';
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";


const EmailConfirmSchema = yup.object().shape({
  confirmationCode: yup.string().min(6, 'Confirmation code too short').required('* Required'),
});

class EmailConfirmation extends Component {

  render() {
    const { email, handleSubmit } = this.props;
    return (
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
          <StyledForm>
            <br/>
            <StyledFormHeader variant="body1">Confirmation Code</StyledFormHeader>
            <ThemedField
              type="text"
              name="confirmationCode"
              margin="dense"
              component={TextField}
              fullWidth
              autoFocus
              variant="outlined"
            />
            <br />
            <StyledHelpBlock>Please check your email for the code.</StyledHelpBlock>
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
          </StyledForm>
        )}
      </Formik>
    );
  }
}

EmailConfirmation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default EmailConfirmation;

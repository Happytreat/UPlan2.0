import React from 'react';
import * as yup from 'yup';
import { Formik } from "formik";
import { TextField } from "formik-material-ui";

import {
  StyledForm,
  StyledFormHeader,
  StyledHelpBlock,
  ThemedField
} from '../../molecules/FormStyles/formStyledComponents';
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";

const PasswordResetAfterCodeSentSchema = yup.object().shape({
  confirmationCode: yup.string().min(6, 'Confirmation code too short').required('* Required'),
  password: yup.string().min(8, 'Password too short').required('Required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const ResetPasswordAfterCodeForm = ({ email, handleResetSubmit }) => {
  return (
    <Formik
      initialValues={{
        confirmationCode: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={PasswordResetAfterCodeSentSchema}
      onSubmit={async (values, { setSubmitting }) => {
        return handleResetSubmit({ email, values, setSubmitting });
      }}
    >
      {({isSubmitting, isValid}) => (
        <StyledForm>
          <br/>
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
          <StyledHelpBlock>Please check your email for the code.</StyledHelpBlock>
          <ProgressButton
            block
            size="large"
            disabled={!isValid && isSubmitting}
            isLoading={isSubmitting}
            variant="outline-primary"
            type="submit"
            text="Reset Your Password"
            loadingText="Resetting..."
            style={{margin: '1rem 0'}}
          >
            Reset Your Password
          </ProgressButton>
        </StyledForm>
      )}
    </Formik>
  )
};
export default ResetPasswordAfterCodeForm;

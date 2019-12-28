import React from 'react';
import * as yup from 'yup';
import { Formik } from "formik";
import { TextField } from "formik-material-ui";

import { StyledForm, StyledFormHeader, ThemedField } from '../../molecules/FormStyles/formStyledComponents';
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";

const PasswordResetBeforeCodeSentSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Required'),
});

const ResetPasswordBeforeCodeForm = ({ handleEmailSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={PasswordResetBeforeCodeSentSchema}
      onSubmit={async (values, { setSubmitting }) => {
        return handleEmailSubmit({ values, setSubmitting });
      }}
    >
      {({isSubmitting, isValid}) => (
        <StyledForm>
          <br/>
          <StyledFormHeader variant="body1">Email</StyledFormHeader>
          <ThemedField
            type="text"
            name="email"
            margin="dense"
            component={TextField}
            fullWidth
            autoFocus
            variant="outlined"
          />
          <ProgressButton
            block
            size="large"
            disabled={!isValid && isSubmitting}
            isLoading={isSubmitting}
            variant="outline-primary"
            type="submit"
            text="Send Confirmation Code"
            loadingText="Sending Code..."
            style={{margin: '1rem 0'}}
          >
            Send Confirmation Code
          </ProgressButton>
        </StyledForm>
      )}
    </Formik>
  )
};
export default ResetPasswordBeforeCodeForm;

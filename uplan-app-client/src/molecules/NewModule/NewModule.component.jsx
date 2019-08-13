import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';

const styles = {
  form: {
    padding: '0 1.5rem 1.5rem 1.5rem',
  }
};

const NewModSchema = yup.object().shape({
  credits: yup.number('Credits must be a number.').moreThan(0, 'Credits should be more than 0').required('Required'),
  description: yup.string().required('Required'),
  code: yup.string().max(8, 'Module code too long.').required('Required'),
});


class NewModuleForm extends Component {
  render() {
    const { handleSubmit, cProps: { semesterId }, onHide } = this.props;
    console.log('props of modal', this.props);
    return (
      <Formik
        initialValues={{
          code: '',
          credit: 4,
          description: '',
        }}
        validationSchema={NewModSchema}
        onSubmit={async (values, { setSubmitting }) => {
          return handleSubmit({ values, semesterId, onHide, setSubmitting });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form style={styles.form}>
            <br />
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              Module Code
            </Typography>
            <Field
              type="text"
              name="code"
              margin="dense"
              component={TextField}
              fullWidth
              autoFocus
              variant="outlined"
            />
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              Module Credits (MC)
            </Typography>
            <Field
              type="text"
              name="credits"
              margin="dense"
              component={TextField}
              fullWidth
              variant="outlined"
            />
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              Module Description
            </Typography>

            <Typography variant="body2" style={{ color: '#999', fontWeight: 500 }}>
              Can include the module's name and what you wish to learn from it
            </Typography>
            <Field
              type="textarea"
              name="description"
              margin="dense"
              component={TextField}
              multiline
              rows="5"
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
              text="Add Module"
              loadingText=" Adding Module..."
              style={{ margin: '1rem 0' }}
            >
              Add Module
            </ProgressButton>
          </Form>
        )}
      </Formik>
    );
  }
}

NewModuleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  semId: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default NewModuleForm;


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

const EditModSchema = yup.object().shape({
  credits: yup.number('Credits must be a number.').moreThan(0, 'Credits should be more than 0').required('Required'),
  description: yup.string().required('Required'),
  code: yup.string().max(8, 'Module code too long.').required('Required'),
});

class UpdateModuleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Have to use state to re-render formik once initValues is fetched via API
      initialValues: {},
      module: null,
    };
  }

  async componentWillMount() {
    const { getModule, cProps: { moduleId } } = this.props;
    const module = await getModule(moduleId);
    this.setState({ module, initialValues: {
        code: module.code,
        description: module.description,
        credits: parseFloat(module.credits),
      }});
  }

  render() {
    const {
      props: { handleSubmit, onHide, handleDelete },
      state: { initialValues },
    } = this;
    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={EditModSchema}
        onSubmit={async (values, { setSubmitting }) => {
          return handleSubmit({ initValues: this.state.module, values, onHide, setSubmitting });
        }}
      >
        {({ isSubmitting, isValid, setSubmitting }) => (
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
              variant="primary"
              type="submit"
              text="Save"
              loadingText=" Saving Module..."
              style={{ margin: '1rem 0' }}
            />
            <ProgressButton
              block
              variant="danger"
              size="large"
              // isLoading={fetching}
              onClick={() => handleDelete({ moduleId: this.props.cProps.moduleId, setSubmitting, onHide: this.props.onHide })}
              text="Delete"
              loadingText="Deleting Module…"
            />
          </Form>
        )}
      </Formik>
    );
  }
}

UpdateModuleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  cProps: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateModuleForm;


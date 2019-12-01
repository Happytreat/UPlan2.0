import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import PropTypes from "prop-types";
import { isNumber } from "lodash";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";
import LoadingPage from "../../molecules/LoadingPage/LoadingPage";
import { withRouter } from "react-router-dom";

const styles = {
  form: {
    padding: '1.5rem',
  }
};

class UpdateSemester extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      semester: null,
      name: "",
      description: "",
      attachmentURL: null,
      order: 1,
    };
  }
  async componentDidMount() {
    try {
      let attachmentURL;
      const semester = await this.getSemester();
      const { name, description, attachment, order } = semester;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment); // Retrieve from S3
      }
      this.setState({
        semester,
        name,
        description,
        attachmentURL,
        order,
      });
    } catch (e) {
      // console.log('error from update sem', e);
      alert('You are not authorised to view this page.');
      this.props.history.push("/");
    }
  }

  // path="/semesters/:id"
  getSemester() {
    return API.get("api", `/semesters/${this.props.cProps.semesterId}`);
  }

  // TODO: Change to Formik or validation schema
  validateForm() {
    const { name, description, order } = this.state;
    return description.length > 0 && name.length > 0 && isNumber(parseInt(order, 10));
  }

  // Strip timestamp from filename
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange(event) {
    this.file = event.target.files[0];
  };

  async handleSubmit(event) {
    let attachment;
    const { setLoading, setError, saveSemester, onHide, cProps: { semesterId: id } } = this.props;
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    setLoading();

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      const { name, description, order, semester } = this.state;

      saveSemester({
        id,
        semester: {
          name,
          description,
          attachment: attachment || semester.attachment,
          order: parseInt(order, 10),
        }
      });

      // Delete the old attachment
      await Storage.vault.remove(semester.attachment);
      onHide();
    } catch (e) {
      alert(e);
      setError(e);
    }
  };

  handleDelete = async event => {
    const { setLoading, setError, deleteSemester, onHide, cProps: { semesterId: id } } = this.props;

    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this semester and all the modules in it?');
    if (!confirmed) { return; }

    setLoading();

    try {
     deleteSemester(id, this.props.modules);
      // Delete attachment of deleted semester
      await Storage.vault.remove(this.state.semester.attachment);
      onHide();
    } catch (e) {
      alert(e);
      setError(e);
    }
  };

  render() {
    const {
      props: {
        fetching,
      },
      state: {
        order,
        name,
        description,
        semester,
        attachmentURL,
      },
    } = this;

    return (
    <div className="Semesters">
      {
        !semester ?
          (
            <div style={{ minHeight: '50vh' }}>
              <LoadingPage />
            </div>
          )
          : (
          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <FormGroup controlId="name">
              <Form.Label>Semester Name</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                value={name}
              />
            </FormGroup>
            <Form.Label>Semester Description</Form.Label>
            <p style={{ color: '#999' }}>Record your goals for this semester: e.g. Applying for NOC AI startup - requires Intro to AI module</p>
            <FormGroup controlId="description">
              <Form.Control
                as="textarea"
                rows="5"
                onChange={this.handleChange}
                value={description}
              />
            </FormGroup>
            {semester.attachment &&
            <FormGroup>
              <Form.Label>Attachment:</Form.Label>
              <Form.Row style={{paddingLeft: '0.5rem'}}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={attachmentURL}
                >
                  {this.formatFilename(semester.attachment)}
                </a>
              </Form.Row>
            </FormGroup>}
            <FormGroup controlId="file">
              {!semester.attachment &&
              <Form.Label>Attachment</Form.Label>}
              <FormControl onChange={this.handleFileChange} type="file"
              />
            </FormGroup>
            <FormGroup controlId="order">
              <Form.Label>Semester Order</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                value={order}
              />
            </FormGroup>
            <ProgressButton
              block
              variant="primary"
              size="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={fetching}
              text="Save"
              loadingText="Saving…"
            />
            <ProgressButton
              block
              variant="danger"
              size="large"
              isLoading={fetching}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </Form>
        )
      }
    </div>
    );
  }
}


UpdateSemester.propTypes = {
  fetching: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  saveSemester: PropTypes.func.isRequired,
  deleteSemester: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  cProps: PropTypes.object,
  modules: PropTypes.object.isRequired,
};

export default withRouter(UpdateSemester);


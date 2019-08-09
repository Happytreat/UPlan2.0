import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { isNumber } from "lodash";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";
// import LoadingPage from "../../molecules/LoadingPage/LoadingPage";

const styles = {
  form: {
    padding: '1.5rem',
  }
};

export default class EditSemester extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      isDeleting: null,
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
        // Retrieve from S3
        attachmentURL = await Storage.vault.get(attachment);
      }
      this.setState({
        semester,
        name,
        description,
        attachmentURL,
        order,
      });
    } catch (e) {
      // console.log('Error in storage.vault.get(). attachment does not belong to user');
      alert('You are not authorised to view this page.');
      this.props.history.push("/");
    }
  }

  // path="/semesters/:id"
  getSemester() {
    console.log('This id: ', this.props.cProps.id);
    return API.get("semesters", `/semesters/${this.props.cProps.id}`);
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  saveSemester(semester) {
    // PUT request to update semester
    return API.put("semesters", `/semesters/${this.props.cProps.id}`, {
      body: semester,
    });
  }

  handleSubmit = async event => {
    let attachment;
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
    this.setState({ isLoading: true });

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      const { name, description, order, semester } = this.state;
      console.log('Order submitted', order);

      await this.saveSemester({
        name,
        description,
        attachment: attachment || semester.attachment,
        order: parseInt(order, 10),
      });

      // Delete the old attachment
      await Storage.vault.remove(semester.attachment);

      this.props.onHide();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  deleteSemester() {
    return API.del("semesters", `/semesters/${this.props.cProps.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this semester?"
    );
    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });
    try {
      await this.deleteSemester();

      // Delete attachment of deleted semester
      await Storage.vault.remove(this.state.semester.attachment);

      this.props.onHide();
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  };

  render() {
    return (
    <div className="Semesters">
      {this.state.semester &&
      <Form onSubmit={this.handleSubmit} style={styles.form}>
        <FormGroup controlId="name">
          <Form.Label>Semester Name</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </FormGroup>
        <Form.Label>Semester Description</Form.Label>
        <p style={{ color: '#999' }}>Record your goals for this semester: e.g. Applying for NOC AI startup - requires Intro to AI module</p>
        <FormGroup controlId="description">
          <Form.Control
            as="textarea"
            rows="5"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormGroup>
        {this.state.semester.attachment &&
        <FormGroup>
          <Form.Label>Attachment:</Form.Label>
          <Form.Row style={{paddingLeft: '0.5rem'}}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.attachmentURL}
            >
              {this.formatFilename(this.state.semester.attachment)}
            </a>
          </Form.Row>
        </FormGroup>}
        <FormGroup controlId="file">
          {!this.state.semester.attachment &&
          <Form.Label>Attachment</Form.Label>}
          <FormControl onChange={this.handleFileChange} type="file"
          />
        </FormGroup>
        <FormGroup controlId="order">
          <Form.Label>Semester Order</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleChange}
            value={this.state.order}
          />
        </FormGroup>
        <ProgressButton
          block
          variant="primary"
          size="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Save"
          loadingText="Saving…"
        />
        <ProgressButton
          block
          variant="danger"
          size="large"
          isLoading={this.state.isDeleting}
          onClick={this.handleDelete}
          text="Delete"
          loadingText="Deleting…"
        />
      </Form>}
    </div>
    );
  }
}

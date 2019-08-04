import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import ProgressButton from "../../components/ProgressButton/ProgressButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";

const styles = {
  form: {
    padding: '1.5rem',
  }
};

export default class Semesters extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      isDeleting: null,
      semester: null,
      name: "",
      description: "",
      attachmentURL: null
    };
  }
  async componentDidMount() {
    try {
      let attachmentURL;
      const semester = await this.getSemester();
      const { name, description, attachment } = semester;

      if (attachment) {
        // Retrieve from S3
        attachmentURL = await Storage.vault.get(attachment);
      }
      this.setState({
        semester,
        name,
        description,
        attachmentURL,
      });
    } catch (e) {
      alert(e);
    }
  }

  // path="/semesters/:id"
  getSemester() {
    // console.log('This match object: ', this.props.match);
    return API.get("semesters", `/semesters/${this.props.match.params.id}`);
  }

  // TODO: Change to Form.Check
  validateForm() {
    return this.state.name.length > 0 && this.state.description.length > 0;
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
    return API.put("semesters", `/semesters/${this.props.match.params.id}`, {
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
      await this.saveSemester({
        name: this.state.name,
        description: this.state.description,
        attachment: attachment || this.state.semester.attachment
      });

      // Delete the old attachment
      await Storage.vault.remove(this.state.semester.attachment);

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  deleteSemester() {
    return API.del("semesters", `/semesters/${this.props.match.params.id}`);
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

      this.props.history.push("/");
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
        <h3>Update a Semester</h3>
        <br />
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
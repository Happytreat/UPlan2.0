import React, { Component } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import ProgressButton from "../../molecules/ProgressButton/ProgressButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";

const styles = {
  // textArea: {
  //   height: '350px',
  //   fontSize: '24',
  // },
  form: {
    padding: '1.5rem',
  }
};

export default class NewSemester extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      description: "",
      name: "",
    };
  }
  validateForm() {
    return this.state.description.length > 0 && this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
    this.setState({ isLoading: true });

    try {
      // Upload file before creating a note
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createSemester({
        name: this.state.name,
        description: this.state.description,
        attachment,
      });

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      // console.log(e);
      this.setState({ isLoading: false });
    }
  };

  createSemester(note) {
    // API endpoint in index.js is semesters
    return API.post("semesters", "/semesters", {
      body: note,
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={styles.form}>
          <h3>Add a Semester</h3>
          <br />
          <FormGroup controlId="name">
            <Form.Label>Semester Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup controlId="description">
            <Form.Label>Semester Description</Form.Label>
            <p style={{ color: '#999' }}>Record your goals for this semester: e.g. Applying for NOC AI startup - requires Intro to AI module</p>
            <Form.Control
              as="textarea"
              rows="5"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </FormGroup>
          <FormGroup controlId="file">
            <Form.Label>Attachment</Form.Label>
            <Form.Control onChange={this.handleFileChange} type="file"
            />
          </FormGroup>
          <ProgressButton
            block
            variant="primary"
            size="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </Form>
      </div>
    );
  }
}



import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

const styles = {
  header: {
    padding: '1.5rem',
  }
};

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notes: []
    };
  }

  renderNotesList(notes) {
    return null;
  }

  // Should show Spinner when loading
  render() {
    return (
      <div style={styles.header}>
        <h3>Your Semesters</h3>
        <br />
        <ListGroup>
          {!this.state.isLoading &&
          this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }
}
import React, { Component } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup } from "react-bootstrap";


const styles = {
  header: {
    padding: '1.5rem',
    fontFamily: "Open Sans sans-serif",
    fontWeight: '600',
    overflow: 'hidden',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  link: {
    cursor: 'pointer',
  },
  description: {
    color: '#666',
    paddingTop: '0.25rem',
  }
};

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      semesters: []
    };
  }

  async componentDidMount() {
    // show throw error?
    // TODO: Move redux
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const semesters = await this.semesters();
      this.setState({ semesters });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  semesters() {
    return API.get("semesters", "/semesters");
  }

  renderSemestersList(semesters) {
    return [{}].concat(semesters).map(
      (semester, i) =>
        i !== 0
          ? <LinkContainer
            style={styles.link}
            key={semester.semesterId}
            to={`/semesters/${semester.semesterId}`}
          >
            <ListGroup.Item>
              <h6><b>{semester.name}</b></h6>
              <p style={styles.description}>{semester.description.trim().split("\n")[0]}</p>
            </ListGroup.Item>
          </LinkContainer>
          : <LinkContainer
            style={styles.link}
            key="new"
            to="/semesters/new"
          >
            <ListGroup.Item>
              <h5 style={styles.link}>
                <b>{"\uFF0B "}</b>
                Add a new semester
              </h5>
            </ListGroup.Item>
          </LinkContainer>
    );
  }

  // Should show Spinner when loading
  render() {
    return (
      <div style={styles.header}>
        <h3>Your Semesters</h3>
        <br />
        <ListGroup>
          {!this.state.isLoading &&
          this.renderSemestersList(this.state.semesters)}
        </ListGroup>
      </div>
    );
  }
}
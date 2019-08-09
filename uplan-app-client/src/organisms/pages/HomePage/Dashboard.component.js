import React, { Component } from "react";
import { API } from "aws-amplify";
import PropTypes from "prop-types";
import { orderBy } from 'lodash';
import { Container, Button, ListGroup, Modal, Col, Row } from "react-bootstrap";

import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import NewSemester from '../../../organisms/NewSemester/NewSemester';
import EditSemester from '../../../organisms/EditSemester/EditSemester';

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
  container: {
    cursor: 'pointer',
    borderStyle: 'ridge',
    borderWidth: 'medium',
    padding: '0.75rem 0 0 0.5rem'
  },
  description: {
    color: '#666',
    paddingTop: '0.25rem',
  },
  modalHeader: {
    padding: '0.5rem 1rem',
  }
};

// TODO: Fix header appear first then fetched data (delay header till fetching true)
// Fix: Fetching in redux store (semesters)
const SemesterModal = ({ title, C, cProps, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={styles.modalHeader}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <C cProps={cProps} onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      semesters: [],
      newSemModalShow: false,
      editSemModalShow: false,
      semId: null,
    };

    this.renderSemestersList = this.renderSemestersList.bind(this);
  }

  async componentDidMount() {
    // show throw error?
    if (!this.props.isAuth) {
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

  // TODO: Fix re-rendering of dashboard after adding/updating semesters (fix by adding semester to redux store)
  renderSemestersList(semesters) {
    const orderedSemesters = orderBy(semesters, ['order'], 'asc');
    return [{}].concat(orderedSemesters).map(
      (semester, i) =>
        i !== 0
          ? (
            <>
              <Container key={semester.semesterId} style={styles.container} onClick={() => this.setState({ editSemModalShow: true, semId: semester.semesterId })}>
                <h6><b>{semester.name}</b></h6>
                <p style={styles.description}>{semester.description.trim().split("\n")[0]}</p>
              </Container>
            </>
          )
          : (
            <>
              <Button variant="outline-dark" style={styles.link} onClick={() => this.setState({ newSemModalShow: true })}>
                  <b>{"\uFF0B "}</b>
                  Add a new semester
              </Button>
              <SemesterModal
                title="Add a Semester"
                C={NewSemester}
                show={this.state.newSemModalShow}
                onHide={() => this.setState({ newSemModalShow: false })}
              />
              <SemesterModal
                title="Update a Semester"
                C={EditSemester}
                cProps={{id: this.state.semId}}
                show={this.state.editSemModalShow}
                onHide={() => this.setState({ editSemModalShow: false })}
              />
            </>
          )
    );
  }

  // TODO: Find delay before showing spinner
  render() {
    return (
      <div style={styles.header}>
        <h3>Your Semesters</h3>
        <br />
        {
          this.state.isLoading
          ? <><LoadingPage isLoading={this.state.isLoading} /></>
          : (
              <ListGroup>
                {!this.state.isLoading &&
                this.renderSemestersList(this.state.semesters)}
              </ListGroup>
            )
        }
      </div>
    );
  }
}

LoggedIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
